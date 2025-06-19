const portal = require('/lib/xp/portal');
const i18nLib = require('/lib/xp/i18n');
const mustache = require('/lib/mustache');
const staticLib = require('/lib/enonic/static');
const router = require('/lib/router')();

const marketBean = __.newBean('com.enonic.xp.app.welcome.market.GetMarketConfigBean');

exports.all = function (req) {
    return router.dispatch(req);
};

router.get(`/_static/{path:.*}`, (req) => {
    return staticLib.requestHandler(
        req,
        {
            cacheControl: () => staticLib.RESPONSE_CACHE_CONTROL.SAFE,
            index: false,
            root: '/assets',
            relativePath: staticLib.mappedRelativePath('/_static'),
        }
    );
});

router.get('/', (req) => {
    const view = resolve('./welcome.html');

    const phrases = i18nLib.getPhrases(req.locales, ['i18n/phrases']);

    const params = {
        assetsUri: `/${app.name}/_static`,
        configServiceUrl: portal.apiUrl({api: 'config'}),
        wsServiceUrl: portal.apiUrl({api: 'ws', type: 'websocket'}),
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
});
