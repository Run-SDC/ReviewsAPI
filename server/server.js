/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./../database/db.js');
const db = require('./../database/queries.js');

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.status(200).json('Server is running...');
});

app.get('/reviews/', (req, res) => {
  //helper function from db to pull reviews for a given product
  //account for pages, count per page, and sort by "newest, helpful, relevant"
  console.log(db.getReviews());
  res.status(200).send('pinged reviews router')

  db.getReviews()
  .then((reviews) => {
    res.status(200).json(reviews)
    return
  })
  .catch((err) => {
    throw error
    res.status(500).json('Server error', error)
  })
})

app.get('/meta', (req, res) => {
  //helper function from db to pull meta data for a products reviews
  console.log(db.getMeta());

  res.status(200).send('pinged reviews/meta router')

  db.getMeta()
  .then((metaData) => {
    res.status(200).json(metaData)
    return
  })
  .catch((err) => {
    throw error
    res.status(500).json('Server error', error);
  })

})

app.post('/reviews', (req, res) => {
  //helper function from db to add new entry

  //pass req params to helper fx
  console.log(db.postReview());

  db.postReview()
    .then((reviews) => {
      res.status(201).json("CREATED");
      return
    })
    .catch((err) => {
      throw error
      res.status(500).json('Server error', error)
    })

  res.status(200).send('pinged reviews POST router')

})

app.put('/reviews/:review_id/helpful', (req, res) => {
  //helper function from db to update entry helpfulness field
  console.log(db.putHelpful());
  res.status(204);

  db.putHelpful()
  .then(() => {
    res.status(204);
    return
  })
  .catch((err) => {
    throw error
    res.status(500).json('Server error', error)
  })

})

app.put('/reviews/:review_id/report', (req, res) => {
  //helper function from db to flag review
  console.log(db.reportReview());

  res.status(200).send('pinged reviews report router')

  db.postReview()
  .then(() => {
    res.status(204)
    return
  })
  .catch((err) => {
    throw error
    res.status(500).json('Server error', error)
  })
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


