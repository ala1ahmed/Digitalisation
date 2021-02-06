//400 Bad Request — Client sent an invalid request — such as lacking required request body or parameter

const {
    Base
} = require("./base.error")


class BadRequestError extends Base {
    constructor({message,code=400}) {
        super({
            message:message,
            name: "BadRequestError",
            status: 400,
            code
        })
    }
}

module.exports = {
    BadRequestError
}