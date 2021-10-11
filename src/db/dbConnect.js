const fp = require("fastify-plugin");
const mongoose = require("mongoose");

async function dbConnect() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = fp(dbConnect);
