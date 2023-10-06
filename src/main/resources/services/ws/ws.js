const webSocketLib = require('/lib/xp/websocket');
const SOCKET_GROUP = require("../../main").SOCKET_GROUP;


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
                user: "test"
            },
            subProtocols: ["text"]
        }
    };
};

/*    const socketEvent = {
        "type": "message",
        "session": {
            "id": "7",
            "path": "/",
            "params": {},
            "user": {
                "key": "user:system:user",
                "displayName": "User",
                "modifiedTime": "1970-01-01T00:00:00Z",
                "disabled": false,
                "login": "usr",
                "idProvider": "system",
                "email": "email@example.com"
            }
        },
        "data": {
            "field": "value"
        },
        "error": "",
        "closeReason": 1000,
        "message": "Hello World"
    }*/
exports.webSocketEvent = function (socketEvent) {
    log.info('WS service got web event:\n%s', JSON.stringify(socketEvent));

    if (socketEvent.type === 'open' && socketEvent.data.user === 'test') {
        webSocketLib.addToGroup(SOCKET_GROUP, socketEvent.session.id);
    }

    if (socketEvent.type === 'message') {
        // events are sent on xp events
    }

    if (socketEvent.type === 'close') {
        webSocketLib.removeFromGroup(SOCKET_GROUP, socketEvent.session.id);
    }
};