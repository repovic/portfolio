const categoryService = require("../services/category.service");

const discordWebhookService = require("../services/discordWebhook.service");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getById: async (req, res) => {
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
                    payload:
                        categoryService.hideSensitiveInformations(category),
                });
            });
        } catch (error) {
            console.log("categoryController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAll: async (req, res) => {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json({
                success: true,
                payload: categories.map((category) => {
                    return categoryService.hideSensitiveInformations(category);
                }),
            });
        } catch (error) {
            console.log("categoryController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
