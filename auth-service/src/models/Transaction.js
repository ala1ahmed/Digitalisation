const Sequelize = require('sequelize');
const db = require('../config/db');
const Fund = require('./Fund');
const Member = require('./Member');

const Transaction = db.define('Transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: Sequelize.FLOAT,
  date: Sequelize.DATE,
  type: Sequelize.BOOLEAN,
  hasBill: Sequelize.BOOLEAN,
  theme: Sequelize.STRING,
  creatorMember: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: 'id'
    }
  },
  billPhoto: Sequelize.STRING,
  deadlineDate: Sequelize.DATE,
  isPaid: Sequelize.BOOLEAN
});

Transaction.belongsTo(Fund);
Fund.hasMany(Transaction);

Transaction.sync();

module.exports = Transaction;
