const GatePass = require('../models/gatePass');

const createGatePass = async (data) => {
    return await GatePass.create(data);
};

const getGatePasses = async () => {
    return await GatePass.findAll();
};

module.exports = {
    createGatePass,
    getGatePasses,
};