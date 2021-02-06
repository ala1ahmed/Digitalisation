const jwt = require("jsonwebtoken");
const config = require("../config");

const permit = (roles) => (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Unauthorized token needed" }] });
  }
  try {
      console.log(roles);
    const { user } = jwt.verify(token, config.jwtSecret);
    if (
      roles &&
      !roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase())
    ) {
      return res.status(400).json({ errors: [{ msg: "Unexpected role" }] });
    }
    req.user = {
      ...user,
    };
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ errors: [{ msg: "Unauthorized token needed2" }] });
  }
};

module.exports = {
  permit,
};
