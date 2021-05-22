const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(cors());
const services = require("./services");
app.use('*', function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});
const httpProxy = require('express-http-proxy')

const uploadPaths = ["/user/coverPic", "/user/profilePic", "/posts"]
app.use('/api/:serviceKey', async (req, res, next) => {
    const { serviceKey } = req.params;
    const service = services[serviceKey];
    console.log(service);
    if (!service) {
        return next({ message: "Not Found", code: 404 })
    }

    const array = req.originalUrl.split("/").filter((str) => str !== "");
    const path = "/" + array.slice(2, array.length).join("/");
    console.log(path);
    const serviceProxy = httpProxy(`http://${service.name}:${service.port}`, { parseReqBody: !uploadPaths.includes(path) || req.method !== "POST" });
    try {
        serviceProxy(req, res, next);
    } catch (error) {
        console.log(error);
        return next(error.response.data);
    }
})
app.use('*', (_, __, next) => next(new Error({ message: "Not Found" })));

app.use((error, req, res, next) => {
    return res.status(error.code).send(error.message)
})


app.listen(5005, () => {
    console.log("Server running on port 5005");
});

//server.on('upgrade', wsProxy.upgrade);
