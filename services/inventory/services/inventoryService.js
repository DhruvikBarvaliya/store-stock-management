const Inventory = require('../models/inventoryItem');

const createInventory = async (data) => {
    return await Inventory.create(data);
};

const getAllInventories = async () => {
    return await Inventory.findAll();
};

const getInventoryById = async (id) => {
    return await Inventory.findByPk(id);
};

const updateInventory = async (id, data) => {
    await Inventory.update(data, {
        where: { id }
    });
    return await getInventoryById(id);
};

const deleteInventory = async (id) => {
    return await Inventory.destroy({
        where: { id }
    });
};

module.exports = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
};