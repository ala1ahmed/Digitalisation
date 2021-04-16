const express = require("express");
const router = express.Router();
const eventController = require("../controller/event");

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
router.post("/", eventController.addEvent);
router.put("/:id", eventController.updateEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
