"use strict";

module.exports.validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
    });
    if (error) {
      return res.status(422).json({
        status: "fail",
        message: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
