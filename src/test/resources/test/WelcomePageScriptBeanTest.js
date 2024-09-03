const assert = require('/lib/xp/testing');
const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.getApplications = function () {
    const applications = __.toNativeObject(bean.getApplications());

    assert.assertEquals(3, applications.applications.length);

    const application1 = applications.applications[0];

    assert.assertNull(application1.deploymentUrl);
    assert.assertEquals('1.0.0', application1.version);
    assert.assertEquals('applicationKey', application1.applicationKey);
    assert.assertEquals(1, application1.adminToolsUrls.length);
    assert.assertEquals('admin/applicationKey/main', application1.adminToolsUrls[0]);
    assert.assertNotNull(application1.icon);

    const application2 = applications.applications[1];

    assert.assertNull(application2.deploymentUrl);
    assert.assertEquals('1.0.0', application2.version);
    assert.assertEquals('regularApplicationKey', application2.applicationKey);
    assert.assertEquals(0, application2.adminToolsUrls.length);
    assert.assertNotNull(application2.icon);

    const application3 = applications.applications[2];

    assert.assertEquals('/webapp/webApplicationKey', application3.deploymentUrl);
    assert.assertEquals('1.0.0', application3.version);
    assert.assertEquals('webApplicationKey', application3.applicationKey);
    assert.assertEquals(0, application3.adminToolsUrls.length);
    assert.assertNotNull(application3.icon);
};

exports.getTemplateApplications = function () {
    const applications = __.toNativeObject(bean.getTemplateApplications());

    assert.assertEquals(2, applications.applications.length);

    const application1 = applications.applications[0];

    assert.assertNull(application1.deploymentUrl);
    assert.assertEquals('key1', application1.key);
    assert.assertEquals('config1', application1.config);

    const application2 = applications.applications[1];

    assert.assertNull(application2.deploymentUrl);
    assert.assertEquals('key2', application2.key);
    assert.assertEquals('', application2.config);

};

exports.testGetInstalledApplication = function (key) {
    const app = __.toNativeObject(bean.getInstalledApplication(key));

    assert.assertNotNull(app);
    assert.assertEquals(key, app.applicationKey);
    assert.assertEquals(1, app.adminToolsUrls.length);
}

exports.testGetInstalledApplicationEmptyKey = function () {
    const app = __.toNativeObject(bean.getInstalledApplication(null));

    assert.assertNull(app);
}

exports.testGetDefaultApplicationIcon = function () {
    const icon = __.toNativeObject(bean.getDefaultApplicationIconAsBase64());

    assert.assertNotNull(icon);
    assert.assertTrue(icon.startsWith("data:"));
}

exports.getTemplateApplicationsWrongFormat = function () {
    const applications = __.toNativeObject(bean.getTemplateApplications());
    assert.assertEquals(0, applications.applications.length);
}

exports.createConfigFile = function (tempPath, separator) {
    const key = "com.enonic.app.test";
    assert.assertEquals(tempPath + separator + key + ".cfg", bean.createConfigFile(key, "foo=bar\nbar=baz"));
};

exports.createConfigFileAlreadyExists = function (key) {
    assert.assertEquals(null, bean.createConfigFile(key, "foo=bar\nbar=baz"));
};

exports.testGetConfigs = function (keys) {
    const configs = __.toNativeObject(bean.getConfigs()).configs;

    assert.assertEquals(keys.length, configs.length);

    keys.forEach(function (key, index) {
        assert.assertEquals(key.name, configs[index].name);
        assert.assertEquals(key.folder, configs[index].folder);
        assert.assertEquals(key.path, configs[index].path);
    });
}

exports.deleteTemplateFile = function () {
    assert.assertEquals(true, bean.deleteTemplateFile());
};

exports.deleteTemplateFileNotExists = function () {
    assert.assertEquals(false, bean.deleteTemplateFile());
};

exports.installApplication = function (app) {
    const result = __.toNativeObject(bean.installApplication("http://foo.com/app", null));
    assert.assertNull(result.failure);
    assert.assertNotNull( result.application);

    const installed = result.application;
    assert.assertEquals( app.key.toString(), installed.applicationKey );
    assert.assertEquals( app.displayName, installed.displayName );
}

