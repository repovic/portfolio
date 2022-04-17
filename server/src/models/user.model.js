const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 5,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        displayName: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ["Administrator", "Subscriber"],
        },
        avatarUrl: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
            trim: true,
        },
        ip: {
            type: String,
            required: true,
            trim: true,
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
