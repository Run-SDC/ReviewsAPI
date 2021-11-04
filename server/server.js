/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const app = express();
const port = 3000;
const query = require('./../database/queries');
const db = require('./../database/db');

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.status(200).json('Server is running...');
});

app.get('/reviews', (req, res) => {
  let queryOptions = {
    productId: req.query.product_id,
    count: req.query.count,
    page: req.query.page,
    sort: req.query.sort
  }

  console.log("parameters", queryOptions);

  db.getReviews(queryOptions, (err, data) => {
    if (err) {
      res.status(500).json("Error retrieving review data.")
    } else {
      console.log("data from server file", data);

      var compiledReviews = {};

      for (var i = 0; i < data.length; i++) {
        console.log(data[i].review_id)
        if (!(data[i].review_id in compiledReviews)) {
          compiledReviews[data[i].review_id] = data[i]
        }
        else {
          compiledReviews[data[i].review_id].photos.push(data[i].photos[0]);
        }
      }

      let reviews = {
        product: req.query.product_id,
        count: req.query.count,
        page: req.query.page,
        results: []
      }

      for (var review in compiledReviews) {
        reviews.results.push(compiledReviews[review]);
      }

      res.status(200).json(reviews)
    }
  })
})

app.get('/reviews/meta', (req, res) => {
  //helper function from db to pull meta data for a products reviews

  let queryOptions = {
    productId: req.query.product_id,
  }

  console.log("pinged meta router")

  db.getMeta(queryOptions, (err, data) => {
      if (err) {
        res.status(500).json("Error retrieving review/meta data.")
      } else {
        console.log("data from meta query", data);
        res.status(200).send(data)

      }
    });

})  ;


app.post('/reviews', (req, res) => {
  //DATA FROM CLIENT
  // const params = {
  //   // eslint-disable-next-line camelcase
  //   product_id: S.productID,
  //   rating: S.rating,
  //   summary: S.summary,
  //   body: S.body,
  //   recommend: S.recommend,
  //   name: S.name,
  //   email: S.email,
  //   photos: S.photosForServer,
  //   characteristics: S.characteristics
  // };

  db.postReview(req.body, (err, data) => {
    if (err) {
      res.status(500).json("Error updating review.")
    } else {
      console.log("Successfully added review");
      res.status(204).json('CREATED')
    }
  })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  let queryOptions = {
    reviewId: req.params.review_id,
  }

  db.putHelpful(queryOptions, (err, data) => {
    if (err) {
      throw error;
      res.status(500).json("Error updating review.")
    } else {
      console.log("Successfully marked review as helpful");
      res.status(204).json('NO CONTENT')
    }
  })

})

app.put('/reviews/:review_id/report', (req, res) => {
  let queryOptions = {
    reviewId: req.params.review_id,
  }

  db.reportReview(queryOptions, (err, data) => {
    if (err) {
      throw error;
      res.status(500).json("Error reporting review.")
    } else {
      console.log("Successfully reported review");
      res.status(204).json('NO CONTENT')
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;