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


app.get('/reviews/', (req, res) => {
  //helper function from db to pull reviews for a given product

  res.status(200).send(req.params)
})

app.get('/meta', (req, res) => {
  //helper function from db to pull meta data for a products reviews
  res.status(200).send('pinged reviews/meta router')

})

app.post('/reviews', (req, res) => {
  //helper function from db to add new entry
  res.status(200).send('pinged reviews POST router')

})

app.put('/reviews/:review_id/helpful', (req, res) => {
  //helper function from db to update entry helpfulness field
  let hi = req.params;
  res.status(200).send('pinged reviews helpful router', req.query)

})

app.put('/reviews/:review_id/report', (req, res) => {
  //helper function from db to flag review
  res.status(200).send('pinged reviews report router')

})

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


