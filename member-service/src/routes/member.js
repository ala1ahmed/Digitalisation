const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /api/member:
 *  get:
 *    tags:
 *    - test
 *    description: Test route
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", async (req, res) => {
    res.status(200).json({msg: "Hello from member service"});
});

module.exports = router;