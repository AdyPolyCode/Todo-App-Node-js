require("colors");
require("dotenv").config({ path: ".env" });
const fastify = require("fastify")({ logger: { prettyPrint: true } });

// plugin for swagger documentation
fastify.register(require("./src/utils/swagger"));

// route plugins
fastify.register(require("./src/db/dbConnect"));
fastify.register(require("./src/routes/todos"), { prefix: "/api/todos" });

// error handler instead of default
fastify.setErrorHandler(require("./src/middlewares/errorHandler"));

// server listening for requests
const server = async () => {
    try {
        await fastify.ready((err) => {
            if (err) {
                console.log(err);
            }
            if (!err) {
                console.log(
                    "All plugins loaded successfully".bgWhite.black.bold
                );
            }
        });
        await fastify.listen(process.env.FASTY_PORT);
    } catch (error) {
        fastify.log.error(error.red.underline.bold);
        process.exit(1);
    }
};

server();

// handle error in promises
process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection: ", reason.stack);
    process.exit(1);
});
