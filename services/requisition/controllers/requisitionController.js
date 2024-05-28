const requisitionService = require('../services/requisitionService');

const createRequisition = async (req, res, next) => {
    try {
        const data = req.body;
        const requisition = await requisitionService.createRequisition(data);
        res.status(201).json(requisition);
    } catch (error) {
        next(error);
    }
};

const getAllRequisitions = async (req, res, next) => {
    try {
        const requisitions = await requisitionService.getAllRequisitions();
        res.status(200).json(requisitions);
    } catch (error) {
        next(error);
    }
};

const getRequisitionById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const requisition = await requisitionService.getRequisitionById(id);
        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        res.status(200).json(requisition);
    } catch (error) {
        next(error);
    }
};

const updateRequisition = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedRequisition = await requisitionService.updateRequisition(id, data);
        if (!updatedRequisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        res.status(200).json(updatedRequisition);
    } catch (error) {
        next(error);
    }
};

const deleteRequisition = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await requisitionService.deleteRequisition(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRequisition,
    getAllRequisitions,
    getRequisitionById,
    updateRequisition,
    deleteRequisition,
};
