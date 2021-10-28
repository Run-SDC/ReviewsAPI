const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'test'
});

module.exports = sequelize;