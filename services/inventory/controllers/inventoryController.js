const inventoryService = require('../services/inventoryService');

const addInventoryItem = async (req, res, next) => {
    try {
        const data = req.body;
        const item = await inventoryService.addInventoryItem(data);
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

const getInventoryList = async (req, res, next) => {
    try {
        const items = await inventoryService.getInventoryList();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addInventoryItem,
    getInventoryList,
};


// const InventoryItem = require('../models/inventoryItem');

// // Create a new inventory item
// exports.addItem = async (req, res) => {
//     try {
//         const { name, quantity, location } = req.body;
//         const newItem = await InventoryItem.create({ name, quantity, location });
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating inventory item', error });
//     }
// };

// // Get all inventory items
// exports.getItems = async (req, res) => {
//     try {
//         const items = await InventoryItem.findAll();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving inventory items', error });
//     }
// };

// // Get a single inventory item by ID
// exports.getItemById = async (req, res) => {
//     try {
//         const item = await InventoryItem.findByPk(req.params.id);
//         if (!item) {
//             return res.status(404).json({ message: 'Inventory item not found' });
//         }
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving inventory item', error });
//     }
// };

// // Update an inventory item by ID
// exports.updateItem = async (req, res) => {
//     try {
//         const { name, quantity, location } = req.body;
//         const item = await InventoryItem.findByPk(req.params.id);
//         if (!item) {
//             return res.status(404).json({ message: 'Inventory item not found' });
//         }
//         item.name = name;
//         item.quantity = quantity;
//         item.location = location;
//         await item.save();
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating inventory item', error });
//     }
// };

// // Delete an inventory item by ID
// exports.deleteItem = async (req, res) => {
//     try {
//         const item = await InventoryItem.findByPk(req.params.id);
//         if (!item) {
//             return res.status(404).json({ message: 'Inventory item not found' });
//         }
//         await item.destroy();
//         res.status(204).json({ message: 'Inventory item deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting inventory item', error });
//     }
// };