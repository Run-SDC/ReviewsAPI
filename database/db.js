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
      console.log('Data from promise library', data)

      for(var i = 0; i < data.length; i++) {
        let photo = {id:data[i].id, url: data[i].url};
        data[i].photos = [photo]
        delete data[i].id;
        delete data[i].url;
      }
      console.log('Data from promise library', data)
      cb(null,data);
    })
    .catch(function(error) {
        throw error;
        console.log("Error retrieving reviews from db.")
    });

};

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

module.exports = {getReviews, reportReview, putHelpful, postReview};