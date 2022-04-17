const Comment = require("../models/comment.model");

const userService = require("./user.service");

const self = (module.exports = {
    format: (comment) => {
        return {
            _id: comment._id,
            for: comment.for,
            forObjectId: comment.forObjectId,
            author: userService.format(comment.author),
            content: comment.content,
            likes: comment.likes,
            dislikes: comment.dislikes,
            isHidden: comment.isHidden,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        };
    },

    hideSensitiveInformations: (comment) => {
        if (!comment.isHidden) {
            return {
                _id: comment._id,
                for: comment.for,
                forObjectId: comment.forObjectId,
                author: userService.hideSensitiveInformations(comment.author),
                content: comment.content,
                likes: comment.likes,
                dislikes: comment.dislikes,
                isHidden: comment.isHidden,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            };
        } else {
            return {};
        }
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await Comment.find()
                .then(async (comments) => {
                    for (let comment of comments) {
                        comment.author = await userService.getById(
                            comment.author
                        );
                    }
                    resolve(comments);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (commentId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.findById(commentId)
                .then(async (comment) => {
                    comment.author = await userService.getById(comment.author);
                    resolve(comment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getCommentsOfPost: async (objectId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.find({ for: "Post", forObjectId: objectId })
                .sort({ createdAt: -1 })
                .then(async (comments) => {
                    for (let comment of comments) {
                        comment.author = await userService.getById(
                            comment.author
                        );
                    }
                    resolve(comments);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getCommentsOfProject: async (objectId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.find({ for: "Project", forObjectId: objectId })
                .sort({ createdAt: -1 })
                .then(async (comments) => {
                    for (let comment of comments) {
                        comment.author = await userService.getById(
                            comment.author
                        );
                    }
                    resolve(comments);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isCommentExist: async (commentId) => {
        try {
            if (!(await self.getById(commentId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({ forType, forObjectId, authorId, content }) => {
        return new Promise(async (resolve, reject) => {
            const newComment = new Comment({
                for: forType,
                forObjectId: forObjectId,
                author: authorId,
                content: content,
                likes: [],
                dislikes: [],
                isHidden: false,
            });

            await newComment
                .save()
                .then(async ({ _id }) => {
                    const createdComment = await self.getById(_id);
                    resolve(createdComment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    hide: async (commentId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.findByIdAndUpdate(commentId, {
                isHidden: true,
            })
                .then(async ({ _id }) => {
                    const hiddenComment = await self.getById(_id);
                    resolve(hiddenComment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    like: async (userId, commentId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.findByIdAndUpdate(commentId, {
                $addToSet: { likes: userId },
            })
                .then(async ({ _id }) => {
                    let likedComment = await self.getById(_id);
                    if (likedComment.dislikes.includes(userId)) {
                        await Comment.findByIdAndUpdate(likedComment._id, {
                            $pull: { dislikes: userId },
                        }).then(async () => {
                            likedComment = await self.getById(_id);
                        });
                    }

                    resolve(likedComment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    dislike: async (userId, commentId) => {
        return new Promise(async (resolve, reject) => {
            await Comment.findByIdAndUpdate(commentId, {
                $addToSet: { dislikes: userId },
            })
                .then(async ({ _id }) => {
                    let dislikedComment = await self.getById(_id);
                    if (dislikedComment.likes.includes(userId)) {
                        await Comment.findByIdAndUpdate(dislikedComment._id, {
                            $pull: { likes: userId },
                        })
                            .then(async () => {
                                dislikedComment = await self.getById(_id);
                            })
                            .catch(() => {});
                    }

                    resolve(dislikedComment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (commentId) => {
        return new Promise(async (resolve, reject) => {
            const deletedComment = await self.getById(commentId);

            await Comment.findByIdAndDelete(deletedComment._id)
                .then(() => {
                    resolve(deletedComment);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
