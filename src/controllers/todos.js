const Todos = require('../models/Todos');
const CustomError = require('../utils/customError');


exports.getTodos = async function(req, res){
    let todos = await Todos.find({})

    res.code(200).send({
        data: todos,
        message: 'Successfully fetched',
        count: todos.length
    })
};


exports.getTodo = async function(req, res){
    const todo = await Todos.findById(req.params.todoId)

    if(!todo){
        return new CustomError('Item Not Found', 404)
    }

    res.code(200).send({
        data: todo,
        message: 'Successfully fetched'
    })
};


exports.createTodo = async function(req, res){
    const todo = await Todos.create(req.body)

    res.code(201).send({
        data: todo,
        message: 'Todo successfully created'
    })
};


exports.updateTodo = async function(req, res){
    const todo = await Todos.findByIdAndUpdate(req.params.todoId, req.body, { new: true })

    if(!todo){
        return new CustomError('Todo Not Found', 404)
    }

    res.code(200).send({
        data: todo,
        message: 'Todo successfully updated'
    })
};


exports.updateTodos = async function(req, res){
    const firstData = req.body[0]
    const secondData = req.body[1]

    const firstTodo = await Todos.updateOnSwap(firstData._id, secondData.taskPosition)

    const secondTodo = await Todos.updateOnSwap(secondData._id, firstData.taskPosition)

    if(!firstTodo || !secondTodo){
        return new CustomError('Todo Not Found', 404)
    }

    res.code(200).send({
        message: 'Todos successfully updated'
    })
};


exports.deleteTodo = async function(req, res){
    const todo = await Todos.findByIdAndDelete(req.params.todoId)

    if(!todo){
        return new CustomError('Todo Not Found', 404)
    }

    res.code(200).send({
        data: todo,
        message: 'Todo successfully deleted'
    })
};