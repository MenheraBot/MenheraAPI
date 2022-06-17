"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShardStatusManager_1 = __importDefault(require("../managers/ShardStatusManager"));
class ShardStatusController {
    static async getShardStatus(_req, res) {
        const shards = ShardStatusManager_1.default.getInstance().getAllShards();
        return res.json(shards);
    }
    static updateShardStatus(req, res) {
        const { shards } = req.body.data;
        shards.forEach((shard) => {
            const { memoryUsed, uptime, guilds, unavailable, ping, lastPingAt, members, id, clusterId, connected, } = shard;
            const data = {
                id: Number(id),
                memoryUsed,
                uptime,
                guilds,
                unavailable,
                ping,
                lastPingAt,
                members,
                connected,
                clusterId,
            };
            ShardStatusManager_1.default.getInstance().putShard(Number(id), data);
        });
        return res.sendStatus(200);
    }
}
exports.default = ShardStatusController;
