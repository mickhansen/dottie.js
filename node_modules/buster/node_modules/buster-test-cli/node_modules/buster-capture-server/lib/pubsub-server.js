var buster = require("buster-core");
var faye = require("faye");
var bCapServPubsubClient = require("./pubsub-client");

var NOOP = function(){};

module.exports = buster.extend(buster.eventEmitter.create(), {
    logger: {error:NOOP,warn:NOOP,log:NOOP,info:NOOP,debug:NOOP},

    create: function (messagingContextPath) {
        var instance = buster.create(this);

        instance._fayeAdapter = new faye.NodeAdapter({mount: messagingContextPath, timeout: 1});
        instance._fayeAdapter.addExtension({
            incoming: function (message, callback) {
                logBayeuxMessage(instance.logger, "[BAYEUX IN ]", message)
                return callback(message);
            },

            outgoing: function (message, callback) {
                logBayeuxMessage(instance.logger, "[BAYEUX OUT]", message)
                return callback(message);
            }
        });

        instance._pubsubClients = {};
        instance._fayeAdapter.getClient().subscribe("/initialize/*", function (){});
        instance._fayeAdapter.addExtension({
            incoming: function (message, callback) {
                instance._onFayeMessage(message);
                callback(message);
            }
        });

        instance._fayeAdapter.bind("disconnect", function (fayeClientId) {
            instance._onFayeClientDisconnect(fayeClientId);
        });

        return instance;
    },

    createClient: function (contextPath) {
        return bCapServPubsubClient.create({
            _fayeClient: this._fayeAdapter.getClient(),
            contextPath: contextPath
        });
    },

    _onFayeMessage: function (message) {
        if (/^\/initialize/.test(message.channel)) {
            this._pubsubClients[message.data.id] = {
                fayeClientId: message.clientId
            };
        }
    },

    _onFayeClientDisconnect: function (fayeClientId) {
        for (var clientId in this._pubsubClients) {
            if (this._pubsubClients[clientId].fayeClientId == fayeClientId) {
                delete this._pubsubClients[clientId];
                this.emit("client:disconnect", clientId);
            }
        }
    },

    getClient: function () {
        return this._fayeAdapter.getClient();
    },

    attach: function (httpServer) {
        this._fayeAdapter.attach(httpServer);
    }
});

function logBayeuxMessage(logger, prefix, message) {
    if (message.channel == "/meta/connect") return;

    logger.debug(prefix, message.channel, message);
}
