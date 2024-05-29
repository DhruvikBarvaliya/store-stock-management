const inventoryService = require('../services/inventoryService');

const createInventory = async (req, res, next) => {
    try {
        const data = req.body;
        const inventory = await inventoryService.createInventory(data);
        res.status(201).json(inventory);
    } catch (error) {
        next(error);
    }
};

const getAllInventories = async (req, res, next) => {
    try {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json(inventories);
    } catch (error) {
        next(error);
    }
};

const getInventoryById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const inventory = await inventoryService.getInventoryById(id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};

const updateInventory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedInventory = await inventoryService.updateInventory(id, data);
        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.status(200).json(updatedInventory);
    } catch (error) {
        next(error);
    }
};

const deleteInventory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await inventoryService.deleteInventory(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
};