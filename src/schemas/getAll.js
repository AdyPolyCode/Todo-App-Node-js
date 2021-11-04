const { getTodos } = require("../controllers/todos");

// get todos schema
module.exports = {
    schema: {
        summary: "Get all Todos",
        description: "Get a list of Todos from database",
        tags: ["Todos"],
        response: {
            200: {
                description: "OK - Successful fetch, no errors",
                type: "object",
                properties: {
                    data: { type: "array" },
                    message: { type: "string" },
                    count: { type: "number" },
                },
                example: {
                    data: [
                        {
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
                    ],
                    message: "Successfully fetched",
                    count: 1,
                },
            },
        },
    },
    handler: getTodos,
};
