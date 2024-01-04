const taskLib = require('/lib/xp/task');
const eventLib = require('/lib/xp/event');
const webSocketLib = require('/lib/xp/websocket');
const appLib = require('/lib/xp/app');
const i18nLib = require('/lib/xp/i18n');
const SOCKET_GROUP = require('/lib/constants').SOCKET_GROUP;

let listening = false;

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');
const store = __.newBean('com.enonic.xp.app.welcome.StoreBean');

function handleXPTaskEvent(xpEvent) {
    const task = xpEvent.data;

    let cachedTask = __.toNativeObject(store.get(task.id));
    if (!cachedTask) {
        return;
    }

    switch (xpEvent.type) {
        case 'task.finished':
        case 'task.removed':
        case 'task.failed':
            store.remove(task.id);
            if (__.toNativeObject(store.size()) === 0) {
                deleteTemplateFile();
            }
            break;
    }
}

function deleteTemplateFile() {
    bean.deleteTemplateFile();
}

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
                taskId: undefined,    // not task as it was started by someone else
                displayName: i18nLib.localize({key: 'webapps.card.installing'}),
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
        return null;
    }

    const app = __.toNativeObject(bean.getInstalledApplication(key));
    if (!app) {
        return null;
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
        return null;
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
            continue;
        }

        if (app.config && app.config.length > 0) {
            bean.createConfigFile(app.key, app.config);
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
    }
}

function start() {
    listenToTaskEvents();
    parseTemplate();
}

start();
