const cacheLib = require('/lib/cache');

const TASKS_KEY = 'welcome-app-tasks';
const Utils = cacheLib.newCache({
    size: 1,
    expire: 3600
});

exports.removeTask = (taskId, json) => {
    if (!json) {
        json = getCache();
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].taskId === taskId) {
            json.splice(i, 1);
            Utils.put(TASKS_KEY, JSON.stringify(json));
            return;
        }
    }
}

exports.setCache = function (json) {
    Utils.put(TASKS_KEY, JSON.stringify(json));
}

const getCache = function () {
    const cacheValue = Utils.getIfPresent(TASKS_KEY);
    if (!cacheValue) {
        return [];
    }
    return JSON.parse(cacheValue);
}

exports.getTask = function (taskId, json) {
    if (!json) {
        json = getCache();
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].taskId === taskId) {
            return json[i];
        }
    }
    return undefined;
}

exports.updateTask = function (taskId, info, json) {
    if (!json) {
        json = getCache();
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].taskId === taskId) {
            json[i] = info;
        }
    }
    Utils.put(TASKS_KEY, JSON.stringify(json));
}