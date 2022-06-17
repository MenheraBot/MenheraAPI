"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShardStatus {
    constructor() {
        this.status = new Map();
    }
    getAllShards() {
        return Array.from(this.status.values());
    }
    putShard(shardId, shardData) {
        this.status.set(shardId, shardData);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ShardStatus();
        }
        return this.instance;
    }
}
exports.default = ShardStatus;
