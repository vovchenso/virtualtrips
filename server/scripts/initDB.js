const fs = require('fs');
const readline = require('readline');

const {DATA_FILE_PATH} = require('../src/config/common');
const geoname = require('../src/db/geoname');

const seedGeoData = async () => {
    await geoname.init();

    let isFirst = true;

    const lineReader = readline.createInterface({
        input: fs.createReadStream(DATA_FILE_PATH)
    });

    lineReader.on('line', async (line) => {
        // skip the first line as it contains column names
        if (isFirst) {
            isFirst = false;
            return;
        }

        const values = line.split("\t");
        await geoname.insert(values);
    });
}

seedGeoData();

