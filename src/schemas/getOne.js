const model = require("./schemaModel");
const { getTodo } = require("../controllers/todos");

// get todo schema
module.exports = {
    schema: {
        summary: "Get single Todo",
        description:
            "Get single Todo from the database based on the provided object Id",
        tags: ["Todos"],
        params: {
            type: "object",
            properties: {
                todoId: {
                    type: "string",
                    description: "Todo ID",
                },
            },
        },
        response: {
            200: {
                description: "OK - Successful fetch, no errors",
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: { ...model },
                    },
                    message: { type: "string" },
                },
                example: {
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
                    message: "Invalid Todo Id",
                },
            },
        },
    },
    handler: getTodo,
};
