/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import { Sequelize, Model, Datatypes } from 'sequelize';
// import Credentials from '../credentials';

const Sequelize = require('sequelize');
// const user = 'josh';
// const host = 'localhost';
// const database = '<Reviews>';
// const password = Credentials.dbPassword;
// const port = '8000';

// const sequelize = new Sequelize(database, user, password, {
//   host,
//   port,
//   dialect: 'postgres',
//   logging: false,
// });

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('Reviews', 'josh', {
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  dialectOptions: {
    multipleStatements: true,
  },
});


// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

db.sequelize.authenticate()
  .then({
    console.log('Connection has been established successfully.');
  })
  .catch({
    console.error('Unable to connect to the database:', error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
