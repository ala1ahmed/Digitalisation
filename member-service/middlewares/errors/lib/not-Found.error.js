//404 Not Found — The requested resource does not exist

const { Base } = require("./base.error")


class NotFoundError extends Base {
    constructor({message,code=404}) {
        super({
            message,
            name:"NotFoundError",
            status: 404,
            code
        })
    }
}

module.exports = {
    NotFoundError
}