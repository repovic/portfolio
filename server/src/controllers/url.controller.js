const validator = require("validator");

const urlService = require("../services/url.service");

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
            const { author: authorId } = req.query;
            if (authorId) {
                const urls = await urlService.getByAuthor(authorId);
                const urlsFormatted = [];
                for (let url of urls) {
                    url = urlService.hideSensitiveInformations(url);
                    urlsFormatted.push(url);
                }
                res.status(200).json({
                    success: true,
                    payload: urlsFormatted,
                });
            } else {
                const urls = await urlService.getAll();
                const urlsFormatted = [];
                for (let url of urls) {
                    url = urlService.hideSensitiveInformations(url);
                    urlsFormatted.push(url);
                }
                res.status(200).json({
                    success: true,
                    payload: urlsFormatted,
                });
            }
        } catch (error) {
            console.log("urlController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
        try {
            const urlId = req.params.urlId;
            if (!(await urlService.isURLExist(urlId))) {
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
                    payload: urlService.hideSensitiveInformations(url),
                });
            });
        } catch (error) {
            console.log("urlController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getBySlug: async (req, res) => {
        try {
            const slug = req.params.slug;

            await urlService.getBySlug(slug).then((url) => {
                if (!url) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            message: "URL with that slug was not found!",
                        },
                    });
                }
                return res.status(200).json({
                    success: true,
                    payload: urlService.hideSensitiveInformations(url),
                });
            });
        } catch (error) {
            console.log("urlController.getBySlug Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    create: async (req, res) => {
        try {
            let { slug, redirectTo } = req.body;
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

            if (slug.length < 5) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Slug must be longer than 5 characters!",
                    },
                });
            }

            slug = slug.trim().split().join("-");

            if (!validator.isURL(redirectTo)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Please use a valid redirect url address!",
                    },
                });
            }

            if (
                !(
                    redirectTo.startsWith("http") ||
                    redirectTo.startsWith("mailto") ||
                    redirectTo.startsWith("ftp")
                )
            ) {
                redirectTo = `http://${redirectTo}`;
            }

            await urlService
                .create({
                    slug,
                    redirectTo,
                    author,
                    ip: getUserIP(req),
                })
                .then((createdUrl) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | URL created by: ${createdUrl.author.firstName} ${createdUrl.author.lastName}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdUrl.createdAt,
                                author: {
                                    name: `@${createdUrl.author.username}`,
                                    icon_url: createdUrl.author.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdUrl._id}`,
                                },
                                fields: [
                                    {
                                        name: "Slug: ",
                                        value: `${createdUrl.slug}`,
                                        inline: false,
                                    },
                                    {
                                        name: "Redirect To: ",
                                        value: `${createdUrl.redirectTo}`,
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });

                    return res.json({
                        success: true,
                        payload:
                            urlService.hideSensitiveInformations(createdUrl),
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
            console.log("urlController.createUrl Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    increaseNumberOfRedirects: async (req, res) => {
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

            await urlService.increaseNumberOfRedirects(urlId).then((url) => {
                if (url.banned) {
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: "That URL is banned!",
                        },
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        payload: urlService.hideSensitiveInformations(
                            url,
                            true
                        ),
                    });
                }
            });
        } catch (error) {
            console.log(
                "urlController.increaseNumberOfRedirects Error: " + error
            );
            return res.status(500).json(serverErrorResponse);
        }
    },
};
