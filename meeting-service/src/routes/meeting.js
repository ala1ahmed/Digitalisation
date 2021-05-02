const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { addMeeting, getMeetings } = require("../controllers/meetingController");

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
router.post(
    "/", [
        check("startDate", "start date is required"),
        check("endDate", "end date is required"),
        check("clubId", "club is required"),
        check("joiningCode", "joining code is required"),
        check("report", "report is required"),
        check("agenda", "agenda is required"),
        check("address", "address is required"),
        check("creatorMember", "creator is required"),
    ],
    async(req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const {
            startDate,
            endDate,
            clubId,
            joiningCode,
            report,
            agenda,
            address,
            creatorMember,
        } = req.body;

        const createdMeeting = await addMeeting({
            startDate,
            endDate,
            clubId,
            joiningCode,
            report,
            agenda,
            address,
            creatorMember,
        });

        return res.status(201).json(createdMeeting);
    }
);

router.get("/", async(req, res) => {
    const meetings = await getMeetings();
    return res.status(200).json(meetings);
});

module.exports = router;