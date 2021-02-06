const Member = require("../models/Member");
const Club = require("../models/Club");
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt = require("jsonwebtoken");
const {
  MESSAGES,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} = require("../middlewares/errors");

const register = async (email, password, role, firstName, lastName, clubId) => {

  let club;
  try {
     club = await Club.findByPk(clubId);
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
  if (!club) {
    throw new NotFoundError(MESSAGES.CLUB_NOT_FOUND);
  }

  let user = new Member({
    email,
    password,
    currentStatus: role,
    firstName,
    lastName,
    enabled: true,
  });
  console.log(user);
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
  return true;
};

const login = async (email, password) => {

  let userbase;
  let club;
  try {
     userbase = await Member.findOne({ where: { email } });
     club = await Club.findOne({ where: { email } });
  } catch (error) {
    throw new InternalServerError();
  }

  if ( !club) {
    throw new NotFoundError(MESSAGES.CLUB_NOT_FOUND);
  }
  if(!userbase)
  {
    throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
  }

  let user = userbase || club;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError(MESSAGES.WRONG_PASSWORD);
  }
  let payload = {};
  if (userbase) {
    if (!user.enabled) {
      throw new UnauthorizedError(MESSAGES.ACCOUNT_NOT_VERIFIED);
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

  const token = await jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.tokenTimeOut,
  });
  return token;
};

const resetRequest = async (email) => {
  try {
  } catch (error) {}
};

module.exports = {
  register,
  login,
  resetRequest,
};
