const sqlite3 = require('sqlite3');

class Sqlite{

    constructor(db = false) {
        this.db = db;
    }

    async createDatabase(location = ':memory:') {
        await new Promise(resolve => this.db = new sqlite3.Database(location, resolve));
    }

    query (query, ...params){
        return new Promise((resolve, reject) => {
            this.db.all(query.join("?"), params, async  (err, rows) => {
                if (err) {
                    reject(err);
                }

                if (query[0].toLowerCase().trim().startsWith("insert into")) {
                    resolve({
                        insertId: (await this.query`SELECT last_insert_rowid() as value`)[0].value
                    });
                    return;
                }

                resolve(rows);
            })
        });
    }


}

module.exports = Sqlite;