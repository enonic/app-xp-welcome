const portal = require('/lib/xp/portal');
const i18nLib = require('/lib/xp/i18n');
const mustache = require('/lib/mustache');
const configLib = require('/lib/config');

const marketBean = __.newBean('com.enonic.xp.sdk.market.GetMarketConfigBean');

exports.get = function (req) {
    const view = resolve('./welcome.html');

    const phrases = i18nLib.getPhrases(req.locales, ['i18n/phrases']);

    const params = {
        assetsUri: `${portal.apiUrl({api: 'api'})}/_static`,
        configScriptId: configLib.generateScriptConfigId(),
        configAsJson: JSON.stringify(configLib.getConfig(req), null, 4).replace(/<(\/?script|!--)/gi, "\\u003C$1"),
        wsServiceUrl: `${portal.apiUrl({api: 'api', type: 'websocket'})}/ws`,
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
