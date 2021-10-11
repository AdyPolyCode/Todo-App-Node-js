const CustomError = require("../utils/customError");

function errorHandler(err, req, res) {
    let error = { ...err };
    error.message = err.message;

    // log error in development
    if (process.env.FASTY_ENV === "dev") {
        console.log(err);
    }

    // invalid object id for mongoose
    if (err.name === "CastError") {
        error = new CustomError("Invalid Object Id", 400);
    }

    // cannot create duplicate items
    if (err.code === 11000) {
        error = new CustomError("Todo already exists", 400);
    }

    res.code(error.status || 500).send({
        message: error.message || "Internal Server Error",
    });
}

module.exports = errorHandler;
