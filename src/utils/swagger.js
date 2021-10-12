const fp = require("fastify-plugin");

module.exports = fp(function (fastify, options, done) {
    fastify.register(require("fastify-swagger"), {
        routePrefix: "/documentation",
        swagger: {
            info: {
                title: "Todos API",
                description: "Todos with CRUD operations",
                version: "0.1.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            host: "localhost:5555",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [{ name: "Todos", description: "Todos endpoints" }],
        },
        exposeRoute: true,
    });
    done();
});
