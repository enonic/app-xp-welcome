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
    assert.assertEquals('admin/tool/applicationKey/main', application1.adminToolsUrls[0]);
    assert.assertNotNull(application1.icon);

    const application2 = applications.applications[1];

    assert.assertEquals('/webapp/webApplicationKey', application2.deploymentUrl);
    assert.assertEquals('1.0.0', application2.version);
    assert.assertEquals('webApplicationKey', application2.applicationKey);
    assert.assertEquals(0, application2.adminToolsUrls.length);
    assert.assertNotNull(application2.icon);

    const application3 = applications.applications[2];

    assert.assertNull(application3.deploymentUrl);
    assert.assertEquals('1.0.0', application3.version);
    assert.assertEquals('regularApplicationKey', application3.applicationKey);
    assert.assertEquals(0, application3.adminToolsUrls.length);
    assert.assertNotNull(application3.icon);
};

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
    assert.assertEquals('/admin/tool/com.enonic.app.contentstudio/main', bean.getContentStudioUrl());
};

exports.getSites = function () {
    const sites = __.toNativeObject(bean.getSites()).sites;

    assert.assertEquals(2, sites.length);

    const site1 = sites[0];
    assert.assertEquals('siteId1', site1.id);
    assert.assertEquals('test-site1', site1.name);
    assert.assertEquals('displayName1', site1.displayName);
    assert.assertEquals('default', site1.projectName);
    assert.assertEquals('com.enonic.cms.default', site1.repositoryName);
    assert.assertEquals('en', site1.language);
    assert.assertEquals('/parent/test-site1', site1.path);
    assert.assertTrue(site1.hasDraft);
    assert.assertFalse(site1.hasMaster);

    const site2 = sites[1];
    assert.assertEquals('siteId2', site2.id);
    assert.assertEquals('test-site2', site2.name);
    assert.assertEquals('displayName2', site2.displayName);
    assert.assertEquals('custom', site2.projectName);
    assert.assertEquals('com.enonic.cms.custom', site2.repositoryName);
    assert.assertNull(site2.language);
    assert.assertEquals('/parent/test-site2', site2.path);
    assert.assertTrue(site2.hasDraft);
    assert.assertTrue(site2.hasMaster);
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
