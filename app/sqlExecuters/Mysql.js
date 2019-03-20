const mysql2 = require('mysql2/promise');

class Mysql{

    constructor(connection = false) {
        this.connection = connection;
        this.connect = this.connect.bind(this);
        this.query = this.query.bind(this);
    }

    async connect(to) {
        this.connection = await mysql2.createConnection(to);
    }

    async query (query, ...params){
        return (await this.connection.query(query.join("?"), params))[0];
    }


}

module.exports = Mysql;