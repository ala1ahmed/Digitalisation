const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club');
const Logo = db.define('Logo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  link: Sequelize.STRING,
  name: Sequelize.STRING
});

Logo.belongsTo(Club);
Club.hasMany(Logo);

Logo.sync();

module.exports = Logo;
