const Session = require("../models/session");
const Device = require("../models/device");
const generatePairCode = require("../utils/generateCode");

const createSession = async (req, res) => {
    const code = generatePairCode();

    const session = await Session.create({
        userId: req.user._id,
        pairCode: code,
        expiresAt: Date.now() + 3600000,
    });

    const device = await Device.create({
        userId: req.user._id,
        deviceName: "Main Device",
        isMain: true,
        sessionId: session._id,
    });

    session.mainDeviceId = device._id;
    session.devices.push(device._id);
    await session.save();

    res.json({ session, device });
};

const joinSession = async (req, res) => {
    const { code, deviceName } = req.body;

    const session = await Session.findOne({
        pairCode: code,
        isActive: true,
    });

    if (!session) return res.status(404).json({ message: "Invalid code" });

    const device = await Device.create({
        userId: session.userId,
        deviceName,
        sessionId: session._id,
    });

    session.devices.push(device._id);
    await session.save();

    res.json({ session, device });
};

module.exports = { createSession, joinSession };