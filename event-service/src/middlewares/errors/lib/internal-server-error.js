//500 Internal Server Error — A generic error occurred on the server

const { Base } = require("./base.error")

class InternalServerError extends Base {
    constructor() {
        super({
            message:"InternalServerError",
            name: "InternalServerError",
            status: 500,
            code:500
        })
    }
}

module.exports = {
    InternalServerError
}