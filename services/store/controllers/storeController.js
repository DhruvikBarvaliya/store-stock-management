const storeService = require('../services/storeService');

const createStore = async (req, res, next) => {
    try {
        const data = req.body;
        const store = await storeService.createStore(data);
        res.status(201).json(store);
    } catch (error) {
        next(error);
    }
};

const getAllStores = async (req, res, next) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
};

const getStoreById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const store = await storeService.getStoreById(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
};

const updateStore = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedStore = await storeService.updateStore(id, data);
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(updatedStore);
    } catch (error) {
        next(error);
    }
};

const deleteStore = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await storeService.deleteStore(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
};
