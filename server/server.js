/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./../database/db.js');

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json('Server is running...');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function dbTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbTest();


