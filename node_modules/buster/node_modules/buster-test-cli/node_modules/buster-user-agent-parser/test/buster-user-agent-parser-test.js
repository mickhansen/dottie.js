/*jslint maxlen: 300 */
if (typeof module === "object" && typeof require === "function") {
    var buster = require("buster");
    buster.userAgentParser = require("../lib/buster-user-agent-parser");
}

(function () {
    var parser = buster.userAgentParser;
    var assert = buster.assert;

    buster.testCase("UserAgentParserTest", {
        "should return empty object for empty values and non-strings": function () {
            assert.equals(parser.parse(), {});
            assert.equals(parser.parse(""), {});
            assert.equals(parser.parse(undefined), {});
            assert.equals(parser.parse(null), {});
        },

        "should recognize Chrome 7 on Linux": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"), {
                platform: "Linux",
                os: "Linux",
                browser: "Chrome",
                version: "7.0.517.44"
            });
        },

        "should recognize Firefox 3.6 Linux": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.12) Gecko/20101027 Ubuntu/10.10 (maverick) Firefox/3.6.12"), {
                platform: "Linux",
                os: "Ubuntu 10.10 (Maverick Meerkat)",
                browser: "Firefox",
                version: "3.6.12"
            });
        },

        "should recognize Opera 11 Linux": function () {
            assert.equals(parser.parse("Opera/9.80 (X11; Linux i686; U; en) Presto/2.7.39 Version/11.00"), {
                platform: "Linux",
                os: "Linux",
                browser: "Opera",
                version: "11.00"
            });
        },

        "should recognize Shiretoko Linux": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b5pre) Gecko/20090424 Shiretoko/3.5b5pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5b5pre"
            });
        },

        "should recognize Shiretoko Windows": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1b5pre) Gecko/20090519 Shiretoko/3.5b5pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Shiretoko",
                version: "3.5b5pre"
            });
        },

        "should recognize various Shiretoko strings": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b4pre) Gecko/20090404 Shiretoko/3.5b4pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b4pre) Gecko/20090401 Ubuntu/9.04 (jaunty) Shiretoko/3.5b4pre"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b4pre) Gecko/20090405 Shiretoko/3.5b4pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1b4pre) Gecko/20090420 Shiretoko/3.5b4pre (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b4pre) Gecko/20090413 Shiretoko/3.5b4pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b4pre) Gecko/20090411 Shiretoko/3.5b4pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b4pre) Gecko/20090323 Shiretoko/3.5b4pre (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.5b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8pre) Gecko/20100112 Shiretoko/3.5.8pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5.8pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8pre) Gecko/20100110 Shiretoko/3.5.8pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5.8pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; ja; rv:1.9.1.6) Gecko/20091216 Shiretoko/3.5.6"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.5.6"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1.6) Gecko/20091222 Shiretoko/3.5.6 ( .NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Shiretoko",
                version: "3.5.6"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.5pre) Gecko/20091016 Shiretoko/3.5.5pre GTB6"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.5.5pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.5) Gecko/20100309 Ubuntu/9.04 (jaunty) Shiretoko/3.5.5"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Darwin i386; en-US; rv:1.9.1.4) Gecko/20100311 Shiretoko/3.5.5"), {
                platform: "OS X",
                os: "OS X / Darwin",
                browser: "Shiretoko",
                version: "3.5.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; zh-TW; rv:1.9.1.5) Gecko/20091106 Shiretoko/3.5.5 (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Shiretoko",
                version: "3.5.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.4pre) Gecko/20090921 Ubuntu/9.04 (jaunty) Shiretoko/3.5.4pre"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.4pre) Gecko/20090921 Ubuntu/8.10 (intrepid) Shiretoko/3.5.4pre"), {
                platform: "Linux",
                os: "Ubuntu 8.10 (Intrepid Ibex)",
                browser: "Shiretoko",
                version: "3.5.4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.3pre) Gecko/20090803 Ubuntu/9.04 (jaunty) Shiretoko/3.5.3pre (.NET CLR 3.5.30729)"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.3pre) Gecko/20090730 Ubuntu/9.04 (jaunty) Shiretoko/3.5.2"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.2) Gecko/20090803 Ubuntu/9.04 (jaunty) Shiretoko/3.5.2 FirePHP/0.3"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.2) Gecko/20090805 Shiretoko/3.5.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.5.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.1) Gecko/20090716 Ubuntu/9.04 (jaunty) Shiretoko/3.5.1"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.1pre) Gecko/20090701 Ubuntu/9.04 (jaunty) Shiretoko/3.5"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1) Gecko/20090701 Ubuntu/9.10 (karmic) Shiretoko/3.5"), {
                platform: "Linux",
                os: "Ubuntu 9.10 (Karmic Koala)",
                browser: "Shiretoko",
                version: "3.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1) Gecko/20090701 Linux Mint/7 (Gloria) Shiretoko/3.5"), {
                platform: "Linux",
                os: "Linux Mint 7 (Gloria)",
                browser: "Shiretoko",
                version: "3.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1) Gecko/20090630 Ubuntu/9.04 (jaunty) Shiretoko/3.5"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b4pre) Gecko/20090311 Ubuntu/9.04 (jaunty) Shiretoko/3.1b4pre"), {
                platform: "Linux",
                os: "Ubuntu 9.04 (Jaunty Jackalope)",
                browser: "Shiretoko",
                version: "3.1b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1b4pre) Gecko/20090311 Shiretoko/3.1b4pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Shiretoko",
                version: "3.1b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1b4pre) Gecko/20090307 Shiretoko/3.1b4pre (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Shiretoko",
                version: "3.1b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.1b4pre) Gecko/20090308 Shiretoko/3.1b4pre (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; bg-BG; rv:1.9.1b4pre) Gecko/20090307 Shiretoko/3.1b4pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b4pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b3pre) Gecko/20090109 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b3pre) Gecko/20081223 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b3pre) Gecko/20081222 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b3pre) Gecko/20090106 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b3pre) Gecko/20090105 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b3pre) Gecko/20081203 Shiretoko/3.1b3pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; pt-BR; rv:1.9.1b3pre) Gecko/20090103 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1b3pre) Gecko/20081207 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1b3pre) Gecko/20081204 Shiretoko/3.1b3pre (.NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1b3pre) Gecko/20090105 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1b3pre) Gecko/20090104 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; pl; rv:1.9.1b3pre) Gecko/20090205 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20090207 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20090121 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20090113 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20090102 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20081228 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20081221 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20081218 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20081212 Shiretoko/3.1b3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Shiretoko",
                version: "3.1b3pre"
            });
        },

        "should recognize SeaMonkey": function () {
            assert.equals(parser.parse("Seamonkey-1.1.13-1(X11; U; GNU Fedora fc 10) Gecko/20081112"), {
                platform: "Linux",
                os: "Fedora 10",
                browser: "SeaMonkey",
                version: "1.1.13-1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; Windows NT 5.2; rv:2.0b3pre) Gecko/20100803 SeaMonkey/2.1a3pre"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "SeaMonkey",
                version: "2.1a3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.3a4pre) Gecko/20100404 SeaMonkey/2.1a1pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.1a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; en-CA; rv:1.9.3a3pre) Gecko/20100312 SeaMonkey/2.1a1pre"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "SeaMonkey",
                version: "2.1a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.2pre) Gecko/20090723 SeaMonkey/2.0b2pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0b2pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1b3pre) Gecko/20090302 SeaMonkey/2.0b1pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b4pre) Gecko/20090405 SeaMonkey/2.0b1pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; rv:1.9.1b4pre) Gecko/20090419 SeaMonkey/2.0b1pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; ru; rv:1.9.1b4pre) Gecko/20090419 SeaMonkey/2.0b1pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en; rv:1.9.1b4pre) Gecko/20090419 SeaMonkey/2.0b1pre"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b5pre) Gecko/20090428 SeaMonkey/2.0b1pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.9.1b4pre) Gecko/20090419 SeaMonkey/2.0b1pre"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "SeaMonkey",
                version: "2.0b1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.1pre) Gecko/20090717 SeaMonkey/2.0b1"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "SeaMonkey",
                version: "2.0b1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1b3pre) Gecko/20081208 SeaMonkey/2.0a3pre"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "SeaMonkey",
                version: "2.0a3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1b3pre) Gecko/20081208 SeaMonkey/2.0a3pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0a3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.9.2a1pre) Gecko/20081228 SeaMonkey/2.0a3pre"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "SeaMonkey",
                version: "2.0a3pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en-US; rv:1.9.1b3pre) Gecko/20090223 SeaMonkey/2.0a3"), {
                platform: "OS X",
                os: "OS X 10.4 (PPC / Tiger)",
                browser: "SeaMonkey",
                version: "2.0a3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.1b3pre) Gecko/20090223 SeaMonkey/2.0a3"), {
                platform: "OS X",
                os: "OS X 10.4 (Tiger)",
                browser: "SeaMonkey",
                version: "2.0a3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b1pre) Gecko/20080926001251 SeaMonkey/2.0a2pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.0a2pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.1b3pre) Gecko/20081202 SeaMonkey/2.0a2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0a2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081202 SeaMonkey/2.0a2"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "SeaMonkey",
                version: "2.0a2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; rv:1.9.1a2pre) Gecko/20080824052448 SeaMonkey/2.0a1pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.0a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9pre) Gecko/2008061501 SeaMonkey/2.0a1pre"), {
                platform: "Linux",
                os: "Linux",
                browser: "SeaMonkey",
                version: "2.0a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9b3pre) Gecko/2008010602 SeaMonkey/2.0a1pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9a6pre) Gecko/20070625 SeaMonkey/2.0a1pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0a1pre"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9a5pre) Gecko/20070529 SeaMonkey/2.0a1pre"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "SeaMonkey",
                version: "2.0a1pre"
            });
        },

        "should recognize Safari 1.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.7"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0"
            });
        },

        "should recognize Safari 1.0.3": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/85.8.2 (KHTML, like Gecko) Safari/85.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-gb) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/85.8.2 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85.8.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.8.5 (KHTML, like Gecko) Safari/85"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.8.2 (KHTML, like Gecko) Safari/85.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.0.3"
            });
        },

        "should recognize Safari 1.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/124 (KHTML, like Gecko) Safari/125.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/124 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/124 (KHTML, like Gecko) Safari/125.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/124 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2"
            });
        },

        "should recognize Safari 1.2.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es-es) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.7"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-gb) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.2 (KHTML, like Gecko) Safari/85.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.7"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.2 (KHTML, like Gecko) Safari/125.7"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.2"
            });
        },

        "should recognize Safari 1.2.3": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/125.5 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en_CA) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-au) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.4 (KHTML, like Gecko) Safari/100"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.4 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.3"
            });
        },

        "should recognize Safari 1.2.4": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/125.5.6 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.11"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-ch) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-ch) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.11"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.5.7 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.5.6 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.11"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.7 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.6 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.5.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.11"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.5.7 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.5.6 (KHTML, like Gecko) Safari/125.12_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.5.6 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/125.5.5 (KHTML, like Gecko) Safari/125.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.2.4"
            });
        },

        "should recognize Safari 1.3": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.1.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.1 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-ch) AppleWebKit/312.1.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-ca) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.1 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.1.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.1.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-ch) AppleWebKit/312.1 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3"
            });
        },

        "should recognize Safari 1.3.1": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.5 (KHTML, like Gecko) Safari/312.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/312.5 (KHTML, like Gecko) Safari/312.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es-es) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.5 (KHTML, like Gecko) Safari/312.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/125"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/125.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.5 (KHTML, like Gecko) Safari/312.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.5.2 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.1"
            });
        },

        "should recognize Safari 1.3.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.8.1 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.3.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.8.1 (KHTML, like Gecko) Safari/312.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "1.3.2"
            });
        },

        "should recognize Safari 2.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS; pl-pl) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS; en-en) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es-ES) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en_US) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/412 (KHTML, like Gecko) Safari/412 Privoxy/3.0"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412.6.2 (KHTML, like Gecko) Safari/412.2.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412.6.2 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.6.2 (KHTML, like Gecko) Safari/412.2.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.6 (KHTML, like Gecko) Safari/412.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.6 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412 (KHTML, like Gecko) Safari/412"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0"
            });
        },

        "should recognize Safari 2.0.1": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/412.7 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.1"
            });
        },

        "should recognize Safari 2.0.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/416.11 (KHTML, like Gecko) Safari/312"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nb-no) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/416.12 (KHTML, like Gecko) Safari/412.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-ca) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/416.11 (KHTML, like Gecko) Safari/416.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/416.11 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/416.12 (KHTML, like Gecko) Safari/416.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.2"
            });
        },

        "should recognize Safari 2.0.3": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; tr-tr) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8_Adobe"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.9.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nb-no) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nb-no) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.9.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/417.9 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.9.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418 (KHTML, like Gecko) Safari/417.9.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.3"
            });
        },

        "should recognize Safari 2.0.4": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/418.9 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/418.9 (KHTML, like Gecko) Safari/"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; pt-pt) AppleWebKit/418.9.1 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; nl-nl) AppleWebKit/418.8 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/418.9.1 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ja-jp) AppleWebKit/418.9 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; it-it) AppleWebKit/418.9 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr) AppleWebKit/418.9.1 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fi-fi) AppleWebKit/418.8 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es-es) AppleWebKit/418.8 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en_CA) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/418.9 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/418.8 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/419 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418.9.1 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418.9 (KHTML, like Gecko) Safari/419.3"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418.9 (KHTML, like Gecko)"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "2.0.4"
            });
        },

        "should recognize Safari 2.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Ubuntu; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/2.2 Firefox/525.13"), {
                platform: "Linux",
                os: "Linux",
                browser: "Safari",
                version: "2.2"
            });
        },

        "should recognize Safari 3.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; sv-SE) AppleWebKit/523.13 (KHTML, like Gecko) Version/3.0 Safari/523.13"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; nl) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; da-DK) AppleWebKit/523.12.9 (KHTML, like Gecko) Version/3.0 Safari/523.12.9"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; pt) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; nl) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; tr-TR) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; sv) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; ru) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; pt-BR) AppleWebKit/525+ (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; pt-BR) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; pl-PL) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; pl-PL) AppleWebKit/523.12.9 (KHTML, like Gecko) Version/3.0 Safari/523.12.9"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; nl) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; nb) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; id) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; hr) AppleWebKit/522.11.3 (KHTML, like Gecko) Version/3.0 Safari/522.11.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; fr-FR) AppleWebKit/523.15 (KHTML, like Gecko) Version/3.0 Safari/523.15"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0"
            });
        },

        "should recognize Safari 3.0.1": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; fi) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; th) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; sv) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; nl) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/522.4.1+ (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en) AppleWebKit/522.12.1 (KHTML, like Gecko) Version/3.0.1 Safari/522.12.2"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Safari",
                version: "3.0.1"
            });
        },

        "should recognize Safari 3.0.2": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; nl) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; zh) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; en) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; nl) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; it) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; el) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; cs) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/522.11 (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/522+ (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/522.11 (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/522.11 (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522.11 (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.2"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522+ (KHTML, like Gecko) Version/3.0.2 Safari/522.12"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.2"
            });
        },

        "should recognize Safari 3.0.3": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; cs) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; sv) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; fr) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; de) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; da-DK) AppleWebKit/523.11.1+ (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; da) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; cs) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/523.6 (KHTML, like Gecko) Version/3.0.3 Safari/523.6"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/523.3+ (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; ca-es) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ru-ru) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-us) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/523.9+ (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/523.5+ (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/523.2+ (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; de-de) AppleWebKit/522.11.1 (KHTML, like Gecko) Version/3.0.3 Safari/522.12.1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.3"
            });
        },

        "should recognize Safari 3.0.4": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i386; en-GB; rv:1.8.1.7) AppleWebKit (KHTML, like Gecko) (KHTML, like Gecko) Gecko/20070914 Firefox/2.0.0.11 Version/3.0.4 Safari/523.11"), {
                platform: "Linux",
                os: "Linux",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en) AppleWebKit/525+ (KHTML, like Gecko) Version/3.0.4 Safari/523.11"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; sv-se) AppleWebKit/523.12.2 (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_4; en-us) AppleWebKit/525.18 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; en) AppleWebKit/525.3+ (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X 10.4 (PPC / Tiger)",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; sv-se) AppleWebKit/523.12.2 (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; sv-se) AppleWebKit/523.10.6 (KHTML, like Gecko) Version/3.0.4 Safari/523.10.6"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; sv-se) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ko-kr) AppleWebKit/523.15.1 (KHTML, like Gecko) Version/3.0.4 Safari/523.15"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ja-jp) AppleWebKit/523.12.2 (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ja-jp) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; it-it) AppleWebKit/523.12.2 (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; it-it) AppleWebKit/523.10.6 (KHTML, like Gecko) Version/3.0.4 Safari/523.10.6"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; fr-fr) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; fr) AppleWebKit/523.12.2 (KHTML, like Gecko) Version/3.0.4 Safari/523.12.2"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; es-es) AppleWebKit/523.15.1 (KHTML, like Gecko) Version/3.0.4 Safari/523.15"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-us) AppleWebKit/525.1+ (KHTML, like Gecko) Version/3.0.4 Safari/523.10"), {
                platform: "OS X",
                os: "OS X",
                browser: "Safari",
                version: "3.0.4"
            });
        },

        "should recognize Safari 3.1": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.2; ru-RU) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13.3"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; da-DK) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13.3"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_4; en-us) AppleWebKit/525.18 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-gb) AppleWebKit/526+ (KHTML, like Gecko) Version/3.1 Safari/525.9"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-gb) AppleWebKit/526+ (KHTML, like Gecko) Version/3.1 iPhone"), {
                platform: "iPhone",
                os: "OS X 10.5 (PPC / iPhone / Leopard)",
                browser: "Mobile Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; nl-nl) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.4 (PPC / Tiger)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-us) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; pt-br) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; it-it) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; fr-fr) AppleWebKit/525.9 (KHTML, like Gecko) Version/3.1 Safari/525.9"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; es-es) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-us) AppleWebKit/526.1+ (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-us) AppleWebKit/525.9 (KHTML, like Gecko) Version/3.1 Safari/525.9"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-us) AppleWebKit/525.7 (KHTML, like Gecko) Version/3.1 Safari/525.7"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-gb) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-au) AppleWebKit/525.8+ (KHTML, like Gecko) Version/3.1 Safari/525.6"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "3.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_4_11; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13"), {
                platform: "OS X",
                os: "OS X 10.4 (Tiger)",
                browser: "Safari",
                version: "3.1"
            });
        },

        "should recognize Mobile Safari on iPhone": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_0_1 like Mac OS X; fr-fr) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5G77 Safari/525.20"), {
                platform: "iPhone",
                os: "OS X (iPhone)",
                browser: "Mobile Safari",
                version: "3.1.1"
            });
        },

        "should recognize iPad": function () {
            assert.equals(parser.parse("Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc"), {
                platform: "iPad",
                os: "OS X (iPad)",
                browser: "Mobile Safari",
                version: "4.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10"), {
                platform: "iPad",
                os: "OS X (iPad)",
                browser: "Mobile Safari",
                version: "4.0.4"
            });
        },

        "should recognize Safari 5.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux x86_64; en-ca) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+"), {
                platform: "Linux",
                os: "Linux",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; ja-JP) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; es-ES) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; ja-JP) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; fr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.4 (PPC / Tiger)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; zh-cn) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; ru-ru) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; ko-kr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; it-it) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us) AppleWebKit/534.1+ (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-au) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; el-gr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; ca-es) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.6 (Snow Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; zh-tw) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; it-it) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; fr-fr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; es-es) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16"), {
                platform: "OS X",
                os: "OS X 10.5 (Leopard)",
                browser: "Safari",
                version: "5.0"
            });
        },

        "should recognize the Android browser": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Android 1.1; en-gb; dream) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2"), {
                platform: "Android",
                os: "Android 1.x",
                browser: "Android WebKit",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Android 1.0; en-us; generic) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2"), {
                platform: "Android",
                os: "Android 1.x",
                browser: "Android WebKit",
                version: "3.0.4"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17"), {
                platform: "Android",
                os: "Android 2.x (Eclair)",
                browser: "Android WebKit",
                version: "4.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+ (KHTML, like Gecko) Safari/419.3"), {
                platform: "Android",
                os: "Android 0.x",
                browser: "Android WebKit",
                version: "419.3"
            });
        },

        "should recognize Chrome for Android": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7"), {
                platform: "Android",
                os: "Android",
                browser: "Chrome",
                version: "16.0.912.75"
            });
        },

        "should recognize Firefox for Android": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Android; Linux armv7l; rv:10.0) Gecko/20120129 Firefox/10.0 Fennec/10.0"), {
                platform: "Android",
                os: "Android",
                browser: "Firefox",
                version: "10.0"
            });
        },

        "should recognize Phoenix browser": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Linux",
                os: "Linux",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.4a) Gecko/20030411 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.4a) Gecko/20030403 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.3a) Gecko/20030105 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Phoenix",
                version: "0.5"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.3a) Gecko/20030101 Phoenix/0.5"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Phoenix",
                version: "0.5"
            });
        },

        "should recognize Netscape": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.8pre) Gecko/20070928 Firefox/2.0.0.7 Navigator/9.0RC1"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Netscape",
                version: "9.0RC1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.8.1.8pre) Gecko/20070928 Firefox/2.0.0.7 Navigator/9.0RC1"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "9.0RC1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.1.8pre) Gecko/20071001 Firefox/2.0.0.7 Navigator/9.0RC1"), {
                platform: "OS X",
                os: "OS X",
                browser: "Netscape",
                version: "9.0RC1"
            });
        },

        "should recognize old Netscape": function () {
            assert.equals(parser.parse("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4) Gecko/20030624 Netscape/7.1"), {
                platform: "Linux",
                os: "Linux",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; fr-FR; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-CA; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE; rv:1.4) Gecko/20030619 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; de-DE; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.0; de-DE; rv:1.4) Gecko/20030619 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; ja-JP; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.7.2) Gecko/20040804 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.4) Gecko Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; de-DE; rv:1.4) Gecko/20030619 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win95; en-US; rv:1.4) Gecko/20030624 Netscape/7.1"), {
                platform: "Windows",
                os: "Windows 95",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win 9x 4.90; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows ME",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win 9x 4.90; de-DE; rv:1.4) Gecko/20030619 Netscape/7.1 (ax)"), {
                platform: "Windows",
                os: "Windows ME",
                browser: "Netscape",
                version: "7.1"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.4) Gecko/20030624 Netscape/7.1"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Netscape",
                version: "7.1"
            });
        },

        "should recognize old Internet Explorer 9.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; Media Center PC 6.0; InfoPath.3; MS-RTC LM 8; Zune 4.7)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 4.0; InfoPath.3; MS-RTC LM 8; .NET4.0C; .NET4.0E)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 4.0; Tablet PC 2.0; InfoPath.3; .NET4.0C; .NET4.0E)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "9.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "9.0"
            });
        },

        "should recognize Internet Explorer 8.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.0; Trident/4.0; InfoPath.1; SV1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 3.0.04506.30)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.2; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"), {
                platform: "Windows",
                os: "Windows 8",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; Media Center PC 6.0; InfoPath.2; MS-RTC LM 8)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 3.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; msn OptimizedIE8;ZHCN)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MS-RTC LM 8; InfoPath.3; .NET4.0C; .NET4.0E) chromeframe/8.0.552.224"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MS-RTC LM 8; .NET4.0C; .NET4.0E; Zune 4.7; InfoPath.3)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MS-RTC LM 8)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; Zune 4.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; yie8)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; OfficeLiveConnector.1.3; OfficeLivePatch.0.0; Zune 3.0; MS-RTC LM 8)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; OfficeLiveConnector.1.3; OfficeLivePatch.0.0; MS-RTC LM 8; Zune 4.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; MS-RTC LM 8)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; FDM; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "8.0"
            });
        },

        "should recognize Internet Explorer 7.0b": function () {
            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.0.04506.30)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; Media Center PC 3.0; .NET CLR 1.0.3705; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; FDM; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; Alexa Toolbar; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; Alexa Toolbar)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.40607)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.0.3705; Media Center PC 3.1; Alexa Toolbar; .NET CLR 1.1.4322; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0b"
            });
        },

        "should recognize Internet Explorer 7.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; el-GR)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; c .NET CLR 3.0.04506; .NET CLR 3.5.30707; InfoPath.1; el-GR)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; c .NET CLR 3.0.04506; .NET CLR 3.5.30707; InfoPath.1; el-GR)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; fr-FR)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; en-US)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 5.2; WOW64; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.79 [en] (compatible; MSIE 7.0; Windows NT 5.0; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 1.1.4322; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Windows; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Mozilla/4.0; MSIE 7.0; Windows NT 5.1; FDM; SV1; .NET CLR 3.0.04506.30)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Mozilla/4.0; MSIE 7.0; Windows NT 5.1; FDM; SV1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible;MSIE 7.0;Windows NT 6.0)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MS-RTC LM 8; .NET4.0C; .NET4.0E; InfoPath.3)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)"), {
                platform: "Windows",
                os: "Windows 7",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0;)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; YPC 3.2.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; InfoPath.2; .NET CLR 3.5.30729; .NET CLR 3.0.30618)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; YPC 3.2.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; SLCC1; Media Center PC 5.0; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "7.0"
            });
        },

        "should recognize Internet Explorer 6.0": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4325)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/45.0 (compatible; MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.08 (compatible; MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.01 (compatible; MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 6.0)"), {
                platform: "Windows",
                os: "Windows Vista",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 5.2)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 5.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (MSIE 6.0; Windows NT 5.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible;MSIE 6.0;Windows 98;Q312461)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Compatible; Windows NT 5.1; MSIE 6.0) (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; U; MSIE 6.0; Windows NT 5.1)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "6.0"
            });
        },

        "should recognize Internet Explorer 5.5": function () {
            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.50; Windows NT; SiteKiosk 4.9; SiteCoach 1.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.50; Windows NT; SiteKiosk 4.8; SiteCoach 1.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.50; Windows NT; SiteKiosk 4.8)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.50; Windows 98; SiteKiosk 4.8)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.50; Windows 95; SiteKiosk 4.8)"), {
                platform: "Windows",
                os: "Windows 95",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible;MSIE 5.5; Windows 98)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5;)"), {
                platform: "Windows",
                os: "Windows",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (Compatible; MSIE 5.5; Windows NT5.0; Q312461; SV1; .NET CLR 1.1.4322; InfoPath.2)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT5)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.5)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.2; .NET CLR 1.1.4322; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; FDM)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.2; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1; SV1; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "5.5"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Internet Explorer",
                version: "5.5"
            });
        },

        "should recognize Internet Explorer 5.01": function () {
            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT; YComp 5.0.0.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT; Hotbar 4.1.8.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT; DigExt)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT; .NET CLR 1.0.3705)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.2.6; MSIECrawler)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.2.6; Hotbar 4.2.8.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.2.6; Hotbar 3.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.2.6)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.2.4)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.0.0; Hotbar 4.1.8.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; YComp 5.0.0.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; Wanadoo 5.6)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; Wanadoo 5.3; Wanadoo 5.5)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; Wanadoo 5.1)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; SV1; .NET CLR 1.1.4322; .NET CLR 1.0.3705; .NET CLR 2.0.50727)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; SV1)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; Q312461; T312461)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; Q312461)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; MSIECrawler)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.01"
            });
        },

        "should recognize Internet Explorer 5.0": function () {
            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.00; Windows 98)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0(compatible; MSIE 5.0; Windows 98; DigExt)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT;)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; YComp 5.0.2.6)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; YComp 5.0.2.5)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; YComp 5.0.0.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; Hotbar 4.1.8.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; Hotbar 3.0)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt; .NET CLR 1.0.3705)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.9; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows NT",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.2; .NET CLR 1.1.4322)"), {
                platform: "Windows",
                os: "Windows Server 2003",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.0)"), {
                platform: "Windows",
                os: "Windows 2000",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98;)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; YComp 5.0.2.4)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; Hotbar 3.0)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; DigExt; YComp 5.0.2.6; yplus 1.0)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; DigExt; YComp 5.0.2.6)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });

            assert.equals(parser.parse("Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; DigExt; YComp 5.0.2.5; YComp 5.0.0.0)"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Internet Explorer",
                version: "5.0"
            });
        },

        "should recognize Firebird 0.7": function () {
            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.6a) Gecko/20031002 Firebird/0.7"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Firebird",
                version: "0.7"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.5) Gecko/20031007 Firebird/0.7"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Firebird",
                version: "0.7"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE; rv:1.5) Gecko/20031007 Firebird/0.7"), {
                platform: "Windows",
                os: "Windows XP",
                browser: "Firebird",
                version: "0.7"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.5) Gecko/20031007 Firebird/0.7"), {
                platform: "Windows",
                os: "Windows 98",
                browser: "Firebird",
                version: "0.7"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Windows; U; Win95; en-US; rv:1.5) Gecko/20031007 Firebird/0.7"), {
                platform: "Windows",
                os: "Windows 95",
                browser: "Firebird",
                version: "0.7"
            });

            assert.equals(parser.parse("Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.5) Gecko/20031026 Firebird/0.7"), {
                platform: "OS X",
                os: "OS X (PPC)",
                browser: "Firebird",
                version: "0.7"
            });
        }
    });
}());
