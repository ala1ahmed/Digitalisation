const {
    MESSAGES,
    UnauthorizedError,
    NotFoundError,
    InternalServerError,
} = require("../middlewares/errors");

const Meeting = require("../models/Meeting");
const Club = require("../models/Club");

const addMeeting = async({
    startDate,
    endDate,
    clubId,
    creatorMember,
    agenda,
    address,
    report,
    joiningCode,
}) => {
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

    const meeting = new Meeting({
        startDate,
        endDate,
        clubId,
        creatorMember,
        agenda,
        address,
        report,
        joiningCode,
    });

    try {
        await meeting.save();
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
    return meeting;
};

const getMeetings = async() => {
    let meetings;
    try {
        meetings = Meeting.find();
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }

    return meetings;
};

module.exports = {
    addMeeting,
    getMeetings
};