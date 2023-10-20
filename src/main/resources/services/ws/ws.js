const webSocketLib = require('/lib/xp/websocket');
const SOCKET_GROUP = require('../../main').SOCKET_GROUP;


// Create a websocket if websocket request.
exports.get = function (req) {

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
};

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
