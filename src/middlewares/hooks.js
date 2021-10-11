const Todo = require("../models/Todos");
const CustomError = require("../utils/customError");

// validate body
exports.hasData = async function (req, res) {
    if (!Object.keys(req.body).length > 0) {
        throw new CustomError(
            "Please choose at least one field to update",
            400
        );
    }

    return req;
};
