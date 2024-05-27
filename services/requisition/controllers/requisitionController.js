const Requisition = require('../models/requisition');

// Create a new requisition
exports.createRequisition = async (req, res) => {
    try {
        const { itemName, quantity, requestedBy } = req.body;
        const newRequisition = await Requisition.create({ itemName, quantity, requestedBy });
        res.status(201).json(newRequisition);
    } catch (error) {
        res.status(500).json({ message: 'Error creating requisition', error });
    }
};

// Get all requisitions
exports.getRequisitions = async (req, res) => {
    try {
        const requisitions = await Requisition.findAll();
        res.status(200).json(requisitions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving requisitions', error });
    }
};

// Get a single requisition by ID
exports.getRequisitionById = async (req, res) => {
    try {
        const requisition = await Requisition.findByPk(req.params.id);
        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        res.status(200).json(requisition);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving requisition', error });
    }
};

// Update a requisition by ID
exports.updateRequisition = async (req, res) => {
    try {
        const { itemName, quantity, requestedBy, status } = req.body;
        const requisition = await Requisition.findByPk(req.params.id);
        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        requisition.itemName = itemName;
        requisition.quantity = quantity;
        requisition.requestedBy = requestedBy;
        requisition.status = status;
        await requisition.save();
        res.status(200).json(requisition);
    } catch (error) {
        res.status(500).json({ message: 'Error updating requisition', error });
    }
};

// Delete a requisition by ID
exports.deleteRequisition = async (req, res) => {
    try {
        const requisition = await Requisition.findByPk(req.params.id);
        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }
        await requisition.destroy();
        res.status(204).json({ message: 'Requisition deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting requisition', error });
    }
};
