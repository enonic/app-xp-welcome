const assert = require('/lib/xp/testing');
const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.getWebApps = function () {
  const webApps = __.toNativeObject(bean.getWebApps());

  assert.assertEquals(2, webApps.applications.length);

  const application1 = webApps.applications[0];

  assert.assertEquals('/webapp/webAppKey/', application1.deploymentUrl);
  assert.assertEquals('1.0.0', application1.version);
  assert.assertEquals('webAppKey', application1.applicationKey);
  assert.assertNotNull(application1.icon);

  const application2 = webApps.applications[1];

  assert.assertEquals('/webapp/webAppKey2/', application2.deploymentUrl);
  assert.assertEquals('1.0.0', application2.version);
  assert.assertEquals('webAppKey2', application2.applicationKey);
  assert.assertNotNull(application2.icon);
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

exports.getSites = function () {
  const sites = __.toNativeObject(bean.getSites()).sites;

  assert.assertEquals(2, sites.length);

  const site1 = sites[0];
  assert.assertEquals('displayName1', site1.displayName);
  assert.assertEquals('com.enonic.cms.default', site1.projectName);
  assert.assertEquals('default', site1.repositoryName);
  assert.assertEquals('en', site1.language);
  assert.assertEquals('test-site1', site1.path);
  assert.assertTrue(site1.hasDraft);
  assert.assertFalse(site1.hasMaster);

  const site2 = sites[1];
  assert.assertEquals('displayName2', site2.displayName);
  assert.assertEquals('com.enonic.cms.custom', site2.projectName);
  assert.assertEquals('custom', site2.repositoryName);
  assert.assertNull(site2.language);
  assert.assertEquals('test-site2', site2.path);
  assert.assertTrue(site2.hasDraft);
  assert.assertTrue(site2.hasMaster);
};
