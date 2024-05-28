const purchaseOrderService = require('../services/purchaseOrderService');

const createPurchaseOrder = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await purchaseOrderService.createPurchaseOrder(data);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

const getAllPurchaseOrders = async (req, res, next) => {
    try {
        const orders = await purchaseOrderService.getAllPurchaseOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getPurchaseOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await purchaseOrderService.getPurchaseOrderById(id);
        if (!order) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const updatePurchaseOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedOrder = await purchaseOrderService.updatePurchaseOrder(id, data);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

const deletePurchaseOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await purchaseOrderService.deletePurchaseOrder(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
};
