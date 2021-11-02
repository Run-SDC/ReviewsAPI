const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'reviews',
  logging: false
});

const Reviews = sequelize.define('reviews', {
  id: {type: Sequelize.INTEGER, primaryKey: true},
  product_id: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  date: Sequelize.BIGINT,
  summary: Sequelize.TEXT,
  body: Sequelize.TEXT,
  recommend: Sequelize.BOOLEAN,
  reported: Sequelize.BOOLEAN,
  reviewer_name: Sequelize.STRING,
  reviewer_email: Sequelize.STRING,
  response: Sequelize.STRING,
  helpfulness: Sequelize.INTEGER
});

const Photos = sequelize.define('review_photos', {
  id: {type: Sequelize.INTEGER, primaryKey: true},
  review_id: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: Reviews,
      // This is the column name of the referenced model
      key: 'id',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  url: Sequelize.TEXT,
});

const Characteristics = sequelize.define('characteristics', {
  id: {type: Sequelize.INTEGER, primaryKey: true},
  product_id: {type: Sequelize.INTEGER, primaryKey: true},
  name: Sequelize.STRING
});

const CharacteristicVals = sequelize.define('characteristic_reviews', {
  id: {type: Sequelize.INTEGER, primaryKey: true},
  characteristic_id: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: Characteristics,
      // This is the column name of the referenced model
      key: 'id',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  review_id: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: Reviews,
      // This is the column name of the referenced model
      key: 'id',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  value: Sequelize.INTEGER,
});


module.exports = {sequelize, Reviews, Photos, Characteristics, CharacteristicVals};