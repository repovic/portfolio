const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const self = (module.exports = {
    format: (user) => {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            avatarUrl: user.avatarUrl,
            ip: user.ip,
            banned: user.banned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },

    hideSensitiveInformations: (user) => {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            avatarUrl: user.avatarUrl,
            banned: user.banned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await User.find()
                .then((users) => {
                    resolve(users);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (userId) => {
        return new Promise(async (resolve, reject) => {
            await User.findById(userId)

                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getByUsername: async (username) => {
        return new Promise(async (resolve, reject) => {
            await User.findOne({ username })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isUserExist: async (userId) => {
        try {
            if (!(await self.getById(userId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({
        username,
        firstName,
        lastName,
        email,
        password,
        registrationIp,
    }) => {
        return new Promise(async (resolve, reject) => {
            const displayName = String(firstName) + " " + String(lastName);

            const avatarUrl =
                `https://eu.ui-avatars.com/api/?background=000DFF&color=ffffff&bold=true&name=${displayName}`
                    .split(" ")
                    .join("+");

            const role = "Subscriber";
            const banned = false;

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstName,
                lastName,
                username,
                email,
                displayName,
                role,
                avatarUrl,
                passwordHash,
                ip: registrationIp,
                banned,
            });

            await newUser
                .save()
                .then((createdUser) => {
                    resolve(createdUser);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (
        userId,
        {
            username,
            firstName,
            lastName,
            displayName,
            email,
            role,
            avatarUrl,
            password,
        }
    ) => {
        return new Promise(async (resolve, reject) => {
            const user = await self.getById(userId);

            firstName = firstName || user.firstName;
            lastName = lastName || user.lastName;
            username = username || user.username;
            displayName = displayName || user.displayName;
            email = email || user.email;
            role = role || user.role;
            const passwordHash = password
                ? await bcrypt.hash(password, 10)
                : user.passwordHash;

            avatarUrl = avatarUrl || user.avatarUrl;

            if (
                firstName &&
                lastName &&
                avatarUrl.startsWith("https://eu.ui-avatars.com/api/?name")
            ) {
                avatarUrl = `https://eu.ui-avatars.com/api/?name=${displayName}`
                    .split(" ")
                    .join("+");
            }

            await User.findByIdAndUpdate(userId, {
                username,
                firstName,
                lastName,
                displayName,
                email,
                role,
                avatarUrl,
                passwordHash,
            })
                .then(async () => {
                    const updeatedUser = await self.getById(userId);
                    resolve(updeatedUser);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    ban: async (userId) => {
        return new Promise(async (resolve, reject) => {
            await User.findByIdAndUpdate(userId, {
                banned: true,
            })
                .then(async () => {
                    await self.getById(userId).then((bannedUser) => {
                        resolve(bannedUser);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    unban: async (userId) => {
        return new Promise(async (resolve, reject) => {
            await User.findByIdAndUpdate(userId, {
                banned: false,
            })
                .then(async () => {
                    await self.getById(userId).then((unbannedUser) => {
                        resolve(unbannedUser);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (userId) => {
        return new Promise(async (resolve, reject) => {
            await User.findByIdAndDelete(userId)
                .then((deletedUser) => {
                    resolve(deletedUser);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
