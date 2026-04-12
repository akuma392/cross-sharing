const { v4: uuidv4 } = require("uuid");

const generatePairCode = () => {
    return uuidv4().slice(0, 6).toUpperCase();
};

module.exports = generatePairCode;