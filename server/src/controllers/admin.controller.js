const validator = require("validator");
const userService = require("../services/user.service");
const categoryService = require("../services/category.service");
const postService = require("../services/post.service");
const optionService = require("../services/option.service");
const commentService = require("../services/comment.service");
const urlService = require("../services/url.service");
const projectService = require("../services/project.service");
const contactRecordService = require("../services/contactRecord.service");
const discordWebhookService = require("../services/discordWebhook.service");

const getUserIP = require("../util/getUserIP.util");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;

            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            await userService.getById(userId).then((user) => {
                return res.status(200).json({
                    success: true,
                    payload: userService.format(user),
                });
            });
        } catch (error) {
            console.log("adminController.getUserById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            await userService.getAll().then((users) => {
                const usersFormatted = [];
                for (let user of users) {
                    user = userService.format(user);
                    usersFormatted.push(user);
                }
                return res.status(200).json({
                    success: true,
                    payload: usersFormatted,
                });
            });
        } catch (error) {
            console.log("adminController.getAllUsers Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {
                username,
                firstName,
                lastName,
                displayName,
                email,
                role,
                password,
            } = req.body;
            const userId = req.params.userId;

            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            const avatarUrl = req.fileUrl || null;

            if (email && !validator.isEmail(email)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Please use a valid email address!",
                    },
                });
            }

            await userService
                .update(userId, {
                    username,
                    firstName,
                    lastName,
                    displayName,
                    email,
                    role,
                    avatarUrl,
                    password,
                })
                .then((updatedUser) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | User Account updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedUser.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${updatedUser._id}`,
                                },
                                fields: [
                                    {
                                        name: "Display Name: ",
                                        value: updatedUser.displayName,
                                        inline: false,
                                    },
                                    {
                                        name: "Username: ",
                                        value: "@" + updatedUser.username,
                                        inline: false,
                                    },
                                    {
                                        name: "Email: ",
                                        value: updatedUser.email,
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

                    return res.status(200).json({
                        success: true,
                        payload: userService.format(updatedUser),
                    });
                });
        } catch (error) {
            console.log("adminController.updateUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    banUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            await userService.getById(userId).then(async (user) => {
                if (user.banned) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: "That user is already banned!",
                        },
                    });
                }
                const bannedUser = await userService.ban(userId);
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:no_entry_sign: | User Account banned by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: bannedUser.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${bannedUser._id}`,
                            },
                            fields: [
                                {
                                    name: "Display Name: ",
                                    value: bannedUser.displayName,
                                    inline: false,
                                },
                                {
                                    name: "Username: ",
                                    value: "@" + bannedUser.username,
                                    inline: false,
                                },
                                {
                                    name: "Email: ",
                                    value: bannedUser.email,
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

                return res.status(200).json({
                    success: true,
                    payload: userService.format(bannedUser),
                });
            });
        } catch (error) {
            console.log("adminController.banUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    unbanUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            await userService.getById(userId).then(async (user) => {
                if (!user.banned) {
                    return res.status(200).json({
                        success: false,
                        error: {
                            message: "That user is not banned!",
                        },
                    });
                }
                const unbannedUser = await userService.unban(userId);
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:white_check_mark: | User Account unbanned by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: unbannedUser.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${unbannedUser._id}`,
                            },
                            fields: [
                                {
                                    name: "Display Name: ",
                                    value: unbannedUser.displayName,
                                    inline: false,
                                },
                                {
                                    name: "Username: ",
                                    value: "@" + unbannedUser.username,
                                    inline: false,
                                },
                                {
                                    name: "Email: ",
                                    value: unbannedUser.email,
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

                return res.status(200).json({
                    success: true,
                    payload: userService.format(unbannedUser),
                });
            });
        } catch (error) {
            console.log("adminController.unbanUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            await userService.delete(userId).then((deletedUser) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | User Account deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${deletedUser._id}`,
                            },
                            fields: [
                                {
                                    name: "Display Name: ",
                                    value: deletedUser.displayName,
                                    inline: false,
                                },
                                {
                                    name: "Username: ",
                                    value: "@" + deletedUser.username,
                                    inline: false,
                                },
                                {
                                    name: "Email: ",
                                    value: deletedUser.email,
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

                return res.status(200).json({
                    success: true,
                    payload: userService.format(deletedUser),
                });
            });
        } catch (error) {
            console.log("adminController.deleteUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categories = await categoryService.getAll();
            const categoriesFormatted = [];
            for (let category of categories) {
                category = await categoryService.format(category);
                categoriesFormatted.push(category);
            }
            res.status(200).json({
                success: true,
                payload: categoriesFormatted,
            });
        } catch (error) {
            console.log("adminController.getAllCategories Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            if (!(await categoryService.isCategoryExist(categoryId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Category with that id was not found!",
                    },
                });
            }

            await categoryService.getById(categoryId).then((category) => {
                return res.status(200).json({
                    success: true,
                    payload: categoryService.format(category),
                });
            });
        } catch (error) {
            console.log("adminController.getCategoryById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const author = req.userData._id;

            if (!name) {
                return res.status(200).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            await categoryService
                .create({ name, author })
                .then((createdCategory) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Category created by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdCategory.createdAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdCategory._id}`,
                                },
                                fields: [
                                    {
                                        name: "Category: ",
                                        value: createdCategory.name,
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

                    return res.status(200).json({
                        success: true,
                        payload: categoryService.format(createdCategory),
                    });
                });
        } catch (error) {
            console.log("adminController.createCategory Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updateCategory: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            if (!(await categoryService.isCategoryExist(categoryId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Category with that id was not found!",
                    },
                });
            }

            const { name } = req.body;
            if (!name) {
                return res.json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            await categoryService
                .update(categoryId, { name })
                .then((updatedCategory) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | Category updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedCategory.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${updatedCategory._id}`,
                                },
                                fields: [
                                    {
                                        name: "Category: ",
                                        value: updatedCategory.name,
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

                    return res.json({
                        success: true,
                        payload: updatedCategory,
                    });
                });
        } catch (error) {
            console.log("adminController.updateCategory Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            categoryId = req.params.categoryId;
            if (!(await categoryService.isCategoryExist(categoryId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Category with that id was not found!",
                    },
                });
            }

            await categoryService.delete(categoryId).then((deletedCategory) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | Category deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${deletedCategory._id}`,
                            },
                            fields: [
                                {
                                    name: "Category: ",
                                    value: deletedCategory.name,
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

                return res.status(200).json({
                    success: true,
                    payload: categoryService.format(deletedCategory),
                });
            });
        } catch (error) {
            console.log("adminController.deleteCategory Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllPosts: async (req, res) => {
        try {
            await postService.getAll().then((posts) => {
                let postsFormatted = [];
                for (let post of posts) {
                    post = postService.format(post);
                    postsFormatted.push(post);
                }
                return res.status(200).json({
                    success: true,
                    payload: postsFormatted,
                });
            });
        } catch (error) {
            console.log("adminController.getAllPosts Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getPostById: async (req, res) => {
        try {
            const postId = req.params.postId;
            if (!(await postService.isPostExist(postId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Post with that id was not found!",
                    },
                });
            }

            await postService.getById(postId).then((post) => {
                return res.status(200).json({
                    success: true,
                    payload: postService.format(post),
                });
            });
        } catch (error) {
            console.log("adminController.getPostById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    createPost: async (req, res) => {
        try {
            let { title, slug, category, content, excerpt } = req.body;
            const author = req.userData._id;

            if (!slug) {
                slug = title
                    .toString()
                    .split(" ")
                    .join("-")
                    .trim()
                    .toLowerCase();
            }

            const thumbnail = req.fileUrl || null;

            if (
                !title ||
                !slug ||
                !author ||
                !category ||
                !content ||
                !excerpt ||
                !thumbnail
            ) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            if (!(await categoryService.isCategoryExist(category))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Category with that id was not found!",
                    },
                });
            }

            await postService
                .create({
                    title,
                    slug,
                    author,
                    category,
                    content,
                    excerpt,
                    thumbnail,
                })
                .then((createdPost) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Post created by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdPost.createdAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {
                                    url: createdPost.thumbnail,
                                },
                                footer: {
                                    text: `ID: ${createdPost._id}`,
                                },
                                fields: [
                                    {
                                        name: "Title: ",
                                        value: createdPost.title,
                                        inline: false,
                                    },
                                    {
                                        name: "Slug: ",
                                        value: createdPost.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "Category: ",
                                        value: createdPost.category.name,
                                        inline: false,
                                    },
                                    {
                                        name: "Excerpt: ",
                                        value: createdPost.excerpt,
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

                    return res.status(200).json({
                        success: true,
                        payload: postService.format(createdPost),
                    });
                });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Post with that slug already exist!",
                    },
                });
            }
            console.log("adminController.createPost Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updatePost: async (req, res) => {
        try {
            let {
                title,
                slug,
                category,
                content,
                excerpt,
                status,
                commentsEnabled,
            } = req.body;
            const postId = req.params.postId;

            if (!(await postService.isPostExist(postId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Post with that id was not found!",
                    },
                });
            }

            if (!(await categoryService.isCategoryExist(category))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Category with that id was not found!",
                    },
                });
            }

            if (slug) {
                slug = slug
                    .toString()
                    .split(" ")
                    .join("-")
                    .trim()
                    .toLowerCase();
            }

            const thumbnail = req.fileUrl || null;

            await postService
                .update(postId, {
                    title,
                    slug,
                    category,
                    content,
                    excerpt,
                    thumbnail,
                    status,
                    commentsEnabled,
                })
                .then((updatedPost) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | Post updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedPost.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {
                                    url: updatedPost.thumbnail,
                                },
                                footer: {
                                    text: `ID: ${updatedPost._id}`,
                                },
                                fields: [
                                    {
                                        name: "Title: ",
                                        value: updatedPost.title,
                                        inline: false,
                                    },
                                    {
                                        name: "Slug: ",
                                        value: updatedPost.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "Category: ",
                                        value: updatedPost.category.name,
                                        inline: false,
                                    },
                                    {
                                        name: "Excerpt: ",
                                        value: updatedPost.excerpt,
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

                    return res.status(200).json({
                        success: true,
                        payload: postService.format(updatedPost),
                    });
                });
        } catch (error) {
            console.log("adminController.updatePost Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            if (!(await postService.isPostExist(postId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Post with that id was not found!",
                    },
                });
            }

            await postService.delete(postId).then((deletedPost) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | Post deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {
                                url: deletedPost.thumbnail,
                            },
                            footer: {
                                text: `ID: ${deletedPost._id}`,
                            },
                            fields: [
                                {
                                    name: "Title: ",
                                    value: deletedPost.title,
                                    inline: false,
                                },
                                {
                                    name: "Slug: ",
                                    value: deletedPost.slug,
                                    inline: false,
                                },
                                {
                                    name: "Category: ",
                                    value: deletedPost.category.name,
                                    inline: false,
                                },
                                {
                                    name: "Excerpt: ",
                                    value: deletedPost.excerpt,
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

                return res.status(200).json({
                    success: true,
                    payload: postService.format(deletedPost),
                });
            });
        } catch (error) {
            console.log("adminController.deletePost Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllProjects: async (req, res) => {
        try {
            await projectService.getAll().then((projects) => {
                let projectsFormatted = [];
                for (let project of projects) {
                    project = projectService.format(project);
                    projectsFormatted.push(project);
                }
                return res.status(200).json({
                    success: true,
                    payload: projectsFormatted,
                });
            });
        } catch (error) {
            console.log("adminController.getAllProjects Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getProjectById: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            if (!(await projectService.isProjectExist(projectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that id was not found!",
                    },
                });
            }

            await projectService.getById(projectId).then((project) => {
                return res.status(200).json({
                    success: true,
                    payload: projectService.format(project),
                });
            });
        } catch (error) {
            console.log("adminController.getProjectById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    createProject: async (req, res) => {
        try {
            let { title, slug, url, excerpt, description } = req.body;
            const authorId = req.userData._id;

            if (!slug) {
                slug = title?.trim().split().join("-").toLowerCase();
            }

            if (!validator.isURL(url)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Please use a valid url address!",
                    },
                });
            }

            if (!url.startsWith("http")) {
                url = `http://${url}`;
            }

            const featuredImage = req.filesUrls["featuredImage"][0] || null;
            const images = req.filesUrls["images"] || null;

            if (
                !title ||
                !slug ||
                !authorId ||
                !url ||
                !featuredImage ||
                !excerpt ||
                !description
            ) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            await projectService
                .create({
                    title,
                    slug,
                    authorId,
                    featuredImage,
                    images,
                    url,
                    excerpt,
                    description,
                })
                .then((createdProject) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Project created by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdProject.createdAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {
                                    url: createdProject.featuredImage,
                                },
                                footer: {
                                    text: `ID: ${createdProject._id}`,
                                },
                                fields: [
                                    {
                                        name: "Title: ",
                                        value: createdProject.title,
                                        inline: false,
                                    },
                                    {
                                        name: "Slug: ",
                                        value: createdProject.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "URL: ",
                                        value: createdProject.url,
                                        inline: false,
                                    },
                                    {
                                        name: "Excerpt: ",
                                        value: createdProject.excerpt,
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

                    return res.status(200).json({
                        success: true,
                        payload: projectService.format(createdProject),
                    });
                });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message:
                            "Project with that title / slug / url already exist!",
                    },
                });
            }
            console.log("adminController.createProject Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updateProject: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const { title, slug, excerpt, description, commentsEnabled } =
                req.body;
            let { url } = req.body;
            if (!(await projectService.isProjectExist(projectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that id was not found!",
                    },
                });
            }

            const [featuredImage] = req.filesUrls["featuredImage"] || [];
            const images = req.filesUrls["images"] || [];

            if (url) {
                if (!validator.isURL(url)) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: "Please use a valid url address!",
                        },
                    });
                }

                if (
                    !url.startsWith("http") &&
                    !url.startsWith("mailto") &&
                    !url.startsWith("ftp")
                ) {
                    url = `http://${url}`;
                }
            }

            await projectService
                .update(projectId, {
                    title,
                    slug,
                    featuredImage,
                    images: images.length > 0 ? images : null,
                    url,
                    excerpt,
                    description,
                    commentsEnabled,
                })
                .then((updatedProject) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | Project updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedProject.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {
                                    url: updatedProject.featuredImage,
                                },
                                footer: {
                                    text: `ID: ${updatedProject._id}`,
                                },
                                fields: [
                                    {
                                        name: "Title: ",
                                        value: updatedProject.title,
                                        inline: false,
                                    },
                                    {
                                        name: "Slug: ",
                                        value: updatedProject.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "URL: ",
                                        value: updatedProject.url,
                                        inline: false,
                                    },
                                    {
                                        name: "Excerpt: ",
                                        value: updatedProject.excerpt,
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

                    return res.status(200).json({
                        success: true,
                        payload: projectService.format(updatedProject),
                    });
                });
        } catch (error) {
            console.log("adminController.updateProject Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteProject: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            if (!(await projectService.isProjectExist(projectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that id was not found!",
                    },
                });
            }

            await projectService.delete(projectId).then((deletedProject) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | Project deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {
                                url: deletedProject.featuredImage,
                            },
                            footer: {
                                text: `ID: ${deletedProject._id}`,
                            },
                            fields: [
                                {
                                    name: "Title: ",
                                    value: deletedProject.title,
                                    inline: false,
                                },
                                {
                                    name: "Slug: ",
                                    value: deletedProject.slug,
                                    inline: false,
                                },
                                {
                                    name: "URL: ",
                                    value: deletedProject.url,
                                    inline: false,
                                },
                                {
                                    name: "Excerpt: ",
                                    value: deletedProject.excerpt,
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

                return res.status(200).json({
                    success: true,
                    payload: projectService.format(deletedProject),
                });
            });
        } catch (error) {
            console.log("adminController.deleteProject Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllOptions: async (req, res) => {
        try {
            const options = await optionService.getAll();
            res.status(200).json({
                success: true,
                payload: options,
            });
        } catch (error) {
            console.log("adminController.getAllOptions Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getOptionById: async (req, res) => {
        try {
            const optionId = req.params.optionId;
            if (!(await optionService.isOptionExist(optionId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Option with that id was not found!",
                    },
                });
            }

            await optionService.getById(optionId).then((option) => {
                return res.status(200).json({
                    success: true,
                    payload: option,
                });
            });
        } catch (error) {
            console.log("adminController.getOptionById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getOptionByName: async (req, res) => {
        try {
            const name = req.params.optionName;

            await optionService.getByName(name).then((option) => {
                if (option == null) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            message: "Option with that id was not found!",
                        },
                    });
                }
                return res.status(200).json({
                    success: true,
                    payload: option,
                });
            });
        } catch (error) {
            console.log("optionController.getByName Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    createOption: async (req, res) => {
        try {
            const { name, value } = req.body;

            if (!name || !value) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            await optionService
                .create({ name, value })
                .then((createdOption) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Option created by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdOption.createdAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdOption._id}`,
                                },
                                fields: [
                                    {
                                        name: "Name: ",
                                        value: createdOption.name,
                                        inline: false,
                                    },
                                    {
                                        name: "Value: ",
                                        value: createdOption.value,
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

                    return res.json({
                        success: true,
                        payload: createdOption,
                    });
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        return res.status(400).json({
                            success: false,
                            error: {
                                message: "Option already exist!",
                            },
                        });
                    }
                });
        } catch (error) {
            console.log("adminController.createOption Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updateOption: async (req, res) => {
        try {
            const optionId = req.params.optionId;
            if (!(await optionService.isOptionExist(optionId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Option with that id was not found!",
                    },
                });
            }

            const { value } = req.body;
            if (!value) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            await optionService
                .update(optionId, { value })
                .then((updatedOption) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | Option updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedOption.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${updatedOption._id}`,
                                },
                                fields: [
                                    {
                                        name: "Name: ",
                                        value: updatedOption.name,
                                        inline: false,
                                    },
                                    {
                                        name: "Value: ",
                                        value: updatedOption.value,
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

                    return res.json({
                        success: true,
                        payload: updatedOption,
                    });
                });
        } catch (error) {
            console.log("adminController.updateOption Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteOption: async (req, res) => {
        try {
            const optionId = req.params.optionId;
            if (!(await optionService.isOptionExist(optionId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Option with that id was not found!",
                    },
                });
            }

            await optionService.delete(optionId).then((deletedOption) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | Option deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${deletedOption._id}`,
                            },
                            fields: [
                                {
                                    name: "Name: ",
                                    value: deletedOption.name,
                                    inline: false,
                                },
                                {
                                    name: "Value: ",
                                    value: deletedOption.value,
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

                return res.status(200).json({
                    success: true,
                    payload: deletedOption,
                });
            });
        } catch (error) {
            console.log("adminController.deleteOption Error: " + error);
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

            await commentService.getCommentsOfPost(postId).then((comments) => {
                let commentsFormatted = [];
                for (let comment of comments) {
                    comment = commentService.format(comment);
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
                        comment = commentService.format(comment);
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

    hideComment: async (req, res) => {
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

            await commentService.hide(commentId).then((hiddenComment) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `Administrator | Comment hidden by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: hiddenComment.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${hiddenComment._id}`,
                            },
                            fields: [
                                {
                                    name: "Content: ",
                                    value: hiddenComment.content,
                                    inline: false,
                                },
                                {
                                    name: "For: ",
                                    value: hiddenComment.for,
                                    inline: false,
                                },
                                {
                                    name: "For Object ID: ",
                                    value: hiddenComment.forObjectId,
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
                return res.status(200).json({
                    success: true,
                    payload: commentService.format(hiddenComment),
                });
            });
        } catch (error) {
            console.log("adminController.hideComment Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteComment: async (req, res) => {
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

            await commentService.delete(commentId).then((deletedComment) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | Comment deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${deletedComment._id}`,
                            },
                            fields: [
                                {
                                    name: "Content: ",
                                    value: deletedComment.content,
                                    inline: false,
                                },
                                {
                                    name: "For: ",
                                    value: deletedComment.for,
                                    inline: false,
                                },
                                {
                                    name: "For Object ID: ",
                                    value: deletedComment.forObjectId,
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
                return res.status(200).json({
                    success: true,
                    payload: commentService.format(deletedComment),
                });
            });
        } catch (error) {
            console.log("adminController.deleteComment Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllUrls: async (req, res) => {
        try {
            const urls = await urlService.getAll();
            const urlsFormatted = [];
            for (let url of urls) {
                url = urlService.format(url);
                urlsFormatted.push(url);
            }
            res.status(200).json({
                success: true,
                payload: urlsFormatted,
            });
        } catch (error) {
            console.log("adminController.getAllUrls Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getUrlById: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.getById(urlId).then((url) => {
                return res.status(200).json({
                    success: true,
                    payload: urlService.format(url),
                });
            });
        } catch (error) {
            console.log("adminController.getUrlById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getUrlBySlug: async (req, res) => {
        try {
            const slug = req.params.slug;

            await urlService.getBySlug(slug).then((url) => {
                if (url == null) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            message: "URL with that slug was not found!",
                        },
                    });
                }
                return res.status(200).json({
                    success: true,
                    payload: urlService.format(url),
                });
            });
        } catch (error) {
            console.log("adminController.getUrlBySlug Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    createUrl: async (req, res) => {
        try {
            let { slug, redirectTo } = req.body;
            const { restricted } = req.body;
            const author = req.userData._id;

            if (!slug) {
                slug = "";
                let characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let charactersLength = characters.length;
                for (let i = 0; i < 5; i++) {
                    slug += characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    );
                }
            }

            if (!slug || !redirectTo) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            slug = slug.toString().split(" ").join("-").trim().toLowerCase();

            if (!validator.isURL(redirectTo)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Please use a valid redirect url address!",
                    },
                });
            }

            if (
                !redirectTo.startsWith("http") &&
                !redirectTo.startsWith("mailto") &&
                !redirectTo.startsWith("ftp")
            ) {
                redirectTo = `http://${redirectTo}`;
            }

            await urlService
                .create({
                    slug,
                    redirectTo,
                    author,
                    ip: getUserIP(req),
                    restricted,
                })
                .then((createdUrl) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | URL created by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdUrl.createdAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdUrl._id}`,
                                },
                                fields: [
                                    {
                                        name: "Slug: ",
                                        value: createdUrl.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "Redirect To: ",
                                        value: createdUrl.redirectTo,
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

                    return res.json({
                        success: true,
                        payload: urlService.format(createdUrl),
                    });
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        return res.status(400).json({
                            success: false,
                            error: {
                                message: "URL with that slug already exist!",
                            },
                        });
                    }
                });
        } catch (error) {
            console.log("adminController.createUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    updateUrl: async (req, res) => {
        try {
            let { slug, redirectTo, banned } = req.body;
            const { numberOfRedirects, restricted } = req.body;
            const urlId = req.params.urlId;
            const author = req.userData._id;

            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            const url = await urlService.getById(urlId);

            if (slug) {
                slug = slug
                    .toString()
                    .split(" ")
                    .join("-")
                    .trim()
                    .toLowerCase();
            }

            if (redirectTo) {
                if (!validator.isURL(redirectTo)) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message:
                                "Please use a valid retirect to url address!",
                        },
                    });
                }

                if (
                    !redirectTo.startsWith("http") &&
                    !redirectTo.startsWith("mailto") &&
                    !redirectTo.startsWith("ftp")
                ) {
                    redirectTo = `http://${redirectTo}`;
                }
            }

            if (banned == null) {
                banned = url.banned;
            }

            urlService
                .update(urlId, {
                    slug,
                    redirectTo,
                    numberOfRedirects,
                    restricted,
                    banned,
                })
                .then((updatedUrl) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:pencil: | URL updated by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: updatedUrl.updatedAt,
                                author: {
                                    name: `@${req.userData.username}`,
                                    icon_url: req.userData.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${updatedUrl._id}`,
                                },
                                fields: [
                                    {
                                        name: "Slug: ",
                                        value: updatedUrl.slug,
                                        inline: false,
                                    },
                                    {
                                        name: "Redirect To: ",
                                        value: updatedUrl.redirectTo,
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
                    return res.status(200).json({
                        success: true,
                        payload: urlService.format(updatedUrl),
                    });
                });
        } catch (error) {
            console.log("adminController.updateUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    restrictUrl: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.restrict(urlId).then((restrictedUrl) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:lock: | URL restricted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: restrictedUrl.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${restrictedUrl._id}`,
                            },
                            fields: [
                                {
                                    name: "Slug: ",
                                    value: restrictedUrl.slug,
                                    inline: false,
                                },
                                {
                                    name: "Redirect To: ",
                                    value: restrictedUrl.redirectTo,
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
                return res.status(200).json({
                    success: true,
                    payload: urlService.format(restrictedUrl),
                });
            });
        } catch (error) {
            console.log("adminController.restrictUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    unrestrictUrl: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.unrestrict(urlId).then((unrestrictedUrl) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:unlock: | URL unrestricted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: unrestrictedUrl.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${unrestrictedUrl._id}`,
                            },
                            fields: [
                                {
                                    name: "Slug: ",
                                    value: unrestrictedUrl.slug,
                                    inline: false,
                                },
                                {
                                    name: "Redirect To: ",
                                    value: unrestrictedUrl.redirectTo,
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

                return res.status(200).json({
                    success: true,
                    payload: urlService.format(unrestrictedUrl),
                });
            });
        } catch (error) {
            console.log("adminController.unrestrictUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    banUrl: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.ban(urlId).then((bannedUrl) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:no_entry_sign: | URL banned by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: bannedUrl.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${bannedUrl._id}`,
                            },
                            fields: [
                                {
                                    name: "Slug: ",
                                    value: bannedUrl.slug,
                                    inline: false,
                                },
                                {
                                    name: "Redirect To: ",
                                    value: bannedUrl.redirectTo,
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

                return res.status(200).json({
                    success: true,
                    payload: urlService.format(bannedUrl),
                });
            });
        } catch (error) {
            console.log("adminController.banUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    unbanUrl: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.unban(urlId).then((unbannedUrl) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:white_check_mark: | URL unbanned by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: unbannedUrl.updatedAt,
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${unbannedUrl._id}`,
                            },
                            fields: [
                                {
                                    name: "Slug: ",
                                    value: unbannedUrl.slug,
                                    inline: false,
                                },
                                {
                                    name: "Redirect To: ",
                                    value: unbannedUrl.redirectTo,
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

                return res.status(200).json({
                    success: true,
                    payload: urlService.format(unbannedUrl),
                });
            });
        } catch (error) {
            console.log("adminController.unbanUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteUrl: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isUrlExist(urlId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "URL with that id was not found!",
                    },
                });
            }

            await urlService.delete(urlId).then((deletedUrl) => {
                discordWebhookService.postMessage({
                    content: "",
                    embeds: [
                        {
                            title: `:wastebasket: | URL deleted by: @${req.userData.username}`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: `@${req.userData.username}`,
                                icon_url: req.userData.avatarUrl,
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `ID: ${deletedUrl._id}`,
                            },
                            fields: [
                                {
                                    name: "Slug: ",
                                    value: deletedUrl.slug,
                                    inline: false,
                                },
                                {
                                    name: "Redirect To: ",
                                    value: deletedUrl.redirectTo,
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

                return res.status(200).json({
                    success: true,
                    payload: urlService.format(deletedUrl),
                });
            });
        } catch (error) {
            console.log("adminController.deleteUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAllContactRecords: async (req, res) => {
        try {
            const contactRecords = await contactRecordService.getAll();
            const contactRecordsFormatted = [];
            for (let contactRecord of contactRecords) {
                contactRecord = contactRecordService.format(contactRecord);
                contactRecordsFormatted.push(contactRecord);
            }
            res.status(200).json({
                success: true,
                payload: contactRecordsFormatted,
            });
        } catch (error) {
            console.log("adminController.getAllContactRecords Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getContactRecordById: async (req, res) => {
        try {
            const contactRecordId = req.params.contactRecordId;
            if (
                !(await contactRecordService.isContactRecordExist(
                    contactRecordId
                ))
            ) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Contact Record with that id was not found!",
                    },
                });
            }

            await contactRecordService
                .getById(contactRecordId)
                .then((contactRecord) => {
                    return res.status(200).json({
                        success: true,
                        payload: contactRecordService.format(contactRecord),
                    });
                });
        } catch (error) {
            console.log("adminController.getContactRecordById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteContactRecord: async (req, res) => {
        try {
            const contactRecordId = req.params.contactRecordId;
            if (
                !(await contactRecordService.isContactRecordExist(
                    contactRecordId
                ))
            ) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Contact Record with that id was not found!",
                    },
                });
            }

            await contactRecordService
                .delete(contactRecordId)
                .then((deletedContactRecord) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:wastebasket: | Contact Message deleted by: @${req.userData.username}`,
                                color: 1127128,
                                description: "",
                                timestamp: new Date().toISOString(),
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${deletedContactRecord._id}`,
                                },
                                fields: [
                                    {
                                        name: "Display Name: ",
                                        value: `${deletedContactRecord.firstName} ${deletedContactRecord.lastName}`,
                                        inline: false,
                                    },
                                    {
                                        name: "Email: ",
                                        value: deletedContactRecord.email,
                                        inline: false,
                                    },
                                    {
                                        name: "Message: ",
                                        value: deletedContactRecord.message,
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
                    return res.status(200).json({
                        success: true,
                        payload:
                            contactRecordService.format(deletedContactRecord),
                    });
                });
        } catch (error) {
            console.log("adminController.deleteContactRecord Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
