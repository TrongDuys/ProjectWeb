const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        disease: {
            type: String,
            required: true,
            trim: true,
        },
        symptom: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        solution: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model("disease", userSchema);
