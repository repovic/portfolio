const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        url: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        featuredImage: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        excerpt: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        commentsEnabled: {
            type: Boolean,
            required: true,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
