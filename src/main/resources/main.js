const cacheLib = require('/lib/cache');
const taskLib = require('/lib/xp/task');
const eventLib = require('/lib/xp/event');
const webSocketLib = require('/lib/xp/websocket');

const SOCKET_GROUP = 'welcome-app';
exports.SOCKET_GROUP = SOCKET_GROUP;

const TASKS_KEY = 'welcome-app-tasks';
const CACHE = cacheLib.newCache({
    size: 1,
    expire: 3600
});

let listening = false;

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

/*    var xpEvent = {
        "description": "Long running task",
        "id": "7ca603c1-3b88-4009-8f30-46ddbcc4bb19",
        "name": "task-7ca603c1-3b88-4009-8f30-46ddbcc4bb19",
        "state": "RUNNING",
        "application": "com.enonic.myapp",
        "user": "user:store:me",
        "startTime": "2017-10-01T09:00:00Z",
        "progress": {
            "info": "Processing item 33",
            "current": 33,
            "total": 42
        }
    };*/
function handleXPTaskEvent(xpEvent) {
    const task = xpEvent.data;
    const cacheValue = CACHE.getIfPresent(TASKS_KEY);

    if (!cacheValue) {
        return;
    }
    const json = JSON.parse(cacheValue);

    if (isTaskExist(json, task.id)) {

        switch (xpEvent.type) {
            case 'task.finished':
            case 'task.removed':
            case 'task.failed':
                log.info('Task %s %s', task.id, task.state);
                removeTask(json, task.state, task.id);
                break;
        }
        log.info('Task %s progress: %s', task.id, JSON.stringify(task.progress));
        webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(task));
    }
}

const removeTask = (json, taskState, taskId) => {
    for (let i = 0; i < json.length; i++) {
        if (json[i] === taskId) {
            log.info('Removing %s task from cache: %s', taskState, taskId);
            json.splice(i, 1);
            CACHE.put(TASKS_KEY, JSON.stringify(json));
            return;
        }
    }
}

const isTaskExist = (json, taskId) => {
    for (let i = 0; i < json.length; i++) {
        if (json[i] === taskId) {
            return true;
        }
    }
    return false;
}

const submitTask = (key) => {
    const taskConfig = {
        descriptor: 'install-app',
        config: {key}
    };
    const taskId = taskLib.submitTask(taskConfig);
    log.info('Submitted task for %s: %s', key, taskId);
    return taskId;
};

const parseTemplate = () => {
    const apps = __.toNativeObject(bean.getTemplateApplications()).applications;
    log.info('Parsed template: %s', JSON.stringify(apps, null, 2));
    const tasks = [];
    for (let index = 0; index < apps.length; index++) {
        let app = apps[index];
        if (app.config && app.config.length > 0) {
            const configPath = __.toNativeObject(bean.createConfigFile(app.key, app.config));
            log.info('Config file for %s created at: %s', app.key, configPath);
        }
        tasks.push(submitTask(app.key));
    }
    CACHE.put(TASKS_KEY, JSON.stringify(tasks));
}

function listenToTaskEvents() {
    if (!listening) {
        eventLib.listener({
            type: 'task.*',
            localOnly: false,
            callback: handleXPTaskEvent
        });
        listening = true;
        log.info('Welcome app is listening for task events...');
    }
}

exports.start = function () {
    listenToTaskEvents();
    parseTemplate();
}