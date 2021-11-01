/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const app = express();
const port = 3000;
const query = require('./../database/queries');
const db = require('./../database/db');
const dbTwo = require('./../database/dbTwo');

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.status(200).json('Server is running...');
});

app.get('/reviews/', (req, res) => {

  //pull id a page parameters into options obj

  let queryOptions = {
    productId: req.query.product_id,
    count: req.query.count,
    page: req.query.page,
    sort: req.query.sort
  }

  console.log("parameters", queryOptions);

  dbTwo.test(queryOptions, (err, data) => {
    if (err) {
      res.status(500).json("Error retrieving review data.")
    } else {
      console.log("data from server file", data);
      res.status(200).json(data)
    }
  })
})

app.get('/meta', (req, res) => {
  //helper function from db to pull meta data for a products reviews
  console.log(query.getMeta());

  res.status(200).send('pinged reviews/meta router')

  query.getMeta()
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
  console.log(query.postReview());

  query.postReview()
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
  console.log(query.putHelpful());
  res.status(204);

  query.putHelpful()
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
  console.log(query.reportReview());

  res.status(200).send('pinged reviews report router')

  query.postReview()
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
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbTest();

module.exports = app;