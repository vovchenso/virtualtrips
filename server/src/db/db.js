const sqlite3 = require('sqlite3').verbose();

const {DB_FILE_PATH} = require('../config/common');

const db = new sqlite3.Database(DB_FILE_PATH);

const getDB = () => db;

const run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, error => {
            if (error) {
                console.log(error);
            }
            resolve();
        });
    });
}

const all = (q, params) => {
    return new Promise((resolve, reject) => {
        db.all(q, params, (error, rows) => {
            error ? reject(error) : resolve(rows);
        });
    });
}

const insert = (tableName, row) => {
    const cols = Array(row.length).fill('?').join(',');
    return run(`INSERT INTO "${tableName}" VALUES (${cols})`, row);
}

module.exports = {
    getDB,
    run,
    all,
    insert
}
