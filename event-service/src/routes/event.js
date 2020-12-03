const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /api/event:
 *  get:
 *    tags:
 *    - test
 *    description: Test route
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", async (req, res) => {
    res.status(200).json({msg: "Hello from event service"});
});

module.exports = router;