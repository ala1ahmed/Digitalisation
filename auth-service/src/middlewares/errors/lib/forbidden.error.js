//403 Forbidden — Client authenticated but does not have permission to access the requested resource

const { Base } = require("./base.error")

class ForbiddenError extends Base {
    constructor({message,code=403}) {
        super({
            message,
            name:"ForbiddenError",
            status: 403,
            code
        })
    }
}

module.exports = {
    ForbiddenError
}