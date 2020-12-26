const Logger = require("../utils/Logger");


const errorHandlerMiddleware = () => (error, req, res, next) => {
    Logger.error({message:error.message,...error})
    return res.status(error.status).json({
        errors: [{
            status: error.status,
            name: error.name,
            message: error.message,
            code: error.code,
            timestamp: error.timestamp
        }]
    });
};

module.exports = {
    errorHandlerMiddleware
};