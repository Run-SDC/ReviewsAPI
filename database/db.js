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

  // `SELECT ${columns} FROM reviews
  // INNER JOIN review_photos ON review_photos.review_id = reviews.review_id
  // WHERE reviews.product_id = ${options.productId}`

  let columns = 'reviews.review_id, rating, date, summary, body, recommend, reported, reviewer_name, response, helpfulness'

  pool.query(`SELECT * FROM review_photos
    WHERE review_photos.review_id = 5`, (err, res) => {
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
  return 'postReview';
};

const putHelpful = function(options, cb) {
  return 'putHelpful';
};

const reportReview = function(options, cb) {
  return 'reportReview';
};

module.exports = {getReviews};