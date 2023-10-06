const cacheLib = require('/lib/cache');

const TASKS_KEY = 'welcome-app-tasks';
const Store = cacheLib.newCache({
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
            Store.put(TASKS_KEY, JSON.stringify(json));
            return;
        }
    }
}

exports.setCache = function (json) {
    Store.put(TASKS_KEY, JSON.stringify(json));
}

const getCache = function () {
    const cacheValue = Store.getIfPresent(TASKS_KEY);
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
        let cachedTask = json[i];
        if (typeof taskId === 'string' && cachedTask.taskId === taskId
            || typeof taskId === 'function' && taskId(cachedTask)) {
            return cachedTask;
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
    Store.put(TASKS_KEY, JSON.stringify(json));
}