const admin = require('/lib/xp/admin');
const portal = require('/lib/xp/portal');
const i18nLib = require('/lib/xp/i18n');
const mustache = require('/lib/mustache');
const main = require("../main");

exports.get = function () {

    const view = resolve('./welcome.html');

    const phrases = i18nLib.getPhrases(admin.getLocales(), ['i18n/phrases']);

    const params = {
        assetsUri: portal.assetUrl({
            path: '',
            application: app.name,
        }),
        configServiceUrl: portal.serviceUrl({service: 'config'}),
        wsServiceUrl: portal.serviceUrl({service: 'ws', type: 'websocket'}),
        phrases,
    };

    main.start();

    return {
        headers: {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'none'; img-src 'self' https://market.enonic.com https://market-qa.enonic.com data:"
        },
        contentType: 'text/html',
        body: mustache.render(view, params),
    };
};
