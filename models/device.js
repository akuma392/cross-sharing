var mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    deviceName: String,
    socketId: String,
    sessionId: mongoose.Schema.Types.ObjectId,
    isMain: Boolean,
});

var Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

module.exports = Device;