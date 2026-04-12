const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
    });

    res.json({ token: generateToken(user._id), user });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token: generateToken(user._id), user });
};

module.exports = { register, login };