const taskLib = require('/lib/xp/task');
const eventLib = require('/lib/xp/event');
const webSocketLib = require('/lib/xp/websocket');
const appLib = require('/lib/xp/app');
const utils = require('/lib/utils');

const SOCKET_GROUP = 'welcome-app';
exports.SOCKET_GROUP = SOCKET_GROUP;

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

    if (!utils.getTask(task.id)) {
        return;
    }

    switch (xpEvent.type) {
        case 'task.finished':
        case 'task.removed':
        case 'task.failed':
            log.info('Task %s %s', task.id, task.state);
            utils.removeTask(task.id);
            break;
    }

    log.info('Task %s progress: %s', task.id, JSON.stringify(task.progress));
    webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(task));
}

/*    var xpEvent = {
          "type": "application",
          "timestamp": 1696515305453,
          "localOrigin": true,
          "distributed": false,
          "data": {
            "eventType": "PROGRESS",
            "applicationUrl": "https://repo.enonic.com/public/com/enonic/app/imagexpert/2.1.0/imagexpert-2.1.0.jar",
            "progress": 82
          }
      }*/
function handleXPAppEvent(xpEvent) {
    const app = xpEvent.data;

    log.info('App %s event: %s', app.id, JSON.stringify(xpEvent, null, 2));
    webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(app));
}


const submitTask = (key) => {
    const taskConfig = {
        descriptor: 'install-app',
        config: {key}
    };
    const taskId = taskLib.submitTask(taskConfig);
    log.info('Submitted task for %s: %s', key, taskId);
    return {
        taskId,
        key,
        url: '',
        progress: 0,
    };
};

const parseTemplate = () => {
    const apps = __.toNativeObject(bean.getTemplateApplications()).applications;
    log.info('Parsed template: %s', JSON.stringify(apps, null, 2));
    const tasks = [];
    for (let index = 0; index < apps.length; index++) {
        let app = apps[index];
        const existingApp = appLib.get({key: app.key});
        if (existingApp) {
            log.info('App %s already installed with version: %s', app.key, existingApp.version);
            continue;
        }

        if (app.config && app.config.length > 0) {
            const configPath = __.toNativeObject(bean.createConfigFile(app.key, app.config));
            log.info('Config file for app %s created at: %s', app.key, configPath);
        }

        tasks.push(submitTask(app.key));
    }
    utils.setCache(tasks);
}

function listenToTaskEvents() {
    if (!listening) {
        eventLib.listener({
            type: 'task.*',
            localOnly: false,
            callback: handleXPTaskEvent
        });
        eventLib.listener({
            type: 'application',
            localOnly: false,
            callback: handleXPAppEvent
        });
        listening = true;
        log.info('Welcome app is listening for task and app events...');
    }
}

exports.start = function () {
    listenToTaskEvents();
    parseTemplate();
}