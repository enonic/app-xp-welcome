const taskLib = require('/lib/xp/task');
const eventLib = require('/lib/xp/event');
const webSocketLib = require('/lib/xp/websocket');
const appLib = require('/lib/xp/app');
const store = require('/lib/store');

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

    let cachedTask = store.getTask(task.id);
    if (!cachedTask) {
        return;
    }

    switch (xpEvent.type) {
        case 'task.started':
            log.info('Task %s %s', task.id, task.state);
            break;
        case 'task.updated':
            if (task.progress.current === task.progress.total) {
                try {
                    const info = JSON.parse(task.progress.info);
                    if (info.adminToolsUrls) {
                        cachedTask.adminToolsUrls = info.adminToolsUrls;
                    }
                    if (info.icon) {
                        cachedTask.icon = info.icon;
                    }
                    webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(cachedTask));
                } catch (e) {
                    log.error('Failed to parse progress info: %s', task.progress.info);
                }
            }
            break;
        case 'task.finished':
        case 'task.removed':
        case 'task.failed':
            log.info('Task %s %s. Removing...', task.id, task.state);
            store.removeTask(task.id);
            break;
    }
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
    const data = xpEvent.data;

    log.debug('App event: %s', JSON.stringify(data));

    const cachedTask = store.getTask(function (task) {
        return task.url === data.applicationUrl;
    });
    if (!cachedTask) {
        log.warning('No cached task for data: %s', data.applicationUrl);
        return;
    }

    cachedTask.progress = data.progress;
    store.updateTask(cachedTask.taskId, cachedTask);

    webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(cachedTask));
}


const submitTask = (key, displayName) => {
    const taskConfig = {
        descriptor: 'install-app',
        config: {key}
    };
    const taskId = taskLib.submitTask(taskConfig);
    log.debug('Submitted task for %s: %s', key, taskId);
    return {
        taskId,
        displayName,
        key,
        url: '',
        icon: '',
        version: 0,
        progress: 0,
        adminToolsUrls: [],
    };
};

const parseTemplate = () => {
    const apps = __.toNativeObject(bean.getTemplateApplications()).applications;
    log.debug('Parsed template: %s', JSON.stringify(apps, null, 2));
    const tasks = [];
    for (let index = 0; index < apps.length; index++) {
        let app = apps[index];
        const existingApp = appLib.get({key: app.key});
        if (existingApp) {
            log.debug('App %s already installed with version: %s', app.key, existingApp.version);
            continue;
        }

        if (app.config && app.config.length > 0) {
            const configPath = __.toNativeObject(bean.createConfigFile(app.key, app.config));
            log.debug('Config file for app %s created at: %s', app.key, configPath);
        }

        tasks.push(submitTask(app.key, app.displayName));
    }
    store.setCache(tasks);
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
        log.debug('Welcome app is listening for task and app events...');
    }
}

exports.start = function () {
    listenToTaskEvents();
    parseTemplate();
}