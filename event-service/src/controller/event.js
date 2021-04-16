const express = require("express");
const Event = require("../models/Event");
const {
  InternalServerError,
  NotFoundError,
  MESSAGES,
} = require("../middlewares/errors");
const addEvent = async (req, res) => {
  const {
    title,
    start,
    end,
    address,
    eventType,
    desc,
    creatorMember,
    link,
  } = req.body;
  try {
    const event = new Event({
      title,
      start,
      end,
      address,
      eventType,
      desc,
      creatorMember,
      link,
    });
    event.allDay = false;
    const addedEvent = await event.save();
    return res.status(201).json(addedEvent);
  } catch (err) {
    console.error(err.message);
    throw new InternalServerError();
  }
};
const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    if (events) return res.status(200).json(events);
    else throw new InternalServerError();
  } catch (err) {
    console.error(err.message);
    throw new InternalServerError();
  }
};
const getEventById = async (req, res) => {
  try {
    const e = await Event.findByPk(req.params.id);
    if (e) return res.status(200).json(e);
    throw new NotFoundError(MESSAGES.EVENT_NOT_FOUND);
  } catch (error) {
    console.error(error.message);
    throw new InternalServerError();
  }
};
const updateEvent = async (req, res) => {
  try {
    const e = await Event.findByPk(req.params.id);
    console.log("event ", e);
    e.title = req.body.title;
    e.start = req.body.start;
    e.end = req.body.end;
    e.address = req.body.address;
    e.eventType = req.body.eventType;
    e.description = req.body.desc;
    e.creatorMember = req.body.creatorMember;
    e.link = req.body.link;
    e.allDay = req.body.allDay;
    const event = await e.save();
    return res.status(200).json(event);
  } catch (error) {
    console.error(error.message);
    throw new InternalServerError();
  }
};

const deleteEvent = (req, res) => {
  try {
    Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ msg: "deleted" });
  } catch (err) {
    console.error(err.message);
    throw new InternalServerError();
  }
};

module.exports = {
  addEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
