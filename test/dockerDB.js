const mysql = require('mysql2/promise');
const {Docker} = require('node-docker-api');
const docker = new Docker();
const path = require('path');
const fs = require('fs');


const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});


class DockerDB {
    constructor(setupScriptPath) {
        this.connection = null;
        this.sqlContainer = null;
        this.setupScriptPath = setupScriptPath;

        this.connectionDetails = {
            host: 'localhost',
            user: 'root',
            password: 'pass1234',
            database: 'bank'
        };

        this.kill = this.kill.bind(this);
        this.createDatabase = this.createDatabase.bind(this);
        this._checkSqlBootedAsync = this._checkSqlBootedAsync.bind(this);
    }

    async kill() {
        console.log("deleting container");
        await this.sqlContainer.delete({force: true});
    }


    async createDatabase() {
        console.log('Container built.. starting..');
        let container = await docker.container.create({
            Image: 'mysql',
            name: 'test_my_mysql',
            ExposedPorts: {'3306/tcp': {}},
            HostConfig: {
                PortBindings: {
                    '3306/tcp': [{HostPort: '3306'}]
                }
            },
            Env: ['MYSQL_ROOT_PASSWORD='+this.connectionDetails.password, 'ACCEPT_EULA=Y']
        });
        this.sqlContainer = await container.start();
        console.log('Container started... waiting for boot...');



        await new Promise(resolve => setTimeout(resolve, 30000));


        await (await this.sqlContainer.exec.create({
            AttachStdout: false,
            AttachStderr: false,
            Cmd: ["mysql", "-u", "root", "-p"+this.connectionDetails.password, "-e", "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '"+this.connectionDetails.password+"'"]
        })).start();

        let sql = fs.readFileSync(this.setupScriptPath).toString();


        await (await this.sqlContainer.exec.create({
            AttachStdout: false,
            AttachStderr: false,
            Cmd: ["mysql", "-u", "root", "-p"+this.connectionDetails.password, "-e", sql]
        })).start();


        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("Database ready");

        await this._checkSqlBootedAsync();
        console.log('Container booted!');

    }


    async _checkSqlBootedAsync() {
        while (true) {
            try {
                this.connection = await mysql.createConnection(this.connectionDetails);
                break;
            } catch (e) {
                console.log("Not ready yet", e.message);
                await new Promise(resolve => setTimeout(resolve, 2000))
            }

        }
    }

}

module.exports = DockerDB;