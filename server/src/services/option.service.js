const Option = require("../models/option.model");

const self = (module.exports = {
    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await Option.find()
                .then(async (options) => {
                    resolve(options);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (optionId) => {
        return new Promise(async (resolve, reject) => {
            await Option.findById(optionId)
                .then(async (option) => {
                    resolve(option);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getByName: async (name) => {
        return new Promise(async (resolve, reject) => {
            await Option.findOne({ name })
                .then((option) => {
                    resolve(option);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isOptionExist: async (optionId) => {
        try {
            if (!(await self.getById(optionId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({ name, value }) => {
        return new Promise(async (resolve, reject) => {
            const newOption = new Option({
                name,
                value,
            });

            await newOption
                .save()
                .then(async (createdOption) => {
                    const option = await self.getById(createdOption._id);
                    resolve(option);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (optionId, { value }) => {
        return new Promise(async (resolve, reject) => {
            await Option.findByIdAndUpdate(optionId, { value })
                .then(async () => {
                    const updeatedOption = await self.getById(optionId);
                    resolve(updeatedOption);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (optionId) => {
        return new Promise(async (resolve, reject) => {
            await Option.findByIdAndDelete(optionId)
                .then(async (deletedOption) => {
                    resolve(deletedOption);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
