const Session = require("../models/session");

const expireSessions = async () => {
    await Session.updateMany(
        { expiresAt: { $lt: new Date() } },
        { isActive: false }
    );
};

module.exports = { expireSessions };