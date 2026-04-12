var mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
    sessionId: mongoose.Schema.Types.ObjectId,
    senderDeviceId: mongoose.Schema.Types.ObjectId,
    content: String,
    type: String,
}, { timestamps: true });

var Share = mongoose.model("Share", shareSchema);

module.exports = Share;