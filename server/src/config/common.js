const path = require('path');

// Answer to the Ultimate Question of Life, the Universe, and Everything.
const SENSE_OF_LIFE = 42;

const PORT = process.env.PORT || 7000;

const DATA_FILE_PATH = path.resolve('data/GB.tsv');
const DB_FILE_PATH = path.resolve('data/main.db');

module.exports = {
    SENSE_OF_LIFE,
    DATA_FILE_PATH,
    DB_FILE_PATH,
    PORT
};
