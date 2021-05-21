const Sequelize = require('sequelize');
const db = require('../config/db');
const Member = require('./Member');
const Event = require('./Event');

const EventParticipant = db.define('Event_Participant', {});

Member.belongsToMany(Event, { through: 'Event_Participant' });
Event.belongsToMany(Member, { through: 'Event_Participant' });

EventParticipant.sync();

module.exports = EventParticipant;
