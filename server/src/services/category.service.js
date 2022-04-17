const Category = require("../models/category.model");
const userService = require("./user.service");

const self = (module.exports = {
    format: (category) => {
        return {
            _id: category._id,
            name: category.name,
            author: userService.format(category.author),
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    },

    hideSensitiveInformations: (category) => {
        return {
            _id: category._id,
            name: category.name,
            author: userService.hideSensitiveInformations(category.author),
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await Category.find()
                .then(async (categories) => {
                    for (let category of categories) {
                        category.author = await userService.getById(
                            category.author
                        );
                    }
                    resolve(categories);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (categoryId) => {
        return new Promise(async (resolve, reject) => {
            await Category.findById(categoryId)
                .then(async (category) => {
                    category.author = await userService.getById(
                        category.author
                    );
                    resolve(category);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isCategoryExist: async (categoryId) => {
        try {
            if (!(await self.getById(categoryId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({ name, author }) => {
        return new Promise(async (resolve, reject) => {
            const newCategory = new Category({
                name,
                author,
            });

            await newCategory
                .save()
                .then(async (createdCategory) => {
                    const category = await self.getById(createdCategory._id);
                    resolve(category);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (categoryId, { name }) => {
        return new Promise(async (resolve, reject) => {
            await Category.findByIdAndUpdate(categoryId, { name })
                .then(async () => {
                    const category = await self.getById(categoryId);
                    resolve(category);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (categoryId) => {
        return new Promise(async (resolve, reject) => {
            await Category.findByIdAndDelete(categoryId)
                .then(async (deletedCategory) => {
                    deletedCategory.author = await userService.getById(
                        deletedCategory.author
                    );
                    resolve(deletedCategory);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
