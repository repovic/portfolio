const ContactRecord = require("../models/contactRecord.model");

const self = (module.exports = {
    format: (contactRecord) => {
        return {
            _id: contactRecord._id,
            firstName: contactRecord.firstName,
            lastName: contactRecord.lastName,
            email: contactRecord.email,
            message: contactRecord.message,
            ip: contactRecord.ip,
            createdAt: contactRecord.createdAt,
            updatedAt: contactRecord.updatedAt,
        };
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await ContactRecord.find()
                .then((contactRecords) => {
                    resolve(contactRecords);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (contactRecordId) => {
        return new Promise(async (resolve, reject) => {
            await ContactRecord.findById(contactRecordId)
                .then((contactRecord) => {
                    resolve(contactRecord);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isContactRecordExist: async (contactRecordId) => {
        try {
            if (!(await self.getById(contactRecordId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({ firstName, lastName, email, message, ip }) => {
        return new Promise(async (resolve, reject) => {
            const newContactRecord = new ContactRecord({
                firstName,
                lastName,
                email,
                message,
                ip,
            });

            await newContactRecord
                .save()
                .then(async ({ _id }) => {
                    const createdContactRecord = await self.getById(_id);
                    resolve(createdContactRecord);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (contactRecordId) => {
        return new Promise(async (resolve, reject) => {
            const deletedContactRecord = await self.getById(contactRecordId);

            await ContactRecord.findByIdAndDelete(deletedContactRecord._id)
                .then(() => {
                    resolve(deletedContactRecord);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
