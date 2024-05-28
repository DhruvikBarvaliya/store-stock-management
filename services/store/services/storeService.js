const Store = require('../models/store');

const createStore = async (data) => {
    return await Store.create(data);
};

const getAllStores = async () => {
    return await Store.findAll();
};

const getStoreById = async (id) => {
    return await Store.findByPk(id);
};

const updateStore = async (id, data) => {
    await Store.update(data, {
        where: { id }
    });
    return await getStoreById(id);
};

const deleteStore = async (id) => {
    return await Store.destroy({
        where: { id }
    });
};

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
};