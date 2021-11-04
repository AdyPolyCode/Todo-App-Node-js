const model = require("./schemaModel");
const { createTodo } = require("../controllers/todos");

// post todo schema
module.exports = {
    schema: {
        summary: "Create single Todo",
        description: "Create Todo based on request data from client",
        tags: ["Todos"],
        body: {
            type: "object",
            properties: { ...model },
            required: ["taskCaption", "taskContent", "executionDate"],
            example: {
                taskCaption: "Fly",
                taskContent: {
                    withWho: "N",
                    forWhat: "N",
                },
                executionDate: "2050-01-01",
                address: "Bratislava",
            },
        },
        response: {
            201: {
                description: "OK - Successfully created, no errors",
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: {
                            _id: { type: "string" },
                            taskCaption: { type: "string" },
                        },
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
                    message: "Todo successfully created",
                },
            },
            400: {
                description: "Todo already exist || Missing value from body",
                type: "object",
                properties: {
                    message: { type: "string" },
                },
                example: {
                    message: 'body should have required property "taskCaption"',
                },
            },
        },
    },
    handler: createTodo,
};
