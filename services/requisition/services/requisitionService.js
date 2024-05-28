const Requisition = require('../models/requisition');

const createRequisition = async (data) => {
    return await Requisition.create(data);
};

const getAllRequisitions = async () => {
    return await Requisition.findAll();
};

const getRequisitionById = async (id) => {
    return await Requisition.findByPk(id);
};

const updateRequisition = async (id, data) => {
    await Requisition.update(data, {
        where: { id }
    });
    return await getRequisitionById(id);
};

const deleteRequisition = async (id) => {
    return await Requisition.destroy({
        where: { id }
    });
};

module.exports = {
    createRequisition,
    getAllRequisitions,
    getRequisitionById,
    updateRequisition,
    deleteRequisition,
};