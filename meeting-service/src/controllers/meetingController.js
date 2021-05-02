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

const getMeetingById = async(meetingId) => {
    let meeting;
    try {
        meeting = Meeting.findByPk(meetingId);
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
    if (!meeting) throw new NotFoundError(MESSAGES.MEETING_NOT_FOUND);
    return meeting;
};

const deleteMeeting = async(meetingId) => {
    let meeting;
    try {
        meeting = Meeting.findByPk(meetingId);
    } catch (error) {
        throw new InternalServerError();
    }
    if (!meeting) throw new NotFoundError(MESSAGES.MEETING_NOT_FOUND);
    await meeting.destroy();
    return true;
};

const updateMeeting = async({
    startDate,
    endDate,
    meetingId,
    agenda,
    address,
    report,
    joiningCode,
}) => {
    let meeting;
    try {
        meeting = Meeting.findByPk(meetingId);
    } catch (error) {
        throw new InternalServerError();
    }
    if (!meeting) throw new NotFoundError(MESSAGES.MEETING_NOT_FOUND);

    meeting.startDate = startDate;
    meeting.endDate = endDate;
    meeting.agenda = agenda;
    meeting.address = address;
    meeting.report = report;
    meeting.joiningCode = joiningCode;

    await meeting.save();
    return meeting;
};

module.exports = {
    addMeeting,
    getMeetings,
    getMeetingById,
    deleteMeeting,
    updateMeeting,
};