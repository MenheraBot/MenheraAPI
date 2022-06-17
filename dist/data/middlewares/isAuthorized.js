"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization !== process.env.API_TOKEN) {
        return res.status(401).send({ message: 'Only the Menhera Client can access that!' });
    }
    return next();
};
