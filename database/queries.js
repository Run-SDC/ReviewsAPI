const db = require('./db.js');

const getReviews = function() {
  db.Reviews.findAll({
    where: {
      id: 2
    }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
  return 'getReviews';
};

const getMeta = function() {
  return 'getMeta';
};

const postReview = function() {
  return 'postReview';
};

const putHelpful = function() {
  return 'putHelpful';
};

const reportReview = function() {
  return 'reportReview';
};

module.exports = {getReviews, getMeta, postReview, putHelpful, reportReview};