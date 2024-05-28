const documentService = require('../services/documentService');

const createDocument = async (req, res, next) => {
    try {
        const data = req.body;
        const document = await documentService.createDocument(data);
        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

const getAllDocuments = async (req, res, next) => {
    try {
        const documents = await documentService.getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        next(error);
    }
};

const getDocumentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const document = await documentService.getDocumentById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        next(error);
    }
};

const updateDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedDocument = await documentService.updateDocument(id, data);
        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(updatedDocument);
    } catch (error) {
        next(error);
    }
};

const deleteDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await documentService.deleteDocument(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
};
