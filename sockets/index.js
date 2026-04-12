const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Connected:", socket.id);

        socket.on("join_session", ({ sessionId }) => {
            socket.join(sessionId);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });
    });
};

module.exports = initSocket;