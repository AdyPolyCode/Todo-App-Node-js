const winstonLog = require("../utils/logger");
const CustomError = require("../utils/customError");

const errors = {
    11000: {
        message: "Todo already exists",
        status: 400,
    },
    CastError: {
        message: "Invalid Object Id",
        status: 400,
    },
};

function errorHandler(err, req, res) {
    let error = errors[err.code || err.name] || {};

    // log error in development
    if (process.env.FASTY_ENV === "dev") {
        winstonLog.error(err.stack);
    }

    if (err instanceof CustomError) {
        error = { ...err };
        error.message = err.message;
    }

    // validation from schema
    if (err.validation) {
        error.message = err.validation[0].message;
        error.status = 400;
    }

    res.code(error.status || 500).send({
        message: error.message || "Internal Server Error",
    });
}

module.exports = errorHandler;
