const jwt = require('jsonwebtoken');
const {
    config
} = require('../config');


const {
    BadRequestError,
    MESSAGES,
    UnauthorizedError
} = require("@tsm/errors")

const permit = (roles) => (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return next(new BadRequestError(MESSAGES.MISSING_TOKEN.an()))
    }
    try {
        const {
            user,
            role
        } = jwt.verify(token, config.jwt.secret);
        if (roles && !roles.map(r => r.toLowerCase()).includes(role.toLowerCase())) {
            //TODO: ??
            return next(new UnauthorizedError(MESSAGES.UNEXPECTED_ROLE.an()));
        }
        req.user = {
            ...user,
            role
        }
        next();
    } catch (error) {
        //TODO: jwt expired
        return next(new UnauthorizedError(MESSAGES.INVALID_TOKEN.an()))
    }
}

router.get("/", permit(["admin", "superadmin", "teacher"]), async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
});


module.exports = {
    permit
}