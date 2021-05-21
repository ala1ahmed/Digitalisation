const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('./Club');

const Fund = db.define('Fund', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sum: Sequelize.FLOAT,
  endDate: Sequelize.DATE,
  startDate: Sequelize.DATE
});

Fund.belongsTo(Club);
Club.hasMany(Fund);

Fund.sync();

module.exports = Fund;
