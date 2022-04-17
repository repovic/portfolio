const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        value: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Option = mongoose.model("Option", OptionSchema);
module.exports = Option;
