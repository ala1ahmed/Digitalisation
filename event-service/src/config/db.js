const Sequelize = require('sequelize');
const config = require('.');

const database = config.database.name;
const user = config.database.user;
const host = config.database.host;
const password = config.database.password;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timestamps: true,
});

module.exports = db;