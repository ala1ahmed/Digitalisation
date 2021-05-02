const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('./Club');

const Member = db.define('Member', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  gender: Sequelize.STRING,
  isStudent: Sequelize.BOOLEAN,
  isInducted: Sequelize.BOOLEAN,
  intronisationDate: Sequelize.DATE,
  currentStatus: Sequelize.STRING,
  formerStatus: Sequelize.JSON,
  currentCoordinationStatus: Sequelize.STRING,
  formerCoordinationStatus: Sequelize.JSON,
  birthDate: Sequelize.DATE,
  currentFunction: Sequelize.STRING,
  currentAddress: Sequelize.STRING,
  identityPhoto: Sequelize.STRING,
  nationalIdNumber: Sequelize.STRING,
  entryClubDate: Sequelize.DATE,
  radiationDate: Sequelize.DATE,
  isClubFriend: Sequelize.BOOLEAN,
  isTrainer:Sequelize.BOOLEAN,
  isAdmin: Sequelize.BOOLEAN,
  formerClubsList: Sequelize.JSON,
  enabled: Sequelize.BOOLEAN,
});
Member.belongsTo(Club);
Club.hasMany(Member);
Member.sync();
module.exports = Member;
