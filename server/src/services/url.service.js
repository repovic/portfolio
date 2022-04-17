const URL = require("../models/url.model");
const userService = require("./user.service");

const self = (module.exports = {
    format: (url) => {
        return {
            _id: url._id,
            slug: url.slug,
            redirectTo: url.redirectTo,
            author: userService.format(url.author),
            numberOfRedirects: url.numberOfRedirects,
            ip: url.ip,
            restricted: url.restricted,
            banned: url.banned,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        };
    },

    hideSensitiveInformations: (url, showRedirectTo = false) => {
        return {
            _id: url._id,
            slug: url.slug,
            redirectTo: showRedirectTo ? url.redirectTo : "",
            author: userService.hideSensitiveInformations(url.author),
            numberOfRedirects: url.numberOfRedirects,
            restricted: url.restricted,
            banned: url.banned,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        };
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await URL.find()
                .then(async (urls) => {
                    for (let url of urls) {
                        url.author = await userService.getById(url.author);
                    }
                    resolve(urls);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findById(urlId)
                .then(async (url) => {
                    url.author = await userService.getById(url.author);
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getBySlug: async (slug) => {
        return new Promise(async (resolve, reject) => {
            await URL.findOne({ slug: slug })
                .then(async (url) => {
                    if (url) {
                        url.author = await userService.getById(url.author);
                    } else {
                        url = null;
                    }
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getByAuthor: async (authorId) => {
        return new Promise(async (resolve, reject) => {
            await URL.find({ author: authorId })
                .then(async (urls) => {
                    for (let url of urls) {
                        url.author = await userService.getById(url.author);
                    }
                    resolve(urls);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isUrlExist: async (urlId) => {
        try {
            if (!(await self.getById(urlId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({ slug, redirectTo, author, ip, restricted = true }) => {
        const numberOfRedirects = 0;
        const banned = false;

        return new Promise(async (resolve, reject) => {
            const newURL = new URL({
                slug,
                redirectTo,
                author,
                numberOfRedirects,
                ip,
                restricted,
                banned,
            });

            await newURL
                .save()
                .then(async (createdURL) => {
                    const url = await self.getById(createdURL._id);
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (
        urlId,
        { slug, redirectTo, numberOfRedirects, restricted, banned }
    ) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                slug,
                redirectTo,
                numberOfRedirects,
                restricted,
                banned,
            })
                .then(async () => {
                    const updeatedURL = await self.getById(urlId);
                    resolve(updeatedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    increaseNumberOfRedirects: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                $inc: { numberOfRedirects: 1 },
            })
                .then(async () => {
                    const url = await self.getById(urlId);
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    restrict: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                restricted: true,
            })
                .then(async () => {
                    const restrictedURL = await self.getById(urlId);
                    resolve(restrictedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    unrestrict: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                restricted: false,
            })
                .then(async () => {
                    const unrestrictedURL = await self.getById(urlId);
                    resolve(unrestrictedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    ban: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                banned: true,
            })
                .then(async () => {
                    const bannedURL = await self.getById(urlId);
                    resolve(bannedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    unban: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            await URL.findByIdAndUpdate(urlId, {
                banned: false,
            })
                .then(async () => {
                    const unbannedURL = await self.getById(urlId);
                    resolve(unbannedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (urlId) => {
        return new Promise(async (resolve, reject) => {
            const deletedURL = await self.getById(urlId);

            await URL.findByIdAndDelete(deletedURL._id)
                .then(() => {
                    resolve(deletedURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
