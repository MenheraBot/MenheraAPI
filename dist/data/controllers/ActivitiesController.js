"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../util/APIError"));
const Activities_1 = __importDefault(require("../util/Activities"));
class ActivityController {
    static all(_req, res) {
        return res.json(Activities_1.default.getInstance().getAllActivities());
    }
    static clear(_req, res) {
        Activities_1.default.getInstance().clearActivities();
        return res.status(200).json({ ok: true });
    }
    static reset(_req, res) {
        return res.status(200).json(Activities_1.default.getInstance().resetActivities());
    }
    static add(req, res) {
        const ACTIVITY_TYPES = ['WATCHING', 'PLAYING', 'LISTENING', 'STREAMING'];
        const { type, name, url } = req.body;
        if (!type || !name) {
            throw new APIError_1.default('O conteúdo do request é inválido!', 400);
        }
        if (!ACTIVITY_TYPES.includes(type)) {
            throw new APIError_1.default(`Este tipo é invalido! tipos: ${ACTIVITY_TYPES}`, 400);
        }
        Activities_1.default.getInstance().addActivity(name, type, url);
        return res.status(201).send({ type, name, url });
    }
}
exports.default = ActivityController;
