/* eslint-disable no-console */
const express = require('express');
// const credentials = require('credentials.js');
const app = express();
const port = 3000;

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
