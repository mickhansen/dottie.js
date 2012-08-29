(function () {
    buster.captureServer = buster.captureServer || {};
    buster.captureServer.prisonUtil = {
        addEventListener: function (element, event, handler) {
            if (element.addEventListener) {
                element.addEventListener(event, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + event, handler);
            }
        },

        removeEventListener: function (element, event, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(event, handler);
            } else if (element.detachEvent) {
                element.detachEvent("on" + event, handler);
            }
        },

        frame: function (element) {
            return {
                window: function () {
                    return element.contentWindow;
                },

                setSrc: function (src, onload) {
                    var wrappedHandler = function () {
                        buster.captureServer.prisonUtil
                            .removeEventListener(element, "load", wrappedHandler);
                        setTimeout(onload, 1);
                    };
                    buster.captureServer.prisonUtil
                        .addEventListener(element, "load", wrappedHandler);
                    element.src = src;
                }
            }
        }
    };
}());