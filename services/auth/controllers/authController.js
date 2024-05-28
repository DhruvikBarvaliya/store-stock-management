const authService = require('../services/authService');

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);
        res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await authService.authenticate(token);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    authenticate,
};

