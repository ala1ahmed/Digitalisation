const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const { permit } = require("../middlewares/permit");
const Roles = require("../config/Roles");
const { check, validationResult } = require("express-validator");

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    tags:
 *    - Register (Club)
 *    description: Add Member to club
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post(
  "/register",
  [
    check("firstName", "Missing first name").exists().notEmpty(),
    check("lastName", "Missing last Name").exists().notEmpty(),
    check("email", "Missing email").isEmail(),
    check("password", "Missing password").isLength({ min: 8 }),
    check("role", "Missing role").isIn([
      Roles.President,
      Roles.Secretary,
      Roles.Treasurer,
      Roles.VicePresident,
      Roles.Guest,
      Roles.Member,
      Roles.Director,
    ]),
    permit([Roles.Club]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { firstName, lastName, email, password, role } = req.body;

      await register(email, password, role, firstName, lastName, req.user.id);

      return res.status(201).json({ msg: "User registred" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }
);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags:
 *    - Login (Public)
 *    description: login memeber
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post(
  "/login",
  [
    check("email", "Missing email").isEmail(),
    check("password", "Missing password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;

      const token = await login(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }
);

/**
 * @swagger
 * /api/auth/resetRequest:
 *  post:
 *    tags:
 *    - Login (Public)
 *    description: reset password request
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post(
  "/resetRequest",
  [
    check("email", "Missing email").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;

      const token = await login(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }
);

/**
 * @swagger
 * /api/auth/resetRequest:
 *  post:
 *    tags:
 *    - Login (Public)
 *    description: reset password request
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post(
  "/resetRequest",
  [
    check("email", "Missing email").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email } = req.body;

    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }
);

module.exports = router;
