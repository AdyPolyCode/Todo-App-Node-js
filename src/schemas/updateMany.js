const { swapTodos } = require("../controllers/todos");

// put todos by swap
module.exports = {
    schema: {
        summary: "Swap Todos",
        description:
            "Swap Todos, drag and drop the Todos so the position will be replaced one of each other. Todo Id and position must be provided from the front-end.Requested Todo objects must be in a list with Id. If one object is missing from the list || the list has more than two objects, then error will be send.",
        tags: ["Todos"],
        body: {
            type: "object",
            properties: {
                draggedId: { type: "string" },
                droppedId: { type: "string" },
            },
            required: ["draggedId", "droppedId"],
            example: {
                draggedId: "string",
                droppedId: "string",
            },
        },
        response: {
            200: {
                description: "OK - Successfully updated, no errors",
                type: "object",
                properties: {
                    message: { type: "string" },
                },
                example: {
                    message: "Todos successfully updated",
                },
            },
        },
    },
    handler: swapTodos,
};
