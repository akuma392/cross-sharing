const express = require("express");
const { attachDevice } = require("../middleware/deviceMiddleware");
const { sendMessage } = require("../controllers/shareController");

module.exports = (io) => {
    const router = express.Router();
    router.post("/", attachDevice, sendMessage(io));
    return router;
};