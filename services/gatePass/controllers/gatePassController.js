const createGatePass = async (req, res, next) => {
    try {
        const data = req.body;
        const gatePass = await gatePassService.createGatePass(data);
        res.status(201).json(gatePass);
    } catch (error) {
        next(error);
    }
};

const getGatePasses = async (req, res, next) => {
    try {
        const gatePasses = await gatePassService.getGatePasses();
        res.status(200).json(gatePasses);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createGatePass,
    getGatePasses,
};
