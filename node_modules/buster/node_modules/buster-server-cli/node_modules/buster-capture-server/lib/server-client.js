var bCore = require("buster-core");
var when = require("when");
var http = require("http");
var net = require("net");
var bCapServPubsubClient = require("./pubsub-client.js");
var bCapServSessionClient = require("./session-client.js");
var buster = require("buster");

module.exports = {
    create: function (port, host) {
        var instance = buster.create(this);
        instance.serverHost = host;
        instance.serverPort = port;

        instance._pubsubClient = bCapServPubsubClient.create({
            host: host,
            port: port
        });
        instance._pubsubClient.extend(instance);
        instance.connect = instance._connect;


        return instance;
    },

    _connect: function () {
        var deferred = when.defer();

        var socket = new net.Socket();
        socket.connect(this.serverPort, this.serverHost);

        socket.on("connect", function () {
            socket.destroy();
            this._pubsubClient.connect().then(deferred.resolve, deferred.reject);
        }.bind(this));

        socket.on("error", function (e) {
            deferred.reject(e);
        });

        return deferred.promise;
    },

    createSession: function (resourceSet, opts) {
        var self = this;
        var deferred = when.defer();
        opts = opts || {};

        this._getCachedResources(opts.cache).then(function (cache) {
            delete opts.cache;
            resourceSet.serialize(cache).then(function (serializedResourceSet) {
                self._sessionToServer(serializedResourceSet, opts, deferred);
            }, function (err) {
                deferred.reject(err);
            });
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    },

    clearCache: function () {
        var deferred = when.defer();

        var opts = {
            method: "DELETE",
            path: "/resources"
        };
        var req = this._request(opts, function (res, body) {
            deferred.resolve();
        });
        req.end();

        return deferred.promise;
    },

    _sessionToServer: function (serializedResourceSet, sessionOpts, deferred) {
        var opts = {
            method: "POST",
            path: "/sessions"
        };

        var req = this._request(opts, function (res, body) {
            try {
                body = JSON.parse(body)
            } catch (e) {
                body = {}
            }

            if (res.statusCode == 201) {
                var sessionClient = bCapServSessionClient._create(
                    body, this._pubsubClient
                );
                deferred.resolve(sessionClient);
            } else {
                deferred.reject(body);
            }
        }.bind(this));

        var sessionData = {};
        buster.extend(sessionData, sessionOpts);
        buster.extend(sessionData, {resourceSet: serializedResourceSet});


        req.end(JSON.stringify(sessionData));
    },

    _getCachedResources: function (performCache) {
        var deferred = when.defer();

        if (performCache) {
            var opts = {
                method: "GET",
                path: "/resources"
            };
            this._request(opts, function (res, body) {
                // deferred.resolve();
                deferred.resolve(JSON.parse(body));
            }).end();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    },

    _request: function (opts, cb) {
        opts.host = this.serverHost;
        opts.port = this.serverPort;

        return http.request(opts, function (res) {
            var body = "";
            res.setEncoding("utf8");
            res.on("data", function (chunk) { body += chunk; });
            res.on("end", function () { cb(res, body); });
        });
    }
};
