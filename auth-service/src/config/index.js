require('dotenv').config()

module.exports = config = {
    jwtSecret: process.env.jwtSecret,
    tokenTimeOut:process.env.tokenTimeOut,
    database: {
        name:process.env.database,
        host:process.env.host,
        user:process.env.user,
        password:process.env.password
    }
}
