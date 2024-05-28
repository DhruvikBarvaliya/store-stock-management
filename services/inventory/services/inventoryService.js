const Inventory = require('../models/inventoryItem');

const addInventoryItem = async (data) => {
    return await Inventory.create(data);
};

const getInventoryList = async () => {
    return await Inventory.findAll();
};

module.exports = {
    addInventoryItem,
    getInventoryList,
};
