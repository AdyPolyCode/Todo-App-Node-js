const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

// Todo schema
const schema = new mongoose.Schema(
    {
        taskCaption: {
            type: String,
            required: [true, "taskCaption must be provided"],
            trim: true,
            unique: true,
            minlength: 4,
            maxlength: 24,
        },
        taskContent: {
            withWho: {
                type: String,
                required: [true, "withWho must be provided"],
                trim: true,
            },
            forWhat: {
                type: String,
                required: [true, "forWhat must be provided"],
                trim: true,
            },
        },
        executionDate: {
            type: Date,
            required: [true, "executionDate must be provided"],
        },
        address: {
            type: String,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
            country: String,
            city: String,
        },
        taskPosition: {
            type: Number,
            default: 0,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// static methods on mongoose schema
schema.statics.getLastTodo = async function () {
    return this.findOne({}).sort({ taskPosition: "desc" });
};

// hooks on mongoose schema
schema.pre("save", async function () {
    const lastTodo = await this.constructor.getLastTodo();
    if (lastTodo) {
        this.taskPosition = lastTodo.taskPosition + 1;
    }
});

schema.pre("save", async function () {
    if (this.address) {
        const loc = await geocoder.geocode(this.address);

        this.location = {
            coordinates: [loc[0].latitude, loc[0].longitude],
            country: loc[0].country,
            city: loc[0].city,
        };
    }
    this.address = undefined;
});

const Todo = mongoose.model("Todo", schema);

module.exports = Todo;
