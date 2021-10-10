require("colors");
require("dotenv").config({ path: ".env" });
const dbConnect = require("./src/db/dbConnect");
const Todos = require("./src/models/Todos");
const data = require("./src/data/moc_data.json");

// connect to db
dbConnect();

// insert all data from <- json to -> mongo db
const insertData = async () => {
    try {
        await Todos.create(data);
        console.log(`Data successfully inserted...`.blue.underline.bold);
        process.exit(0);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

// destroy all data from <- mongo db
const destroyData = async () => {
    try {
        await Todos.deleteMany();
        console.log(`Data successfully destroyed...`.blue.underline.bold);
        process.exit(0);
    } catch (error) {
        console.log(error.message.red.bold);
        process.exit(1);
    }
};

if (process.argv[2] === "i") {
    insertData();
} else if (process.argv[2] === "d") {
    destroyData();
}
