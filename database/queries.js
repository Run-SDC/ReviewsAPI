const db = require('./db.js');

const getReviews = function() {
  // db.Reviews.findAll({
  //   where: {
  //     id: 2
  //   }
  // })
  //   .then((res) => {
  //     console.log(res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // return 'getReviews';


  db.Reviews.findByPk(2)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });



  return "test"
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

module.exports = {getReviews};