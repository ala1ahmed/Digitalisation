const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club');
const Member = require('../models/Member');

const Training = db.define('Training', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  address: Sequelize.STRING,
  state: Sequelize.STRING,
  trainer: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: 'id'
    }
  }
});

Training.belongsTo(Club);
Club.hasMany(Training);

Training.sync();

module.exports = Training;
