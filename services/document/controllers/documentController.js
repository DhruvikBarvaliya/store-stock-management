const fs = require('fs');
const path = require('path');
const Document = require('../models/Document');
const logger = require('../../../logs/logger');

exports.uploadDocument = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const file = req.files.document;
        const uploadDir = path.join(__dirname, '../../../uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await file.mv(filePath);

        const document = await Document.create({ name: file.name, path: filePath });
        logger.info(`Document uploaded: ${document.name}`);

        res.status(201).json(document);
    } catch (error) {
        logger.error('Error uploading document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.json(documents);
    } catch (error) {
        logger.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
