
const PurchaseOrder = require('../models/purchaseOrder');

const createPurchaseOrder = async (data) => {
    return await PurchaseOrder.create(data);
};

const getAllPurchaseOrders = async () => {
    return await PurchaseOrder.findAll();
};

const getPurchaseOrderById = async (id) => {
    return await PurchaseOrder.findByPk(id);
};

const updatePurchaseOrder = async (id, data) => {
    await PurchaseOrder.update(data, {
        where: { id }
    });
    return await getPurchaseOrderById(id);
};

const deletePurchaseOrder = async (id) => {
    return await PurchaseOrder.destroy({
        where: { id }
    });
};

module.exports = {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
};
