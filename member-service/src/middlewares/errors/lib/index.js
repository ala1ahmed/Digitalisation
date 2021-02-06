const { BadRequestError } = require("./bad-request.error");
const { ForbiddenError } = require("./forbidden.error");
const { InternalServerError } = require("./internal-server-error");
const { NotFoundError } = require("./not-Found.error");
const { UnauthorizedError } = require("./unauthorized.error");

const { PaymentError } = require("./payment-error");

module.exports = {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  PaymentError
};
