const commentService = require("../services/comment.service");
const postService = require("../services/post.service");
const projectService = require("../services/project.service");

const discordWebhookService = require("../services/discordWebhook.service");

const getUserIP = require("../util/getUserIP.util");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getAll: async (req, res) => {
        try {
            const comments = await commentService.getAll();
            const commentsFormatted = [];
            for (let comment of comments) {
                comment = commentService.hideSensitiveInformations(comment);
                commentsFormatted.push(comment);
            }
            res.status(200).json({
                success: true,
                payload: commentsFormatted,
            });
        } catch (error) {
            console.log("commentController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            if (!(await commentService.isCommentExist(commentId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Comment with that id was not found!",
                    },
                });
            }

            await commentService.getById(commentId).then((comment) => {
                return res.status(200).json({
                    success: true,
                    payload: commentService.hideSensitiveInformations(comment),
                });
            });
        } catch (error) {
            console.log("commentController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getCommentsOfPost: async (req, res) => {
        try {
            const objectId = req.params.objectId;
            if (!(await postService.isPostExist(objectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Post with that id was not found!",
                    },
                });
            }

            await commentService
                .getCommentsOfPost(objectId)
                .then((comments) => {
                    let commentsFormatted = [];
                    for (let comment of comments) {
                        comment =
                            commentService.hideSensitiveInformations(comment);
                        commentsFormatted.push(comment);
                    }
                    return res.status(200).json({
                        success: true,
                        payload: commentsFormatted,
                    });
                });
        } catch (error) {
            console.log("commentController.getCommentsOfPost Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getCommentsOfProject: async (req, res) => {
        try {
            const objectId = req.params.objectId;
            if (!(await projectService.isProjectExist(objectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that id was not found!",
                    },
                });
            }

            await commentService
                .getCommentsOfProject(objectId)
                .then((comments) => {
                    let commentsFormatted = [];
                    for (let comment of comments) {
                        comment =
                            commentService.hideSensitiveInformations(comment);
                        commentsFormatted.push(comment);
                    }
                    return res.status(200).json({
                        success: true,
                        payload: commentsFormatted,
                    });
                });
        } catch (error) {
            console.log(
                "commentController.getCommentsOfProject Error: " + error
            );
            return res.status(500).json(serverErrorResponse);
        }
    },

    createComment: async (req, res) => {
        try {
            const forType = req.url.includes("post") ? "Post" : "Project";
            const forObjectId = req.params.objectId;
            const authorId = req.userData._id;
            const { content } = req.body;

            let object = null;
            switch (forType) {
                case "Post":
                    object = await postService.getById(forObjectId);
                    break;
                case "Project":
                    object = await projectService.getById(forObjectId);
                    break;
                default:
                    object = null;
                    break;
            }

            if (!object.commentsEnabled) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: `Comments for this ${forType} are disabled!`,
                    },
                });
            }

            await commentService
                .create({ forType, forObjectId, authorId, content })
                .then((createdComment) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Comment created by: ${createdComment.author.firstName} ${createdComment.author.lastName}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdComment.createdAt,
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdComment._id}`,
                                },
                                fields: [
                                    {
                                        name: "Content: ",
                                        value: createdComment.content,
                                        inline: false,
                                    },
                                    {
                                        name: `For ${createdComment.for} ID: `,
                                        value: createdComment.forObjectId,
                                        inline: false,
                                    },
                                    {
                                        name: "IP: ",
                                        value: getUserIP(req),
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });
                    res.status(200).json({
                        success: true,
                        payload:
                            commentService.hideSensitiveInformations(
                                createdComment
                            ),
                    });
                });
        } catch (error) {
            console.log("commentController.createComment Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    likeComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const userId = req.userData._id;

            if (!(await commentService.isCommentExist(commentId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Comment with that id was not found!",
                    },
                });
            }

            await commentService
                .like(userId, commentId)
                .then((likedComment) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:thumbsup: | Comment liked by: ${userId}`,
                                color: 1127128,
                                description: "",
                                timestamp: likedComment.updatedAt,
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${likedComment._id}`,
                                },
                                fields: [
                                    {
                                        name: "Content: ",
                                        value: likedComment.content,
                                        inline: false,
                                    },
                                    {
                                        name: `For ${likedComment.for} ID: `,
                                        value: likedComment.forObjectId,
                                        inline: false,
                                    },
                                    {
                                        name: "IP: ",
                                        value: getUserIP(req),
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });
                    res.status(200).json({
                        success: true,
                        payload:
                            commentService.hideSensitiveInformations(
                                likedComment
                            ),
                    });
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        return res.status(400).json({
                            success: false,
                            error: {
                                message: "You already liked this comment!",
                            },
                        });
                    }
                });
        } catch (error) {
            console.log("commentController.likeComment Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    dislikeComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const userId = req.userData._id;

            if (!(await commentService.isCommentExist(commentId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Comment with that id was not found!",
                    },
                });
            }

            await commentService
                .dislike(userId, commentId)
                .then((dislikedComment) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:thumbsdown: | Comment disliked by: ${userId}`,
                                color: 1127128,
                                description: "",
                                timestamp: dislikedComment.updatedAt,
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${dislikedComment._id}`,
                                },
                                fields: [
                                    {
                                        name: "Content: ",
                                        value: dislikedComment.content,
                                        inline: false,
                                    },
                                    {
                                        name: `For ${dislikedComment.for} ID: `,
                                        value: dislikedComment.forObjectId,
                                        inline: false,
                                    },
                                    {
                                        name: "IP: ",
                                        value: getUserIP(req),
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });
                    res.status(200).json({
                        success: true,
                        payload:
                            commentService.hideSensitiveInformations(
                                dislikedComment
                            ),
                    });
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        return res.status(400).json({
                            success: false,
                            error: {
                                message: "You already disliked this comment!",
                            },
                        });
                    }
                });
        } catch (error) {
            console.log("commentController.dislikeComment Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
