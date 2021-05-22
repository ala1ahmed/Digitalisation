const compression = require("compression");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const DB = require("./config/db");
const {
  errorHandlerMiddleware,
} = require("./middlewares/errors/error-handler.middleware");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("./swagger/options");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

DB.authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(bodyParser.json());

app.disable("x-powered-by");
app.use(hpp());
app.enable("trust proxy");
app.use(helmet());

app.use(compression());
app.use(cors());

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandlerMiddleware());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
