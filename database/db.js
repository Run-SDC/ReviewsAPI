const {Pool, Client} = require('pg')

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
  //use options obj arg to structure query
  let join = `SELECT * FROM review_photos
  RIGHT JOIN reviews ON review_photos.review_id = reviews.review_id
  WHERE reviews.product_id = ${options.productId}`

  let reviews = `SELECT reported FROM reviews WHERE review_id = 4`
  let photos

  let index = 'CREATE INDEX idx_reviews_id ON review_photos(review_id)'

  pool.query(reviews, (err, res) => {
      if (err) {
      console.log('SELECT pool.query() Error:', err)
      cb(err, null);
    }
    if (res) {
      cb(null, res.rows);
    }
  })
}

const getMeta = function(options, cb) {
  let columns = 'review_id, rating, date, summary, body, recommend, reported, reviewer_name, response, helpfulness'
  let result = {}
  pool.query(`SELECT ${columns} FROM reviews WHERE reviews.product_id = ${options.productId} `, (err, res) => {
    if (err) {
      console.log('SELECT pool.query() Error:', err)
      cb(err, null);
    }
    if (res) {
      cb(null, res);
      result = res;
    }
  })

  //get ratings with aggregation fx
  //get recommended with aggregation fx
  //get characteristics with id and value aggregation calculation

};

const postReview = function(options, cb) {
  // let report = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${options.reviewId}`

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

module.exports = {getReviews, reportReview, putHelpful, postReview};