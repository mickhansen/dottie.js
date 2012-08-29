var fs = require("fs");
var ejs = require("ejs");
var path = require("path");
var captureServer = require("buster-capture-server");
var userAgentParser = require("buster-user-agent-parser");
var resourceSet = require("ramp-resources").resourceSet;
var TEMPLATE_ROOT = path.join(__dirname, "../views");

function template(templateRoot, name, locals, callback) {
    var templatePath = path.join(templateRoot, name + ".ejs");
    fs.readFile(templatePath, "utf-8", function (err, data) {
        if (err) { throw err; }
        callback(ejs.render(data, { locals: locals }));
    });
}

function addHeader(templateRoot, masterOfPuppets) {
    template(templateRoot, "header", {}, function (string) {
        var rs = resourceSet.create();
        rs.addResource({ path: "/", content: string });
        masterOfPuppets.setHeader(80, rs);
    });
}

module.exports = {
    create: function (httpServer, options) {
        var server = Object.create(this);
        options = options || {};
        server.templateRoot = options.templateRoot || TEMPLATE_ROOT;
        server.captureServer = captureServer.createServer();
        server.captureServer.logger = options.logger;
        addHeader(server.templateRoot, server.captureServer);
        if (httpServer) { server.captureServer.attach(httpServer); }
        return server;
    },

    respond: function (req, res) {
        if (this.serveTemplate(req, res)) { return true; }
        return false;
    },

    serveTemplate: function (req, res) {
        if (req.url != "/") { return; }
        res.writeHead(200, { "Content-Type": "text/html" });
        var slaves = this.captureServer.slaves().map(function (slave) {
            var ua = userAgentParser.parse(slave.userAgent);
            ua.userAgent = slave.userAgent;
            return ua;
        });
        template(this.templateRoot, "index", {
            slaves: slaves
        }, function (string) {
            res.end(string);
        });
        return true;
    }
};
