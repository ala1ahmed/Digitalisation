const { config } = require("./config")

const services = {
    "auth": {
        port: 5000,
        name: config.services.auth
    },
    "club": {
        port: 5001,
        name: config.services.club
    },
    "event": {
        port: 5002,
        name: config.services.event
    },
    "meeting": {
        port: 5003,
        name: config.services.meeting
    },
    "member": {
        port: 5004,
        name: config.services.member
    }
}

module.exports = services