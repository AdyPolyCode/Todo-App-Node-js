// model object
module.exports = {
    taskCaption: { type: "string" },
    taskContent: {
        type: "object",
        properties: {
            withWho: { type: "string" },
            forWhat: { type: "string" },
        },
    },
    executionDate: { type: "string" },
    address: { type: "string" },
    location: {
        type: "object",
        properties: {
            coordinates: {
                type: "array",
            },
            country: {
                type: "string",
            },
            city: {
                type: "string",
            },
        },
    },
    isCompleted: { type: "boolean" },
};
