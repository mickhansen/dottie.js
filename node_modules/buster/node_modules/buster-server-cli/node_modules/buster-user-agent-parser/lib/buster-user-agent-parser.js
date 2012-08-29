if (typeof buster === "undefined") {
    var buster = {};
}

buster.userAgentParser = {
    parse: function (userAgent) {
        if (!userAgent || typeof userAgent !== "string") {
            return {};
        }

        var ua = {}, match;
        var regexp = /(Mozilla|Ubuntu|AppleWebKit)\/\d+\.\d+/g;
        var modified = userAgent.replace(regexp, "");

        match = modified.match(/(Navigator)\/(\d\.\d[^\s]+)/) ||
            modified.match(/([a-zA-Z]+)\/(\d+\.\d+[^\s]*)/);

        if (match) {
            ua.browser = match[1];
            ua.version = match[2];
        }

        if (!ua.browser || ua.browser === "Trident") {
            match = modified.match(/MSIE (\d+\.\d+[a-z]?)/);

            if (match) {
                ua.browser = "Internet Explorer";
                ua.version = /(\d)0$/.test(match[1]) ?
                    match[1].replace(/0$/, "") : match[1];
            }
        }

        if (ua.browser === "Navigator") {
            ua.browser = "Netscape";
        }

        if (ua.browser === "Opera") {
            ua.version = modified.match(/Version\/(\d+\.\d+[^\s]*)/)[1];
        }

        if (/Windows/.test(modified)) {
            ua.platform = "Windows";
        } else if (/iPad/.test(userAgent)) {
            ua.platform = "iPad";
        } else if (/iPhone/.test(userAgent)) {
            ua.platform = "iPhone";
        } else if (/Darwin/.test(modified) || /Mac OS/.test(modified)) {
            ua.platform = "OS X";
        } else if (/Android/.test(modified)) {
            ua.platform = "Android";
        } else {
            ua.platform = ua.browser === "Internet Explorer" ?
                "Windows" : "Linux";
        }

        // set more detailed information about the operating system
        // => ua.os

        var osMap = {
            'iPhone': {
                "OS X (iPhone)": [".*"],
                "OS X 10.5 (PPC / iPhone / Leopard)": ["PPC Mac OS X 10_5_2"]
            },
            'iPad': {
                "OS X (iPad)": [".*"]
            },
            'OS X': {
                // Intel OS X
                "OS X 10.4 (Tiger)": [" 10.4", "10_4_"],
                "OS X 10.5 (Leopard)": [" 10.5", "10_5_"],
                "OS X 10.6 (Snow Leopard)": [" 10.6", "10_6_"],
                "OS X 10.7 (Lion)": [" 10.7", "10_7_"],

                // PPC OS X (Generic)
                "OS (PPC)": ["PPC Mac OS"],
                "OS X (PPC)": ["PPC Mac OS X"],

                // PPC OS X (Specific)
                "OS X 10.4 (PPC / Tiger)": ["PPC Mac OS X 10_4_", "PPC Mac OS X 10.4"],

                // Misc
                "OS X / Darwin": ["Darwin"]
            },
            'Windows': {
                "Windows NT": ["WinNT4.0", "Windows NT 9.0", "Windows NT"],
                "Windows 95": ["Win95", "Windows 95"],
                "Windows 98": ["Win98", "Windows 98"],
                "Windows 2000": ["Windows NT 5.0", "Windows NT5.0", "Windows NT5"],
                "Windows ME": ["Win 9x"],
                "Windows XP": ["Windows NT 5.1"],
                "Windows Server 2003": ["Windows NT 5.2"],
                "Windows Vista": ["Windows NT 6.0"],
                "Windows 7": ["Windows NT 6.1"],
                "Windows 8": ["Windows NT 6.2"]
            },
            "Linux": {
                "Fedora 10": ["Fedora fc 10"],
                "Linux Mint 7 (Gloria)": ["Mint/7"],
                "Ubuntu 8.10 (Intrepid Ibex)": ["Ubuntu/8.10"],
                "Ubuntu 9.04 (Jaunty Jackalope)": ["Ubuntu/9.04"],
                "Ubuntu 9.10 (Karmic Koala)": ["Ubuntu/9.10"],
                "Ubuntu 10.10 (Maverick Meerkat)": ["Ubuntu/10.10"]
            },
            "Android": {
                "Android 0.x": ["Android 0."],
                "Android 1.x": ["Android 1."],
                "Android 2.x (Eclair)": ["Android 2."]
            }
        };

        for (var platform in osMap) {
            if (ua.platform == platform) {
                var osNamesRegExpMap = osMap[platform];

                for (var osName in osNamesRegExpMap) {
                    var osRegExps = osNamesRegExpMap[osName]

                    osRegExps.forEach(function(osRegExpString) {
                        var osRegExp = new RegExp(osRegExpString.toLowerCase());

                        if (osRegExp.test(userAgent.toLowerCase())) {
                            ua.os = osName;
                        }
                    })
                }
            }
        }

        if (!ua.os) {
            ua.os = ua.platform;
        }

        if (!ua.browser) {
            match = modified.match(/Seamonkey-(\d+[^\s\(]+)/);

            if (match) {
                ua.browser = "SeaMonkey";
                ua.version = match[1];
            } else if (/Safari/.test(modified)) {
                ua.browser = "Safari";
            } else if (/AppleWebKit/.test(userAgent)) {
                ua.browser = "Safari";
            }
        }

        if ((ua.browser === "Privoxy" ||
             ua.browser === "Version" ||
             ua.browser === "Firefox") && /AppleWebKit/.test(userAgent)) {
            ua.browser = "Safari";
        }

        if (ua.browser === "Safari") {
            var isMobileSafari = /Mobile.+Safari/.test(userAgent);
            var isIThing = /(iPhone|iPad)/.test(ua.platform);
            if (isMobileSafari || isIThing) {
                ua.browser = "Mobile Safari";
            }

            if (/Android/.test(userAgent)) {
                ua.browser = "Android WebKit";
            }

            match = userAgent.match(/Version\/([^\s]+)/);

            if (match) {
                ua.version = match[1];
            } else if (/AppleWebKit\/85/.test(userAgent) &&
                       /85\.8/.test(userAgent)) {
                ua.version = "1.0.3";
            } else if (/AppleWebKit\/85/.test(userAgent)) {
                ua.version = "1.0";
            } else if (/AppleWebKit\/124/.test(userAgent)) {
                ua.version = "1.2";
            } else if (/AppleWebKit\/125\.2/.test(userAgent)) {
                ua.version = "1.2.2";
            } else if (/AppleWebKit\/125\.5\./.test(userAgent)) {
                ua.version = "1.2.4";
            } else if (/AppleWebKit\/125\.[4-9]/.test(userAgent)) {
                ua.version = "1.2.3";
            } else if (/AppleWebKit\/312\.5/.test(userAgent)) {
                ua.version = "1.3.1";
            } else if (/AppleWebKit\/312\.8/.test(userAgent)) {
                ua.version = "1.3.2";
            } else if (/AppleWebKit\/312/.test(userAgent)) {
                ua.version = "1.3";
            } else if (/AppleWebKit\/412\.7/.test(userAgent)) {
                ua.version = "2.0.1";
            } else if (/AppleWebKit\/412/.test(userAgent)) {
                ua.version = "2.0";
            } else if (/AppleWebKit\/416\.1[1-2]/.test(userAgent)) {
                ua.version = "2.0.2";
            } else if (/AppleWebKit\/41(9|8\.[8-9])/.test(userAgent)) {
                ua.version = "2.0.4";
            } else if (/AppleWebKit\/41(8|7\.9)/.test(userAgent)) {
                ua.version = "2.0.3";
            }
        }

        if (ua.browser === "CrMo") {
            ua.browser = "Chrome";
        }

        return ua;
    }
};

if (typeof module === "object" && typeof require === "function") {
    module.exports = buster.userAgentParser;
}
