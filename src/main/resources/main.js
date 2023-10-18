const taskLib = require('/lib/xp/task');
const eventLib = require('/lib/xp/event');
const webSocketLib = require('/lib/xp/websocket');
const appLib = require('/lib/xp/app');

const SOCKET_GROUP = 'welcome-app';
exports.SOCKET_GROUP = SOCKET_GROUP;

let listening = false;

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');
const store = __.newBean('com.enonic.xp.app.welcome.StoreBean');

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

    let cachedTask = __.toNativeObject(store.get(task.id));
    if (!cachedTask) {
        return;
    }

    switch (xpEvent.type) {
        case 'task.started':
            log.info('Task %s %s', task.id, task.state);
            break;
        case 'task.finished':
        case 'task.removed':
        case 'task.failed':
            log.info('Task %s %s. Removing...', task.id, task.state);
            store.remove(task.id);
            if (__.toNativeObject(store.size()) === 0) {
                log.info('All install tasks have finished');
                deleteTemplateFile();
            }
            break;
    }
}

function deleteTemplateFile() {
    const deleted = __.toNativeObject(bean.deleteTemplateFile());
    if (deleted) {
        log.debug('Deleted template file');
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

    let result;
    switch (data.eventType) {
        case 'PROGRESS':
            result = handleAppProgress(data);
            break;
        case 'INSTALLED':
            result = handleAppInstalled(data);
            break;
        case 'UNINSTALLED':
            result = handleAppUninstalled(data);
            break;
    }
    if (!result) {
        return;
    }

    if (result.taskId) {
        // only save tasks created by us
        store.put(result.taskId, result);
    }
    webSocketLib.sendToGroup(SOCKET_GROUP, JSON.stringify(result));
}

function handleAppProgress(data) {
    let cachedTask = __.toNativeObject(store.getByUrl(data.applicationUrl));
    if (cachedTask) {
        cachedTask.progress = data.progress;
    } else {
        // app is installed by someone else so we have no record of it in cache
        if (data.progress === 100) {
            // remove the placeholder on UI
            cachedTask = {
                taskId: undefined,
                url: data.applicationUrl,
                action: 'remove',
            }
        } else {
            cachedTask = {
                taskId: undefined,    // use url as taskId because we don't have one
                displayName: 'Installing...',
                key: undefined,
                url: data.applicationUrl,
                icon: bean.getDefaultApplicationIconAsBase64(),
                version: 0,
                progress: data.progress,
                adminToolsUrls: [],
            }
        }
    }
    return cachedTask;
}

function handleAppInstalled(data) {
    const key = data.applicationKey;
    if (!key) {
        return;
    }

    const app = __.toNativeObject(bean.getInstalledApplication(key));
    if (!app) {
        return;
    }

    return {
        taskId: undefined,
        displayName: app.displayName,
        key: app.applicationKey,
        url: app.url,
        icon: app.icon,
        version: app.version,
        progress: 100,
        adminToolsUrls: app.adminToolsUrls,
    }
}

function handleAppUninstalled(data) {
    const key = data.applicationKey;
    if (!key) {
        return;
    }

    return {
        taskId: undefined,
        key: data.applicationKey,
        action: 'remove',
    }
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
        displayName: '',
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
    for (let index = 0; index < apps.length; index++) {
        let app = apps[index];
        const existingApp = appLib.get({key: app.key});
        if (existingApp) {
            log.info('App %s already installed with version: %s', app.key, existingApp.version);
            continue;
        }

        if (app.config && app.config.length > 0) {
            const configPath = __.toNativeObject(bean.createConfigFile(app.key, app.config));
            if (configPath) {
                log.info('Config file for app %s created at: %s', app.key, configPath);
            } else {
                log.info('Config file for app %s already exists, kept user file.', app.key);
            }
        }

        const task = submitTask(app.key);
        store.put(task.taskId, task);
    }
    if (__.toNativeObject(store.size()) === 0) {
        deleteTemplateFile();
    }
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

function start() {
    listenToTaskEvents();
    parseTemplate();
}

start();
