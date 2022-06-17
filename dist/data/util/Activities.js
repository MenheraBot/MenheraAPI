"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Activities {
    constructor() {
        this.activities = Activities.getDefaultActivities();
    }
    static getDefaultActivities() {
        return [
            {
                name: '💖 | Obrigada por me salvarem',
                type: 'PLAYING',
            },
            {
                name: '💖 | Twitch da minha Dona',
                type: 'STREAMING',
            },
        ];
    }
    getAllActivities() {
        return this.activities;
    }
    addActivity(name, type, url) {
        this.activities.push({ name, type, url });
    }
    clearActivities() {
        this.activities = [];
    }
    resetActivities() {
        this.activities = Activities.getDefaultActivities();
        return this.activities;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Activities();
        }
        return this.instance;
    }
}
exports.default = Activities;
