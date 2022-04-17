const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const auth = (role = "Subscriber") => {
    return async (req, res, next) => {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "No authentication token, access denied!",
                    },
                });
            }

            const userVerified = jwt.verify(token, process.env.JWT_SECRET);
            if (!userVerified) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "Invalid authentication token!",
                    },
                });
            }

            const userData = await userService.getById(userVerified.id);
            if (!userData) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "Invalid authentication token!",
                    },
                });
            }

            if (userVerified.passwordHash !== userData.passwordHash) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "Invalid authentication token!",
                    },
                });
            }

            if (userData.banned) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "The user is banned from server!",
                    },
                });
            }

            if (userData.role !== "Administrator" && role !== userData.role) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: `${role} authentication failed!`,
                    },
                });
            }

            req.userData = userData;
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: {
                    message: "Invalid authentication token!",
                },
            });
        }
    };
};

module.exports = auth;
