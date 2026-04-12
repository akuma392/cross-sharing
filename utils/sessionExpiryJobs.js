const cron = require("node-cron");
const { expireSessions } = require("../services/sessionService");

cron.schedule("*/5 * * * *", async () => {
    await expireSessions();
    console.log("Expired sessions cleaned");
});