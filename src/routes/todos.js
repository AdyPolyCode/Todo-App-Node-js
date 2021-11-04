const {
    getOne,
    getAll,
    createOne,
    updateOne,
    updateMany,
    deleteOne,
} = require("../schemas");

async function todoRoutes(fastify, options, done) {
    // get all todos
    fastify.get("/", getAll);

    // get single todo
    fastify.get("/:todoId", getOne);

    // create single todo
    fastify.post("/", createOne);

    // update single todo
    fastify.put("/:todoId", updateOne);

    // update todos
    fastify.patch("/", updateMany);

    // delete single todo
    fastify.delete("/:todoId", deleteOne);

    done();
}

module.exports = todoRoutes;
