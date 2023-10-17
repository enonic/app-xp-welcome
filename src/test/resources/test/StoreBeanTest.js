const assert = require('/lib/xp/testing');
const bean = __.newBean('com.enonic.xp.app.welcome.StoreBean');

const testData = {
    taskId: '123',
    key: 'com.enonic.app.test',
    displayName: 'Test App',
    url: 'http://localhost:8080',
    icon: 'data:icon',
    version: '1.0.0',
    progress: 17,
    adminToolsUrls: ['admin/tool/test/main'],
}

exports.testPutGet = function () {
    bean.clear();
    assert.assertEquals(0, bean.size());
    bean.put(testData.taskId, testData);
    assert.assertEquals(1, bean.size());

    const cachedData = __.toNativeObject(bean.get(testData.taskId));

    assert.assertNotNull(cachedData);
    assert.assertEquals(testData.taskId, cachedData.taskId);
    assert.assertEquals(testData.key, cachedData.key);
    assert.assertEquals(testData.displayName, cachedData.displayName);
    assert.assertEquals(testData.icon, cachedData.icon);
    assert.assertEquals(testData.url, cachedData.url);
    assert.assertEquals(testData.progress, cachedData.progress);
    assert.assertEquals(testData.version, cachedData.version);
    assert.assertEquals(testData.adminToolsUrls.length, cachedData.adminToolsUrls.length);
    assert.assertEquals(testData.adminToolsUrls[0], cachedData.adminToolsUrls[0]);
}

exports.testGetNotExists = function () {
    bean.clear();
    assert.assertEquals(0, bean.size());
    bean.put(testData.taskId, testData);
    assert.assertEquals(1, bean.size());

    const cachedData = __.toNativeObject(bean.get('not-existing-task-id'));

    assert.assertNull(cachedData);
}

exports.testGetByUrl = function () {
    bean.clear();
    assert.assertEquals(0, bean.size());
    bean.put(testData.taskId, testData);
    assert.assertEquals(1, bean.size());

    const cachedData = __.toNativeObject(bean.getByUrl(testData.url));

    assert.assertNotNull(cachedData);
    assert.assertEquals(testData.taskId, cachedData.taskId);
    assert.assertEquals(testData.key, cachedData.key);
    assert.assertEquals(testData.displayName, cachedData.displayName);
    assert.assertEquals(testData.icon, cachedData.icon);
    assert.assertEquals(testData.url, cachedData.url);
    assert.assertEquals(testData.progress, cachedData.progress);
    assert.assertEquals(testData.version, cachedData.version);
    assert.assertEquals(testData.adminToolsUrls.length, cachedData.adminToolsUrls.length);
    assert.assertEquals(testData.adminToolsUrls[0], cachedData.adminToolsUrls[0]);
}

exports.testGetByUrlNotExists = function () {
    bean.clear();
    assert.assertEquals(0, bean.size());
    bean.put(testData.taskId, testData);
    assert.assertEquals(1, bean.size());

    const cachedData = __.toNativeObject(bean.getByUrl('not-existing-url'));

    assert.assertNull(cachedData);
}

exports.testPutRemove = function () {
    bean.clear();
    assert.assertEquals(0, bean.size());
    bean.put(testData.taskId, testData);
    assert.assertEquals(1, bean.size());
    bean.remove(testData.taskId);
    assert.assertEquals(0, bean.size());
}
