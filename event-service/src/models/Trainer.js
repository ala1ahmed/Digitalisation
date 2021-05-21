const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('./Club');

const Trainer = db.define('Trainer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mail: {
    type: Sequelize.STRING,
    unique: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  address: Sequelize.STRING
});
Trainer.belongsTo(Club);
Club.hasMany(Trainer);
Trainer.sync();
module.exports = Trainer;
