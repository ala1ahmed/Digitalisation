const Sequelize = require('sequelize');
const db = require('../config/db');

const Club = db.define('Club', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password : {
    type: Sequelize.STRING,
  },
  name: Sequelize.STRING,
  facebookLink: Sequelize.STRING,
  intagrammeLink: Sequelize.STRING,
  linkedinLink: Sequelize.STRING,
  twitterLink: Sequelize.STRING,
  charter: Sequelize.STRING,
  address: {
    type: Sequelize.STRING,
    defaultValue: 'Tunisia'
  },
  city: Sequelize.STRING,
  clubType: {
    type: Sequelize.ENUM,
    values: ['Rotary', 'Rotaract']
  },
  charterDateobtaining: Sequelize.DATEONLY,
  isCoordinationStanding: Sequelize.BOOLEAN,
  hasSubscriptionPaid: Sequelize.BOOLEAN,
  isCommunal: Sequelize.BOOLEAN
});
Club.sync();
module.exports = Club;
