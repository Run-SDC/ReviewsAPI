const {Pool, Client} = require('pg')
const pgp = require('pg-promise')();

const connect = {
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'reviews',
  logging: false
}

const db = pgp(connect);

const pool = new Pool({
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'reviews',
  logging: false
});

const getReviews = function(options, cb) {
  let join = `SELECT * FROM review_photos
  RIGHT JOIN reviews ON review_photos.review_id = reviews.review_id
  WHERE reviews.product_id = ${options.productId}`

  let index = 'CREATE INDEX idx_reviews_id ON review_photos(review_id)'

  db.any(join,)
    .then(function(data) {

      for(var i = 0; i < data.length; i++) {
        let photo = {id:data[i].id, url: data[i].url};
        data[i].photos = [photo]
        delete data[i].id;
        delete data[i].url;
      }
      cb(null,data);
    })
    .catch(function(error) {
        throw error;
        console.log("Error retrieving reviews from db.")
    });

};

const getMeta = function(options, cb) {

  console.log('productId within meta', options.productId);

  let meta = `select * from characteristics c
    RIGHT JOIN characteristic_reviews cr on c.id = cr.characteristic_id
    WHERE c.product_id = 4`;

  let ratings= `SELECT ROUND( AVG( rating ), 2 ) rating FROM reviews
  WHERE reviews.product_id = ${options.productId}`;

  db.any(meta)
    .then(function(data) {
      for(var i = 0; i < data.length; i++) {
        delete data[i].id;
        delete data[i].product_id;
      }
      // console.log('Data from meta query', data)

      // cb(null,data);
      return data
    })
    .then((meta) => {
      db.any(ratings)
        .then((rating) => {
          console.log(meta, rating);
          let result = {rating: rating, characteristics: meta}
          cb(null, result);
        })
        .catch(function(error) {
          throw error;
          console.log("Error retrieving meta from db.")
      });
    })
    .catch(function(error) {
        throw error;
        console.log("Error retrieving meta from db.")
    });






};

const postReview = function(options, cb) {
  let insert = `INSERT INTO reviews
    (product_id, rating, date, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
    VALUES (${options.product_id}, ${options.rating}, ${Date.now()}, ${options.body}, ${options.recommend}, ${false}, ${options.name}, ${options.email}, ${null}, ${0})`

  pool.query(insert, (err, res) => {
    if (err) {
    console.log(`Error posting review:`, err)
    cb(err, null);
    }
    if (res) {
      cb(null, res);
      console.log(res)
    }
  })
};

const putHelpful = function(options, cb) {
  let report = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${options.reviewId}`

  pool.query(report, (err, res) => {
    if (err) {
    console.log(`Error updating report status for review ${options.reviewId}:`, err)
    cb(err, null);
    }
    if (res) {
      cb(null, res);
    }
  })
};

const reportReview = function(options, cb) {
  let report = `UPDATE reviews SET reported = true WHERE review_id = ${options.reviewId}`

  pool.query(report, (err, res) => {
    if (err) {
    console.log(`Error updating report status for review ${options.reviewId}:`, err)
    cb(err, null);
    }
    if (res) {
      cb(null, res);
    }
  })
};

module.exports = {getReviews, reportReview, putHelpful, postReview, getMeta};