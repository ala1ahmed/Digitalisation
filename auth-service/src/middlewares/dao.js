const _ = require("lodash");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

module.exports = function (Model) {
  if (!Model) {
    
    throw new Error("Model is required!");
  }
 
  const model = require(`../models/${_.toLower(Model)}`);

  this.create = async (req, res, next) => {
    try {
      const inserted = await model.create(req.body);
      req.model = inserted;
    } catch (e) {
      throw createError.BadRequest;
    }
    return next();
  };
  this.list = async (req, res, next) => {
   
      try { 
        //console.log("all",model.findAll());
        
      const list = await model.findAll({});
      req.models = list;
    } catch (e) {
      console.log("e",e);
      
      throw createError.BadRequest;
    }
    return next();
  };
  this.remove = async (req, res, next) => {
    try {
    //  const removed = await model.findByPk(req.params._id);
      await model.destroy({
        where: {
          id: req.params.id,
        },
      });return res.status(200).json({ msg: "deleted" });;
    } catch (error) {
      throw createError.BadRequest;
    }
  };
  this.getMemerbyid = async (req, res) => {
    try {
      const e = await model.findByPk(req.params.id);
      if (e) return res.status(200).json(e);
      throw res.status(200).json({ msg: "member not found" });;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerError();
    }
  };
  
  this.getbyclubid = async (req, res) => {
    try {
      const e = await model.findAll({
        where: {
          ClubId :req.params.ClubId,
        },});
      console.log("e",e);
      
      if (e) return res.status(200).json(e);
      throw res.status(200).json({ msg: "member not found" });;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerError();
    }
  };
  this.get = async (req, res, next) => {
    const exists = await model.findById(req.params._id);
    req.model = exists;
    return next();
  };
  
  
  this.update = async (req, res, next) => {
    try {
      const m = await model.findByPk(req.params.id);
      m.firstName = req.body.firstName;
      if (req.body.password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        m.password = passwordHash;
      }
      m.gender = req.body.gender;
      m.isStudent = req.body.isStudent;
      m.isInducted = req.body.isInducted;
      m.intronisationDate = req.body.intronisationDate;
      m.currentStatus = req.body.currentStatus;
      m.formerStatus = req.body.formerStatus;
      m.currentCoordinationStatus = req.body.currentCoordinationStatus;
      m.formerCoordinationStatus = req.body.formerCoordinationStatus;
      m.birthDate = req.body.birthDate;
      m.currentFunction = req.body.currentFunction;
      m.currentAddress = req.body.currentAddress;
      m.identityPhoto = req.body.identityPhoto;
      m.nationalIdNumber = req.body.nationalIdNumber;
      m.entryClubDate = req.body.entryClubDate;
      m.radiationDate = req.body.radiationDate;
      m.isClubFriend = req.body.isClubFriend;
      m.isTrainer = req.body.isTrainer;
      m.isAdmin = req.body.isAdmin;
      m.enabled = req.body.enabled;

      const member = await m.save();
      return res.status(200).json(member);
    } catch (error) {
      console.error(error.message);
      throw new InternalServerError();
   } };
};
