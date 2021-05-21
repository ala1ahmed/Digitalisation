const Sequelize = require('sequelize');
const db = require('../config/db');
const Member = require('./Member');

const Event = db.define('Event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  desc: Sequelize.TEXT,
  allDay: Sequelize.BOOLEAN,
  address: Sequelize.STRING,
  eventType: Sequelize.STRING,
  creatorMember: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: 'id'
    }
  },
  link: Sequelize.STRING
});

Event.sync();

module.exports = Event;
