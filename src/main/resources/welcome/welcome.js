const admin = require('/lib/xp/admin');
const portal = require('/lib/xp/portal');
const i18nLib = require('/lib/xp/i18n');
const mustache = require('/lib/mustache');
const assetLib = require('/lib/enonic/asset');

const marketBean = __.newBean('com.enonic.xp.app.welcome.market.GetMarketConfigBean');

exports.get = function () {

    const view = resolve('./welcome.html');

    const phrases = i18nLib.getPhrases(admin.getLocales(), ['i18n/phrases']);

    const params = {
        assetsUri: assetLib.assetUrl({
            path: '',
            application: app.name,
        }),
        configServiceUrl: portal.serviceUrl({service: 'config'}),
        wsServiceUrl: portal.serviceUrl({service: 'ws', type: 'websocket'}),
        phrases,
    };

    const marketUrl = __.toNativeObject(marketBean.getMarketUrl());

    return {
        headers: {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" +
                " object-src 'none'; img-src 'self' " + marketUrl + " data:"
        },
        contentType: 'text/html',
        body: mustache.render(view, params),
    };
};
