const Post = require("../models/post.model");

const userService = require("./user.service");
const categoryService = require("./category.service");
const commentService = require("./comment.service");

const self = (module.exports = {
    format: (post) => {
        const commentsFormated = [];
        for (let comment of post.comments) {
            comment = commentService.format(comment);
            commentsFormated.push(comment);
        }
        return {
            _id: post._id,
            title: post.title,
            slug: post.slug,
            author: userService.format(post.author),
            category: categoryService.format(post.category),
            content: post.content,
            excerpt: post.excerpt,
            thumbnail: post.thumbnail,
            status: post.status,
            commentsEnabled: post.commentsEnabled,
            comments: commentsFormated,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    },

    hideSensitiveInformations: (post) => {
        const commentsFormated = [];
        for (let comment of post.comments) {
            comment = commentService.hideSensitiveInformations(comment);
            commentsFormated.push(comment);
        }
        if (post.status != "Published") {
            return {};
        } else {
            return {
                _id: post._id,
                title: post.title,
                slug: post.slug,
                author: userService.hideSensitiveInformations(post.author),
                category: categoryService.hideSensitiveInformations(
                    post.category
                ),
                content: post.content,
                excerpt: post.excerpt,
                thumbnail: post.thumbnail,
                status: post.status,
                commentsEnabled: post.commentsEnabled,
                comments: commentsFormated,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        }
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await Post.find()
                .then(async (posts) => {
                    for (let post of posts) {
                        post.author = await userService.getById(post.author);
                        post.category = await categoryService.getById(
                            post.category
                        );
                        post.comments = await commentService.getCommentsOfPost(
                            post._id
                        );
                    }
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (postId) => {
        return new Promise(async (resolve, reject) => {
            await Post.findById(postId)
                .then(async (post) => {
                    post.author = await userService.getById(post.author);
                    post.category = await categoryService.getById(
                        post.category
                    );
                    post.comments = await commentService.getCommentsOfPost(
                        post._id
                    );
                    resolve(post);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getBySlug: async (slug) => {
        return new Promise(async (resolve, reject) => {
            await Post.find({ slug: slug })
                .then(async ([post]) => {
                    post.author = await userService.getById(post.author);
                    post.category = await categoryService.getById(
                        post.category
                    );
                    post.comments = await commentService.getCommentsOfPost(
                        post._id
                    );
                    resolve(post);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isPostExist: async (postId) => {
        try {
            if (!(await self.getById(postId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({
        title,
        slug,
        author,
        category,
        content,
        excerpt,
        thumbnail,
    }) => {
        return new Promise(async (resolve, reject) => {
            const status = "Published";
            const commentsEnabled = true;
            const comments = [];

            const newPost = new Post({
                title,
                slug,
                author,
                category,
                content,
                excerpt,
                thumbnail,
                status,
                commentsEnabled,
                comments,
            });
            await newPost
                .save()
                .then(async (createdPost) => {
                    const post = await self.getById(createdPost._id);
                    resolve(post);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (
        postId,
        {
            title,
            slug,
            category,
            content,
            excerpt,
            thumbnail,
            status,
            commentsEnabled,
        }
    ) => {
        return new Promise(async (resolve, reject) => {
            const post = await self.getById(postId);

            title = title || post.title;
            slug = slug || post.slug;
            category = category || post.category._id;
            content = content || post.content;
            excerpt = excerpt || post.excerpt;
            thumbnail = thumbnail || post.thumbnail;
            status = status || post.status;
            if (commentsEnabled == null || commentsEnabled == undefined)
                commentsEnabled = post.commentsEnabled;

            await Post.findByIdAndUpdate(postId, {
                title,
                slug,
                category,
                content,
                excerpt,
                thumbnail,
                status,
                commentsEnabled,
            })
                .then(async () => {
                    const updeatedPost = await self.getById(postId);
                    resolve(updeatedPost);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (postId) => {
        return new Promise(async (resolve, reject) => {
            await Post.findByIdAndDelete(postId)
                .then(async (deletedPost) => {
                    deletedPost.author = await userService.getById(
                        deletedPost.author
                    );
                    deletedPost.category = await categoryService.getById(
                        deletedPost.category
                    );
                    deletedPost.comments =
                        await commentService.getCommentsOfPost(deletedPost._id);
                    resolve(deletedPost);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
