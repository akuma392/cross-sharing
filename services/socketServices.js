const emitToSession = (io, sessionId, event, data) => {
    io.to(sessionId).emit(event, data);
};

module.exports = { emitToSession };