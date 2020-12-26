const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club');
const Member = require('./Member');

const Meeting = db.define('Meeting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  agenda: Sequelize.TEXT,
  address: Sequelize.STRING,
  report: Sequelize.TEXT,
  creatorMember: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: 'id'
    }
  },
  joiningCode: Sequelize.STRING
});

Meeting.belongsTo(Club);
Club.hasMany(Meeting);

Meeting.sync();

module.exports = Meeting;
