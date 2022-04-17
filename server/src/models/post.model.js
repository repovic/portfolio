const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
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
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Published", "Unpublished"],
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

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
