const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const keysPath = path.join(__dirname, "/../config/google-drive-keys.json");
const scopes = ["https://www.googleapis.com/auth/drive"];

const self = (module.exports = {
    upload: async (filePath, fileName, mimeType) => {
        const auth = new google.auth.GoogleAuth({
            keyFile: keysPath,
            scopes,
        });
        const driveService = google.drive({ version: "v3", auth });
        const fileMetadata = {
            name: fileName,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        };
        const media = {
            mimeType: mimeType,
            body: fs.createReadStream(path.join(__dirname, "/../", filePath)),
        };

        const { data } = await driveService.files.create({
            resource: fileMetadata,
            media,
            fields: "id",
        });

        return `https://drive.google.com/uc?id=${data.id}`;
    },
    delete: async () => {},
});
