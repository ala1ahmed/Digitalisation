const Sequelize = require('sequelize');
const db = require('../config/db');
const Club = require('../models/Club');
const Event = require('../models/Event');

const EventClub = db.define('Event_Club', {});

Club.belongsToMany(Event, { through: 'Event_Club' });
Event.belongsToMany(Club, { through: 'Event_Club' });

EventClub.sync();

module.exports = EventClub;
