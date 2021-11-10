const {
  getOne,
  getAll,
  createOne,
  updateOne,
  updateMany,
  deleteOne,
} = require("../schemas");

async function todoRoutes(fastify, options, done) {
  fastify.register(require("fastify-cors"), {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
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
