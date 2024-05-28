const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (username, password) => {
    const user = await User.create({ username, password });
    return user;
};

const login = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
};

const authenticate = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    register,
    login,
    authenticate,
};