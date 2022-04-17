const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactRecordSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ContactRecord = mongoose.model("ContactRecord", ContactRecordSchema);
module.exports = ContactRecord;
