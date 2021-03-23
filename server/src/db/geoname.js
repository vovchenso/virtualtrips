const db = require("./db");

const TABLE_NAME = "geoname";
const INDEX_NAME = "idx_geoname_name";

const insert = (values) => {
    return db.insert(TABLE_NAME, values);
}

const search = async (q) => {
    const rows = await db.all(`
        SELECT name FROM ${TABLE_NAME} 
        WHERE name LIKE "%${q}%"
    `);

    return rows.map(row => row.name);
}

const init = async () => {
    await db.run(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
    await db.run(`DROP INDEX IF EXISTS ${INDEX_NAME}`);
    await db.run(`
        CREATE TABLE ${TABLE_NAME} (
            geonameid INT,
            name TEXT,
            asciiname TEXT,
            alternatenames TEXT, 
            latitude REAL,
            longitude REAL,
            feature_class TEXT,
            feature_code TEXT,
            country_code TEXT,
            cc2 TEXT,
            admin1_code TEXT,
            admin2_code TEXT, 
            admin3_code TEXT,
            admin4_code TEXT,
            population INT, 
            elevation INT,
            dem TEXT,
            timezone TEXT,
            modification TEXT
        )
    `);
    await db.run(`
        CREATE INDEX ${INDEX_NAME} 
        ON ${TABLE_NAME} (name); 
    `);
}

module.exports = {
    insert,
    search,
    init
}
