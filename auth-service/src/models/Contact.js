const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club');
const Member = require('./Member');

const Contact = db.define('Contact', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  details: Sequelize.TEXT,
  category: Sequelize.STRING,
  name: Sequelize.TEXT,
  creatorMember: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: 'id'
    }
  }
});

Contact.belongsTo(Club);
Club.hasMany(Contact);

Contact.sync();

module.exports = Contact;
