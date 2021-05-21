const { Base } = require("./base.error");

class PaymentError extends Base {
  constructor(code = 402,message) {
    super({
      message,
      status: 402,
      code,
    });
  }
}

module.exports = {
  PaymentError,
};
