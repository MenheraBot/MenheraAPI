"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_req, res) => res
    .status(404)
    .send({ message: 'Eu não sei o que tu procuras, mas certamente não está aqui...' });
