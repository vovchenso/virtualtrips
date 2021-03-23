const compression = require('compression')
const express = require('express');
const cors = require('cors')

const {PORT} = require('./config/common');
const geoname = require('../src/db/geoname');

const app = express();

app.use(compression());
app.use(cors());

app.get('/locations', async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) {
    res.status(400).send('Missed or invalid param "q"');
  }

  const data = await geoname.search(q);
  res.json(data);
});

// Fallback all other paths to 404
app.get('*', (req, res) => {
  res.status(404).send('hey dude...');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening on port ${PORT}`);
});
