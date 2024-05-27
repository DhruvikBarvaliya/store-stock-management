const Store = require('../models/store');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const { name, location } = req.body;
        const newStore = await Store.create({ name, location });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ message: 'Error creating store', error });
    }
};

// Get all stores
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stores', error });
    }
};
