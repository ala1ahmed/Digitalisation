const Member = require("../models/Member");
const Club = require("../models/Club");
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt = require("jsonwebtoken");

const register = async (email, password, role, firstName, lastName,clubId) => {
  
  
    let club = await Club.findByPk(clubId);
  if (!club) {
    throw new Error("Club does not exists");
  }

  let user = new Member({
    email,
    password,
    currentStatus: role,
    firstName,
    lastName,
    enabled: true,
  });
  console.log(user)
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);
  await user.save();
  return true;
};

const login = async (email, password) => {
  let userbase = await Member.findOne({ where: { email } });
  let club = await Club.findOne({ where: { email } });
  if (!userbase && !club) {
    throw new Error("Nonexistent User");
  }

  let user = userbase || club;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }
  let payload = {};
  if (userbase) {
    if (!user.enabled) {
      throw new Error("Need verification by your own club");
    }

    payload = {
      user: {
        id: user.id,
        clubId: user.ClubId,
        role: user.currentStatus,
      },
    };
  } else {
    payload = {
      user: {
        id: user.id,
        role: Roles.Club,
      },
    };
  }

  const token= await jwt.sign(
    payload,
    config.jwtSecret,
    { expiresIn: config.tokenTimeOut },
  );
  return token;
};

module.exports = {
  register,
  login,
};
