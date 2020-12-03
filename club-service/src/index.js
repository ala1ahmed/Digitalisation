const compression = require("compression");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const {
    swaggerOptions
} = require("./swagger/options");





const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.disable('x-powered-by');
app.use(hpp());
app.enable('trust proxy');
app.use(helmet());

app.use(compression());
app.use(cors());


const clubRouter = require("./routes/club");
app.use("/api/club", clubRouter);



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(5001, () => {
    console.log("Server running on port 5001");
});