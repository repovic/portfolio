const router = require("express").Router();
const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,

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

const adminController = require("../controllers/admin.controller");

router.route("/user/").get(auth("Administrator"), adminController.getAllUsers);

router
    .route("/user/:userId/")
    .get(auth("Administrator"), adminController.getUserById)
    .patch(
        auth("Administrator"),
        upload.single("avatar"),
        uploadFileToGoogleDrive,
        adminController.updateUser
    )
    .delete(auth("Administrator"), adminController.deleteUser);

router
    .route("/user/:userId/ban")
    .post(auth("Administrator"), adminController.banUser);

router
    .route("/user/:userId/unban")
    .post(auth("Administrator"), adminController.unbanUser);

router
    .route("/category/")
    .get(auth("Administrator"), adminController.getAllCategories)
    .post(auth("Administrator"), adminController.createCategory);

router
    .route("/category/:categoryId")
    .get(auth("Administrator"), adminController.getCategoryById)
    .patch(auth("Administrator"), adminController.updateCategory)
    .delete(auth("Administrator"), adminController.deleteCategory);

router
    .route("/post/")
    .get(auth("Administrator"), adminController.getAllPosts)
    .post(
        auth("Administrator"),
        upload.single("thumbnail"),
        uploadFileToGoogleDrive,
        adminController.createPost
    );

router
    .route("/post/:postId")
    .get(auth("Administrator"), adminController.getPostById)
    .patch(
        auth("Administrator"),
        upload.single("thumbnail"),
        uploadFileToGoogleDrive,
        adminController.updatePost
    )
    .delete(auth("Administrator"), adminController.deletePost);

router
    .route("/project/")
    .get(auth("Administrator"), adminController.getAllProjects)
    .post(
        auth("Administrator"),
        upload.fields([
            { name: "featuredImage", maxCount: 1 },
            { name: "images", maxCount: 15 },
        ]),
        uploadFileToGoogleDrive,
        adminController.createProject
    );

router
    .route("/project/:projectId")
    .get(auth("Administrator"), adminController.getProjectById)
    .patch(
        auth("Administrator"),
        upload.fields([
            { name: "featuredImage", maxCount: 1 },
            { name: "images", maxCount: 15 },
        ]),
        uploadFileToGoogleDrive,
        adminController.updateProject
    )
    .delete(auth("Administrator"), adminController.deleteProject);

router
    .route("/option/")
    .get(auth("Administrator"), adminController.getAllOptions)
    .post(auth("Administrator"), adminController.createOption);

router
    .route("/option/:optionId")
    .get(auth("Administrator"), adminController.getOptionById)
    .patch(auth("Administrator"), adminController.updateOption)
    .delete(auth("Administrator"), adminController.deleteOption);

router
    .route("/option/:optionName")
    .get(auth("Administrator"), adminController.getOptionByName);

router
    .route("/post/:objectId")
    .get(auth("Administrator"), adminController.getCommentsOfPost);

router
    .route("/project/:objectId")
    .get(auth("Administrator"), adminController.getCommentsOfProject);

router
    .route("/comment/:commentId")
    .delete(auth("Administrator"), adminController.deleteComment);

router
    .route("/comment/:commentId/hide")
    .post(auth("Administrator"), adminController.hideComment);

router
    .route("/url/")
    .get(auth("Administrator"), adminController.getAllUrls)
    .post(auth("Administrator"), adminController.createUrl);

router
    .route("/url/:urlId")
    .get(auth("Administrator"), adminController.getUrlById)
    .patch(auth("Administrator"), adminController.updateUrl)
    .delete(auth("Administrator"), adminController.deleteUrl);

router
    .route("/url/:urlId/restrict")
    .post(auth("Administrator"), adminController.restrictUrl);
router
    .route("/url/:urlId/unrestrict")
    .post(auth("Administrator"), adminController.unrestrictUrl);

router
    .route("/url/:urlId/ban")
    .post(auth("Administrator"), adminController.banUrl);
router
    .route("/url/:urlId/unban")
    .post(auth("Administrator"), adminController.unbanUrl);

router
    .route("/contact-record/")
    .get(auth("Administrator"), adminController.getAllContactRecords);
router
    .route("/contact-record/:contactRecordId")
    .get(auth("Administrator"), adminController.getContactRecordById)
    .delete(auth("Administrator"), adminController.deleteContactRecord);

module.exports = router;
