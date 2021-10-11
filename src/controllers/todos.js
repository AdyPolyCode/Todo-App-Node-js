const Todos = require("../models/Todos");
const CustomError = require("../utils/customError");

exports.getTodos = async function (req, res) {
    let todos = await Todos.find({});

    res.code(200).send({
        data: todos,
        message: "Successfully fetched",
        count: todos.length,
    });
};

exports.getTodo = async function (req, res) {
    const todo = await Todos.findById(req.params.todoId);

    if (!todo) {
        return new CustomError("Item Not Found", 404);
    }

    res.code(200).send({
        data: todo,
        message: "Successfully fetched",
    });
};

exports.createTodo = async function (req, res) {
    const todo = await Todos.create(req.body);

    res.code(201).send({
        data: todo,
        message: "Todo successfully created",
    });
};

exports.updateTodo = async function (req, res) {
    const todo = await Todos.findByIdAndUpdate(req.params.todoId, req.body, {
        new: true,
    });

    if (!todo) {
        return new CustomError("Todo Not Found", 404);
    }

    res.code(200).send({
        data: todo,
        message: "Todo successfully updated",
    });
};

exports.swapTodos = async function (req, res) {
    let firstTodo;
    let secondTodo;

    [firstTodo, secondTodo] = [...req.body];

    [firstTodo.taskPosition, secondTodo.taskPosition] = [
        secondTodo.taskPosition,
        firstTodo.taskPosition,
    ];

    firstTodo = await Todos.findByIdAndUpdate(
        { _id: firstTodo._id },
        { taskPosition: firstTodo.taskPosition }
    );
    secondTodo = await Todos.findByIdAndUpdate(
        { _id: secondTodo._id },
        { taskPosition: secondTodo.taskPosition }
    );

    if (!firstTodo || !secondTodo) {
        return new CustomError("Todo Not Found", 404);
    }

    res.code(200).send({
        message: "Todos successfully updated",
    });
};

exports.deleteTodo = async function (req, res) {
    const todo = await Todos.findByIdAndDelete(req.params.todoId);

    if (!todo) {
        return new CustomError("Todo Not Found", 404);
    }

    res.code(200).send({
        data: todo,
        message: "Todo successfully deleted",
    });
};
