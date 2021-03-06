const compression = require("compression");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const {
    swaggerOptions
} = require("./swagger/options");
const {
    errorHandlerMiddleware,
  } = require("./middlewares/errors/error-handler.middleware");





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


const eventRouter = require("./routes/event");
app.use("/", eventRouter)



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandlerMiddleware());


app.listen(5002, () => {
    console.log("Server running on port 5002");
});