const express = require("express");
const router = express.Router();
const { login, register,profile } = require("../controllers/authController");
const { permit } = require("../middlewares/permit");
const Roles = require("../config/Roles");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const render = require("../middlewares/render");
const DAO = require("../middlewares/dao");
const dao = new DAO("Member");
const Member = require("../models/Member");



router.put("/updatemember/:id",  dao.update,render.update);
router.get("/getmember/:id",  dao.getMemerbyid);
router.get("/getmemberbyclubid/:ClubId",  dao.getbyclubid);
router.delete("/delete/:id",  dao.remove, render.remove);
router.get("/", dao.list, render.list);
router.get("/profile",   profile, render.get);
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
      check("email", "Missing email").isEmail()
          .custom((value, {req, loc, path}) => {
            return Member.findOne({
              where: {
                email: req.body.email,
              }
            }).then(user => {
              if (user) {
                return Promise.reject('Email already in use');
              }
            });
          }),
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
      // permit([Roles.Club]),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        const { firstName, lastName, email, password, role } = req.body;

        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });



        await register(email, password, role, firstName, lastName);

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
//router.post("/loginn", controller.login, render.get);




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
