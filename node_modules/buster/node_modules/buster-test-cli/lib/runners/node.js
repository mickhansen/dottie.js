var B = require("buster-core");
var test = require("buster-test");
var path = require("path");
var when = require("when");
var fs = require("fs");

// Error codes, as per FreeBSD's sysexit(3)
// Errors are mapped to sysexit(3) error codes wherever that makes sense
var EX_DATAERR = 65;
var EX_SOFTWARE = 70;

function writeManifest(fileName, manifests) {
    var manifest = B.extend.apply(B, manifests);
    fs.writeFileSync(fileName, JSON.stringify(manifest), "utf-8");
}

function cacheFile(config) {
    return B.tmpFile(path.join(config.rootPath, "buster-cache"));
}

function descriptiveRequire(file) {
    try {
        require(file);
    } catch (e) {
        var relative = file.replace(process.cwd(), ".");
        e.message = "Failed requiring " + relative + ": " + e.message;
        throw e;
    }
}

function readManifest(fileName, callback) {
    fs.readFile(fileName, "utf-8", function (err, contents) {
        try {
            callback(JSON.parse(contents));
        } catch (e) {
            callback({});
        }
    });
}

function processSection(config, section) {
    var d = when.defer();
    config.on("load:" + section, function (resourceSet) {
        readManifest(cacheFile(config), function (manifest) {
            var pd = resourceSet.process(manifest);
            when.chain(pd, d.resolver);
        });
    });
    return d.promise;
}

function manifestsGenerated(manifests) {
    if (!this.processDeferred) { return; }
    this.processDeferred.resolve(manifests);
    delete this.processDeferred;
}

function manifestsFailed(err) {
    if (!this.processDeferred) { return; }
    this.processDeferred.reject(err);
    delete this.processDeferred;
}

var testRun = {
    create: function (config, options, logger, done) {
        return B.extend(B.create(this), {
            config: config,
            options: options,
            logger: logger,
            callback: done
        });
    },

    configure: function () {
        if (this.options.captureConsole &&
            typeof B.captureConsole === "function") {
            B.captureConsole();
        }
    },

    start: function () {
        this.configure();
        try {
            var done = B.bind(this, "done");
            var hookResolution = this.beforeRunHook();
            var configResolution = this.config.resolve();
            configResolution.otherwise(done);

            when.all([hookResolution, configResolution]).
                then(function (values) {
                    this.runTests(values[1], values[0]);
                }.bind(this), done);
        } catch (e) {
            this.done(e);
        }
    },

    runTests: function (rs, manifests) {
        if (this.aborted) { return; }
        writeManifest(cacheFile(this.config), manifests);
        try {
            var runner = test.autoRun(this.options, {
                start: B.bind(this.config, "runExtensionHook", "testRun"),
                end: B.bind(this, "done", null)
            });
            test.testContext.on("create", runner);
            var fullPath = B.partial(path.join, rs.rootPath);
            rs.loadPath.paths().map(fullPath).forEach(descriptiveRequire);
        } catch (e) {
            e.code = EX_DATAERR;
            this.done(e);
        }
    },

    done: function (err) {
        if (!this.callback) { return; }
        if (err) {
            err.code = err.code || EX_SOFTWARE;
        }
        this.callback.apply(this, arguments);
        delete this.callback;
    },

    abort: function (err) {
        this.aborted = true;
        delete this.processDeferred;
        this.done(err);
    },

    beforeRunHook: function () {
        this.config.runExtensionHook("beforeRun");
        this.processDeferred = when.defer();
        var sections = ["libs", "sources", "testHelpers", "tests"];
        when.all(sections.map(B.partial(processSection, this.config))).then(
            B.bind(this, manifestsGenerated),
            B.bind(this, manifestsFailed)
        );
        return this.processDeferred.promise;
    }
};

module.exports = {
    testRun: testRun,

    create: function (options) {
        return B.create(this);
    },

    run: function (config, options, done) {
        var run = testRun.create(config, options, this.logger, done);
        run.start();
        return run;
    }
};
