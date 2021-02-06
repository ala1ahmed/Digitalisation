class Base extends Error {
    constructor({message,name,status,code}) {
        super(message);
        this.timestamp = new Date();
        this.name = name;
        this.status = status;
        this.code = code;
        Error.captureStackTrace(this, Base.captureStackTrace);
    }
}

module.exports = {Base};