exports.installApplicationException = function () {
    const result = __.toNativeObject(bean.installApplication("http://foo.com/app", null));
    assert.assertNotNull(result.failure);
    assert.assertNull(result.application);
}

exports.installApplicationWrongProtocol = function () {
    const result = __.toNativeObject(bean.installApplication("ftp://foo.com/app", null));
    assert.assertNotNull(result.failure);
    assert.assertNull(result.application);
}

exports.installApplicationBadUrl = function () {
    const result = __.toNativeObject(bean.installApplication("this is not an url", null));
    assert.assertNotNull(result.failure);
    assert.assertNull(result.application);
}

exports.getXpUrl = function () {
    assert.assertEquals('http://localhost:8080', bean.getXpUrl());
};

exports.getManagementApiUrl = function () {
    assert.assertEquals('http://localhost:4848', bean.getManagementApiUrl());
};

exports.getStatisticsApiUrl = function () {
    assert.assertEquals('http://localhost:2609', bean.getStatisticsApiUrl());
};

exports.getStatisticsApiUrlWithSpecifiedHost = function () {
    assert.assertEquals('http://192.168.1.1:2609', bean.getStatisticsApiUrl());
};

exports.getStatisticsApiUrlWithEmptyHost = function () {
    assert.assertEquals('http://localhost:2609', bean.getStatisticsApiUrl());
};

exports.getStatisticsApiUrlWithZeroHost = function () {
    assert.assertEquals('http://localhost:2609', bean.getStatisticsApiUrl());
};

exports.getContentStudioUrl = function () {
    assert.assertEquals('/admin/com.enonic.app.contentstudio/main', bean.getContentStudioUrl());
};

exports.canLoginAsSu = function () {
    assert.assertTrue(bean.canLoginAsSu());
};

exports.getSites = function () {
    const sites = __.toNativeObject(bean.getSites()).sites;

    assert.assertEquals(2, sites.length);

    const site0 = sites[0];
    const site1 = sites[1];

    assert.assertEquals('siteId1', site0.id);
    assert.assertEquals('test-site1', site0.name);
    assert.assertEquals('displayName1', site0.displayName);
    assert.assertEquals('custom', site0.projectName);
    assert.assertEquals('com.enonic.cms.custom', site0.repositoryName);
    assert.assertEquals('en', site0.language);
    assert.assertEquals('/parent/test-site1', site0.path);
    assert.assertTrue(site0.hasDraft);
    assert.assertFalse(site0.hasMaster);

    assert.assertEquals('siteId2', site1.id);
    assert.assertEquals('test-site2', site1.name);
    assert.assertEquals('displayName2', site1.displayName);
    assert.assertEquals('default', site1.projectName);
    assert.assertEquals('com.enonic.cms.default', site1.repositoryName);
    assert.assertNull(site1.language);
    assert.assertEquals('/parent/test-site2', site1.path);
    assert.assertTrue(site1.hasDraft);
    assert.assertTrue(site1.hasMaster);
};

exports.getProjects = function () {
    const projects = __.toNativeObject(bean.getProjects()).projects;

    assert.assertEquals(2, projects.length);

    const project1 = projects[0];
    assert.assertEquals('project1', project1.name);
    assert.assertEquals('displayName', project1.displayName);
    assert.assertEquals('description', project1.description);
    assert.assertNull(project1.parent);
    assert.assertNotNull(project1.icon);
    assert.assertTrue(project1.icon.startsWith('data:image/svg+xml; charset=utf-8;base64,'));

    const project2 = projects[1];
    assert.assertEquals('project2', project2.name);
    assert.assertEquals('displayName', project2.displayName);
    assert.assertEquals('description', project2.description);
    assert.assertEquals(project1.name, project2.parent);
    assert.assertNotNull(project2.icon);
    assert.assertTrue(project2.icon.startsWith('data:image/svg+xml; charset=utf-8;base64,'));
};
