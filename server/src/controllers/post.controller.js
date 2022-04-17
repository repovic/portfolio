const postService = require("../services/post.service");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getAll: async (req, res) => {
        try {
            await postService.getAll().then((posts) => {
                const postsFormatted = [];
                for (let post of posts) {
                    post = postService.hideSensitiveInformations(post);
                    postsFormatted.push(post);
                }
                return res.status(200).json({
                    success: true,
                    payload: postsFormatted,
                });
            });
        } catch (error) {
            console.log("postController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
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
                    payload: postService.hideSensitiveInformations(post),
                });
            });
        } catch (error) {
            console.log("postController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getBySlug: async (req, res) => {
        try {
            const slug = req.params.slug;

            try {
                await postService.getBySlug(slug).then((post) => {
                    return res.status(200).json({
                        success: true,
                        payload: postService.hideSensitiveInformations(post),
                    });
                });
            } catch (error) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Post with that slug was not found!",
                    },
                });
            }
        } catch (error) {
            console.log("postController.getBySlug Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
