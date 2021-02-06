//401 Unauthorized — Client failed to authenticate with the server

const {
    Base
} = require("./base.error")


class UnauthorizedError extends Base {
    constructor({message,code=401}) {
        super({
            message,
            name:"UnauthorizedError",
            status: 401,
            code
        })
    }
}

module.exports = {
    UnauthorizedError
}