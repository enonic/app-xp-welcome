const webSocketLib = require('/lib/xp/websocket');
const SOCKET_GROUP = require('/lib/constants').SOCKET_GROUP;
const staticLib = require('/lib/enonic/static');
const router = require('/lib/router')();

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

router.get('/ws', (req) => {
    if (!req.webSocket) {
        return {
            status: 404
        };
    }

    return {
        webSocket: {
            data: {
                user: "app-welcome"
            },
            subProtocols: ["text"]
        }
    };
});

exports.webSocketEvent = function (socketEvent) {
    if (socketEvent.type === 'open' && socketEvent.data.user === 'app-welcome') {
        webSocketLib.addToGroup(SOCKET_GROUP, socketEvent.session.id);
    }

    if (socketEvent.type === 'message') {
        // events are sent on xp events
    }

    if (socketEvent.type === 'close') {
        webSocketLib.removeFromGroup(SOCKET_GROUP, socketEvent.session.id);
    }
};
