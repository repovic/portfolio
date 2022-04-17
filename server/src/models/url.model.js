const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSchema = new Schema(
    {
        slug: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        redirectTo: {
            type: String,
            trim: true,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        numberOfRedirects: {
            type: Number,
        },
        ip: {
            type: String,
            required: true,
            trim: true,
        },
        restricted: {
            type: Boolean,
            required: true,
        },
        banned: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const URL = mongoose.model("URL", URLSchema);
module.exports = URL;
