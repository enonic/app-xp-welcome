const taskLib = require('/lib/xp/task');
const adminLib = require('/lib/xp/admin');
const httpClient = require('/lib/http-client');
const appLib = require('/lib/xp/app');

const marketUrl = 'https://market.enonic.com/api/graphql';
const xpMajorVersion = adminLib.getVersion().split('.')[0];

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

log.debug('XP major version: %s', xpMajorVersion);

exports.run = function (params, taskId) {
    const key = params.key;
    if (!key) {
        throw 'Missing required parameter: key';
    }

    taskLib.progress({info: 'Task started for ' + key, current: 0, total: 3});
    const appInfoJson = fetchApplicationInfo(marketUrl, key, xpMajorVersion);

    const latestVersionJson = findLatestVersion(key, appInfoJson.version, xpMajorVersion);
    const latestVer = latestVersionJson.versionNumber;
    taskLib.progress({info: 'Latest supported version for ' + key + ' is: ' + latestVer, current: 1, total: 3});

    const existingApp = appLib.get({key});
    if (existingApp) {
        if (compareVersions(latestVer, existingApp.version) <= 0) {
            const msg = `Application ${key} already installed with version: ${existingApp.version}`
            log.debug(msg);
            taskLib.progress({info: msg, current: 3, total: 3});
            return;
        } else {
            log.debug('Updating %s version %s to: %s', key, existingApp.version, latestVer);
        }
    } else {
        log.debug('Installing %s version: %s', key, latestVer);
    }

    taskLib.progress({info: 'Installing application ' + key + ' version: ' + latestVer, current: 2, total: 3});

    const tempUrl = tempDownloadUrl(appInfoJson, latestVersionJson);

    const appJson = installApplication(key, tempUrl /*latestVersionJson.applicationUrl*/, latestVersionJson.sha512);

    taskLib.progress({info: 'Task complete for ' + key, current: 3, total: 3, application: appJson});
};

function tempDownloadUrl(appJson, latestVersionObj) {

    const latestVersion = latestVersionObj.versionNumber;
    const appPath = appJson.identifier.split(".").join("/");
    const repoUrl = appJson.repoUrl.endsWith('/') ? appJson.repoUrl : appJson.repoUrl + '/';

    return `${repoUrl}${appPath}/${latestVersion}/${appJson.artifactId}-${latestVersion}.jar`;
}

function fetchApplicationInfo(marketUrl, key, xpMajorVersion) {
    const response = httpClient.request({
        url: marketUrl,
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache'
        },
        connectionTimeout: 20000,
        readTimeout: 5000,
        contentType: 'application/json',
        body: JSON.stringify({
            query: createMarketQuery(key, xpMajorVersion)
        })
    });

    if (response.status !== 200) {
        throw 'Failed to fetch data for application: ' + key;
    }

    const responseJson = JSON.parse(response.body);

    return responseJson.data.market.queryDsl[0].data;
}

function findLatestVersion(key, versions, xpMajorVersion) {
    let latestVersion = null;
    for (let i = 0; i < versions.length; i++) {
        const version = versions[i];
        if (supportsXpMajorVersion(version.supportedVersions, xpMajorVersion)) {
            if (!latestVersion ||
                compareVersions(version.versionNumber, latestVersion.versionNumber) > 0) {
                latestVersion = version;
            }
        }
    }
    if (!latestVersion) {
        throw 'No supported version of ' + key + ' found for XP ' + xpMajorVersion + '.*';
    }

    return latestVersion;
}

function installApplication(key, downloadUrl, sha256) {
    log.debug('Installing %s from: %s', key, downloadUrl);

    const installResultJson = __.toNativeObject(bean.installApplication(downloadUrl, sha256 || null));
    if (installResultJson.failure) {
        throw 'Failed to install application: ' + installResultJson.failure;
    } else {
        return installResultJson.getApplication();
    }
}

function compareVersions(a, b) {
    // Nashorn does not support localeCompare: a.localeCompare(b, 'en-US-u-kn-true', { numeric: true }) === 1;
    const aList = a.split('.');
    const aSize = aList.length;
    const bList = b.split('.');
    const bSize = bList.length;
    let result = 0;
    let intA, intB;
    for (let i = 0; i < Math.min(aSize, bSize); i++) {
        intA = parseInt(aList[i]);
        intB = parseInt(bList[i]);
        result = intA - intB;
        if (result !== 0) {
            break;
        }
    }
    if (result === 0) {
        // If the versions are equal, the shorter one is considered greater.
        result = bSize - aSize;
    }
    return result;
}

function supportsXpMajorVersion(versions, xpMajorVersion) {
    for (let i = 0; i < versions.length; i++) {
        if (versions[i].startsWith(xpMajorVersion + '.')) {
            return true;
        }
    }
    return false;
}

function createMarketQuery(key, xpMajorVersion) {
    return `{ 
        market { 
            queryDsl(
              first: 1,
              sort: {
                field: "data.version.versionNumber",
                direction: DESC     
              },
              query: {boolean: {must: [
                {term: {field: "type", value: { string:"com.enonic.app.market:application" }}}
                {term: {field: "data.identifier", value: { string:"${key}" }}}
                {like: {field: "data.version.supportedVersions", value:"${xpMajorVersion}.*" }}
              ]}}
            ) {
            ... on com_enonic_app_market_Application { 
                data { 
                    identifier 
                    repoUrl
                    artifactId
                    version {
                        sha512 
                        versionNumber 
                        supportedVersions 
                    }
                }
            }
        }}
    }`
}
