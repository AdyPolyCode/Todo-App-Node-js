const Todo = require('../models/Todos');
const CustomError = require('../utils/customError');


// get todo data from body
exports.positionManager = async function(req, res){
    if(req.body.length > 2 || req.body.length < 2){
        throw new CustomError('Body must contain 2 items', 400)
    }

    const todo1 = req.body[0].taskPosition
    const todo2 = req.body[1].taskPosition

    return todo1 < todo2 ? req.body = {
        todo1: { ...req.body[0] },
        todo2: { ...req.body[1] }
    } : req.body = {
        todo1: { ...req.body[1] },
        todo2: { ...req.body[0] }
    }
};

// validate body
exports.hasData = async function(req, res){
    if(!Object.keys(req.body).length > 0){
        throw new CustomError('Please choose at least one field to update', 400)
    }

    return req
};