const { BadRequest } = require("../utils/errors");

const handleValidations = (validate) => {
  return (req, res, next) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
      return next();
    }

    const { details } = result.error;

    const messages = details.map((e) => {
      return e.message;
    });

    const msg = messages.join(",");
    throw new BadRequest(msg);
  };
};

module.exports = { handleValidations };
