"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../util/APIError"));
exports.default = (error, _req, res, next) => {
    if (!error) {
        return next();
    }
    if (error instanceof APIError_1.default) {
        return res.status(error.status).send({ message: error.message });
    }
    console.error(error.message);
    return res.status(500).send({ message: 'An error occurred trying to process your request' });
};
