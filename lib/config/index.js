require("dotenv").config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mongo: {
        url: process.env.MONGO_URL
    },
    mailService:{
        url:process.env.MAIL_SERVICE_URL
    },
    mail: {
        service: process.env.MAIL_SERVICE,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD
    }
}

module.exports = {config};