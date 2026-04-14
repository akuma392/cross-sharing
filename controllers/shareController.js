const Share = require("../models/share");

const sendMessage = (io) => async (req, res) => {
    const { sessionId, content, type } = req.body;

    const msg = await Share.create({
        sessionId,
        senderDeviceId: req.device._id,
        content,
        type,
    });
    io.to(sessionId).emit("new_message", msg);
    res.json(msg);
};

const getMessages = async (req, res) => {
    const { sessionId } = req.params;

    const messages = await Share.find({ sessionId }).sort({ createdAt: -1 });

    res.json(messages);
};

module.exports = { sendMessage, getMessages };