const mongoose = require("mongoose");

const OSchemaDefinition = {
    title: String,
    Name: {
        type: String,
        default: "",
    },
    Pwd: {
        type: String,
        default: "",
    },
    Total: {
        type: Number,
        default: 10000,
    }
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const AccountModel = mongoose.model("account", schema);

module.exports = AccountModel;

