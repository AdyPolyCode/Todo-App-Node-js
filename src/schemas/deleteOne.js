const model = require("./schemaModel");
const { deleteTodo } = require("../controllers/todos");

// delete todo schema
module.exports = {
    schema: {
        summary: "Delete single Todo",
        description:
            "Delete single Todo from the database based on the provided object Id",
        tags: ["Todos"],
        params: {
            type: "object",
            properties: {
                todoId: {
                    type: "string",
                    description: "Todo Id must be provided to delete the data",
                },
            },
        },
        response: {
            200: {
                description: "OK - Successfully deleted, no errors",
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: { ...model },
                    },
                    message: { type: "string" },
                },
                example: {
                    data: {
                        taskCaption: "Fly",
                        taskContent: {
                            withWho: "N",
                            forWhat: "N",
                        },
                        executionDate: "2050-01-01",
                        location: {
                            coordinates: [17.113207, 48.065466],
                            country: null,
                            city: "Bratislava",
                        },
                        taskPosition: 0,
                        isCompleted: false,
                        createdAt: "2021-10-17",
                        updatedAt: "2021-10-17",
                    },
                    message: "Todo successfully deleted",
                },
            },
            400: {
                description: "Todo not found of invalid Id",
                type: "object",
                properties: {
                    message: {
                        type: "string",
                    },
                },
                example: {
                    message: "Invalid Todo Id",
                },
            },
            404: {
                description: "Todo not found of wrong Id",
                type: "object",
                properties: {
                    message: {
                        type: "string",
                    },
                },
                example: {
                    message: "Todo not found",
                },
            },
        },
    },
    handler: deleteTodo,
};
