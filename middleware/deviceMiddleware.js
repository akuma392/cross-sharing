const Device = require("../models/device");

const attachDevice = async (req, res, next) => {
    const deviceId = req.headers["device-id"];

    if (!deviceId) return res.status(400).json({ message: "No device" });

    req.device = await Device.findById(deviceId);
    next();
};

module.exports = { attachDevice };