const { upload } = require("../services/googleFileUpload.service");

const uploadFileToGoogleDrive = async (req, res, next) => {
    try {
        if (req.file) {
            if (String(process.env.FILE_UPLOAD_TYPE) == "gdrive") {
                req.fileUrl = await upload(
                    req.file.path,
                    req.file.originalname,
                    req.file.mimetype
                );
            } else {
                req.fileUrl = `${process.env.SERVER_CDN_URL}uploads/${req.file.filename}`;
            }
            delete req.file;
        }
        if (req.files) {
            var filesUrls = {};
            for (const key of Object.keys(req.files)) {
                filesUrls[key] = [];
                for (const file of req.files[key]) {
                    await filesUrls[key].push(
                        String(process.env.FILE_UPLOAD_TYPE) == "gdrive"
                            ? await upload(
                                  file.path,
                                  file.originalname,
                                  file.mimetype
                              )
                            : `${process.env.SERVER_CDN_URL}uploads/${file.filename}`
                    );
                }
            }
            delete req.files;
            req.filesUrls = filesUrls;
        }

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: {
                message: "Server error occurred, please try again!",
            },
        });
    }
};
module.exports = uploadFileToGoogleDrive;
