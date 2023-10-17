const assert = require('/lib/xp/testing');
const bean = __.newBean('com.enonic.xp.app.welcome.market.GetMarketConfigBean');


exports.testGetGraphqlUrl = function (expected) {
    assert.assertEquals(expected, bean.getGraphqlUrl());
}

exports.testGetMarketUrl = function (expected) {
    assert.assertEquals(expected, bean.getMarketUrl());
}

exports.testGetMalformedMarketUrl = function () {
    assert.assertThrows(function () {
        bean.getMarketUrl()
    });
}
