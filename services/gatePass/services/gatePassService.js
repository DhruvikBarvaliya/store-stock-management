const GatePass = require('../models/gatePass');

const createGatePass = async (data) => {
    return await GatePass.create(data);
};

const getAllGatePasses = async () => {
    return await GatePass.findAll();
};

const getGatePassById = async (id) => {
    return await GatePass.findByPk(id);
};

const updateGatePass = async (id, data) => {
    await GatePass.update(data, {
        where: { id }
    });
    return await getGatePassById(id);
};

const deleteGatePass = async (id) => {
    return await GatePass.destroy({
        where: { id }
    });
};

module.exports = {
    createGatePass,
    getAllGatePasses,
    getGatePassById,
    updateGatePass,
    deleteGatePass,
};