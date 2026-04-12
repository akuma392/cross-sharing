var mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    pairCode: String,
    mainDeviceId: mongoose.Schema.Types.ObjectId,
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
});

var Session = mongoose.model("Session", sessionSchema);

module.exports = Session;