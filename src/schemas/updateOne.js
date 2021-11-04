const model = require("./schemaModel");
const { updateTodo } = require("../controllers/todos");
const { hasData } = require("../middlewares/hooks");

// put todo schema
module.exports = {
    schema: {
        summary: "Update single Todo",
        description:
            "Update Todo based on request body and Id parameter in the database",
        tags: ["Todos"],
        params: {
            type: "object",
            properties: {
                todoId: {
                    type: "string",
                    description: "Todo Id must be provided to update the data",
                },
            },
        },
        body: {
            type: "object",
            properties: {
                taskCaption: {
                    type: "string",
                },
                taskContent: {
                    type: "object",
                    properties: {
                        withWho: {
                            type: "string",
                        },
                        forWhat: {
                            type: "string",
                        },
                    },
                },
            },
            example: {
                taskCaption: "toUpdate",
            },
        },
        response: {
            200: {
                description: "OK - Successfully updated, no errors",
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
                        taskCaption: "toUpdate",
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
                    },
                    message: "Todo successfully updated",
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
    preValidation: hasData,
    handler: updateTodo,
};
