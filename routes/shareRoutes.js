const express = require("express");
const { attachDevice } = require("../middleware/deviceMiddleware");
const { sendMessage, getMessages } = require("../controllers/shareController");

module.exports = (io) => {
    const router = express.Router();
    router.post("/", attachDevice, sendMessage(io));
    router.get("/:sessionId", getMessages);
    return router;
};