const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = [
            ".png",
            ".jpg",
            ".jpeg",
            ".svg",
            ".gif",
            ".webp",
        ];
        if (!allowedExtensions.includes(path.extname(file.originalname))) {
            return cb(
                new Error(
                    "Only images (.png | .jpg | .jpeg | .svg | .gif | .webp) are allowed!"
                )
            );
        }

        cb(null, true);
    },
});

const auth = require("../middleware/auth.middleware");
const uploadFileToGoogleDrive = require("../middleware/uploadFileToGoogleDrive.middleware");

const userController = require("../controllers/user.controller");

router.route("/").get(userController.getAll);

router
    .route("/me")
    .get(auth("Subscriber"), userController.getUser)
    .patch(
        rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 20,
            message: {
                success: false,
                error: {
                    message:
                        "Too many requests sent from this IP, please try again after an hour!",
                },
            },
        }),
        auth("Subscriber"),
        upload.single("avatar"),
        uploadFileToGoogleDrive,
        userController.updateUser
    )
    .delete(auth("Subscriber"), userController.deleteUser);

router.route("/:userId").get(userController.getById);

module.exports = router;
