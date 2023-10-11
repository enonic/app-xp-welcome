let store = [];
let isLocked = false;
const maxRetries = 100;

function wrapWithLock(fn) {
    return function () {
        for (let i = 0; i < maxRetries; i++) {
            if (!isLocked) {
                isLocked = true;
                const result = fn.apply(this, arguments);
                isLocked = false;
                return result;
            } else {
                log.debug('Waiting for lock to release...');
            }
        }
    }
}

const setCache = function (json) {
    store = json;
}

const getCache = function () {
    return store || [];
}

const getTask = function (taskId, json) {
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

const updateTask = function (taskId, info, json) {
    if (!json) {
        json = getCache();
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].taskId === taskId) {
            json[i] = info;
            break;
        }
    }
    setCache(json);
}

const removeTask = function(taskId, json) {
    if (!json) {
        json = getCache();
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].taskId === taskId) {
            json.splice(i, 1);
            setCache(json);
            break;
        }
    }
}

module.exports = {
    setCache: wrapWithLock(setCache),
    getTask: wrapWithLock(getTask),
    updateTask: wrapWithLock(updateTask),
    removeTask: wrapWithLock(removeTask)
};