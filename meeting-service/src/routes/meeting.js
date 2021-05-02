const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
    addMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
} = require("../controllers/meetingController");

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
        check("startDate", "start date is required").not().notEmpty(),
        check("endDate", "end date is required").not().notEmpty(),
        check("clubId", "club is required").not().notEmpty(),
        check("joiningCode", "joining code is required").not().notEmpty(),
        check("report", "report is required").not().notEmpty(),
        check("agenda", "agenda is required").not().notEmpty(),
        check("address", "address is required").not().notEmpty(),
        check("creatorMember", "creator is required").not().notEmpty(),
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
        try {
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
        } catch (error) {
            next(error);
        }
    }
);

router.put(
    "/", [
        check("meetingId", "meeting id is required").not().notEmpty(),
        check("startDate", "start date is required").not().notEmpty(),
        check("endDate", "end date is required").not().notEmpty(),
        check("joiningCode", "joining code is required").not().notEmpty(),
        check("report", "report is required").not().notEmpty(),
        check("agenda", "agenda is required").not().notEmpty(),
        check("address", "address is required").not().notEmpty(),
    ],
    async(req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const {
            startDate,
            endDate,
            meetingId,
            joiningCode,
            report,
            agenda,
            address,
        } = req.body;
        try {
            const updatedMeeting = updateMeeting({
                startDate,
                endDate,
                joiningCode,
                report,
                meetingId,
                agenda,
                address,
            });
            return res.status(202).json(updatedMeeting);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:meetingId", async(req, res, next) => {
    const { meetingId } = req.params;
    try {
        await deleteMeeting(meetingId);
        return res.status(204);
    } catch (error) {
        next(error);
    }
});

router.get("/:meetingId", (req, res) => {
    const { meetingId } = req.params;
    try {
        let meeting = getMeetingById(meetingId);
        return res.status(200).json(meeting);
    } catch (error) {
        next(error);
    }
});

router.get("/", async(req, res) => {
    const meetings = await getMeetings();
    return res.status(200).json(meetings);
});

module.exports = router;