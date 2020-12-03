const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /api/meeting:
 *  get:
 *    tags:
 *    - test
 *    description: Test route
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", async (req, res) => {
    res.status(200).json({msg: "Hello from meeting service"});
});

module.exports = router;