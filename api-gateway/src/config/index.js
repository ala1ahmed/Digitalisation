require("dotenv").config();

const config = {

    services: {
        auth:  process.env.AUTH_HOST || "localhost",
        club: process.env.CLUB_HOST || "localhost",
        event: process.env.EVENT_HOST || "localhost",
        meeting: process.env.MEETING_HOST || "localhost",
        member: process.env.MEMBER_HOST || "localhost",
    },
}

module.exports = { config };