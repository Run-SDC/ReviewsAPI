/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

const express = require('express');
const db = require('/Users/josh/Documents/Galvanize/RPP30/SDC/ReviewsAPI/database/database.js');

// const credentials = require('credentials.js');
const app = express();
const port = 3000;

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json('Server is running...');
});

// db.sequelize.sync();

console.log('test')

// db.sequelize.authenticate()
//   .then({
//     console.log('Connection has been established successfully.')
//   })
//   .catch({
//     console.error('Unable to connect to the database:', error);
//   });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
