const bcrypt = require("bcrypt");
const discordWebhookService = require("../services/discordWebhook.service");
const userService = require("../services/user.service");

const getUserIP = require("../util/getUserIP.util");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getUser: async (req, res) => {
        try {
            const userId = req.userData._id;
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
                    payload: userService.hideSensitiveInformations(user),
                });
            });
        } catch (error) {
            console.log("userController.getUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
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
                    payload: userService.hideSensitiveInformations(user),
                });
            });
        } catch (error) {
            console.log("userController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getAll: async (req, res) => {
        try {
            await userService.getAll().then((users) => {
                const usersFormatted = [];
                for (let user of users) {
                    user = userService.hideSensitiveInformations(user);
                    usersFormatted.push(user);
                }
                return res.status(200).json({
                    success: true,
                    payload: usersFormatted,
                });
            });
        } catch (error) {
            console.log("userController.getAll Error: " + error);
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
                password,
                passwordConfirm,
            } = req.body;

            const userId = req.userData._id;
            const avatarUrl = req.fileUrl;

            if (!(await userService.isUserExist(userId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "User with that id was not found!",
                    },
                });
            }

            if (!passwordConfirm) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Password confirm is missing!",
                    },
                });
            }

            if (
                !(await bcrypt.compare(
                    passwordConfirm,
                    req.userData.passwordHash
                ))
            ) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Incorrect password!",
                    },
                });
            }

            await userService
                .update(userId, {
                    username,
                    firstName,
                    lastName,
                    displayName,
                    avatarUrl,
                    password,
                })
                .then((updatedUser) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `User | User Update`,
                                color: 1127128,
                                description: "",
                                timestamp: new Date().toISOString(),
                                author: {
                                    name: "repovic.ga",
                                    url: "https://repovic.ga",
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `IP: ${getUserIP(req)}`,
                                },
                                fields: [
                                    {
                                        name: "Username",
                                        value: "@" + updatedUser.username,
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });

                    return res.status(200).json({
                        success: true,
                        payload:
                            userService.hideSensitiveInformations(updatedUser),
                    });
                });
        } catch (error) {
            console.log("userController.updateUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.userData._id;

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
                            title: `User | User Delete`,
                            color: 1127128,
                            description: "",
                            timestamp: new Date().toISOString(),
                            author: {
                                name: "repovic.ga",
                                url: "https://repovic.ga",
                            },
                            image: {},
                            thumbnail: {},
                            footer: {
                                text: `IP: ${getUserIP(req)}`,
                            },
                            fields: [
                                {
                                    name: "Username",
                                    value: "@" + deletedUser.username,
                                    inline: false,
                                },
                            ],
                        },
                    ],
                });

                return res.status(200).json({
                    success: true,
                    payload: userService.hideSensitiveInformations(deletedUser),
                });
            });
        } catch (error) {
            console.log("userController.deleteUser Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
