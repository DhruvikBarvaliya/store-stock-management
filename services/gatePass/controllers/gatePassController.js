const gatePassService = require('../services/gatePassService');

const createGatePass = async (req, res, next) => {
    try {
        const data = req.body;
        const gatePass = await gatePassService.createGatePass(data);
        res.status(201).json(gatePass);
    } catch (error) {
        next(error);
    }
};

const getAllGatePasses = async (req, res, next) => {
    try {
        const gatePasses = await gatePassService.getAllGatePasses();
        res.status(200).json(gatePasses);
    } catch (error) {
        next(error);
    }
};

const getGatePassById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const gatePass = await gatePassService.getGatePassById(id);
        if (!gatePass) {
            return res.status(404).json({ message: 'GatePass not found' });
        }
        res.status(200).json(gatePass);
    } catch (error) {
        next(error);
    }
};

const updateGatePass = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedGatePass = await gatePassService.updateGatePass(id, data);
        if (!updatedGatePass) {
            return res.status(404).json({ message: 'GatePass not found' });
        }
        res.status(200).json(updatedGatePass);
    } catch (error) {
        next(error);
    }
};

const deleteGatePass = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await gatePassService.deleteGatePass(id);
        if (!deleted) {
            return res.status(404).json({ message: 'GatePass not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createGatePass,
    getAllGatePasses,
    getGatePassById,
    updateGatePass,
    deleteGatePass,
};