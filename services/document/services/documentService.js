const Document = require('../models/Document');

const createDocument = async (data) => {
    return await Document.create(data);
};

const getAllDocuments = async () => {
    return await Document.findAll();
};

const getDocumentById = async (id) => {
    return await Document.findByPk(id);
};

const updateDocument = async (id, data) => {
    await Document.update(data, {
        where: { id }
    });
    return await getDocumentById(id);
};

const deleteDocument = async (id) => {
    return await Document.destroy({
        where: { id }
    });
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
};