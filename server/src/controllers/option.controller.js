const optionService = require("../services/option.service");

const discordWebhookService = require("../services/discordWebhook.service");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getAll: async (req, res) => {
        try {
            const options = await optionService.getAll();
            res.status(200).json({
                success: true,
                payload: options,
            });
        } catch (error) {
            console.log("optionController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
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
            console.log("optionController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getByName: async (req, res) => {
        try {
            const name = req.params.name;

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
};
