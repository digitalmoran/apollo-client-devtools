!(function(e) {
  var n = {};
  function o(t) {
    if (n[t]) return n[t].exports;
    var s = (n[t] = { i: t, l: !1, exports: {} });
    return e[t].call(s.exports, s, s.exports, o), (s.l = !0), s.exports;
  }
  (o.m = e),
    (o.c = n),
    (o.d = function(e, n, t) {
      o.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: t,
        });
    }),
    (o.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(n, "a", n), n;
    }),
    (o.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (o.p = ""),
    o((o.s = 383));
})({
  383: function(e, n, o) {
    "use strict";
    var t = {};
    chrome.runtime.onConnect.addListener(function(e) {
      var n,
        o,
        s = void 0,
        c = void 0;
      +(o = e.name) + "" === o
        ? ((s = e.name),
          (c = "devtools"),
          (n = +e.name),
          chrome.tabs.executeScript(n, { file: "/dist/proxy.js" }, function(e) {
            e
              ? console.log("injected proxy to tab " + n)
              : t[n].devtools.postMessage("proxy-fail");
          }))
        : ((s = e.sender.tab.id), (c = "backend")),
        t[s] || (t[s] = { devtools: null, backend: null }),
        (t[s][c] = e),
        t[s].devtools &&
          t[s].backend &&
          (function(e, n, o) {
            function s(n) {
              if ("log" === n.event) return console.log("tab " + e, n.payload);
              console.log("devtools -> backend", n), o.postMessage(n);
            }
            function c(o) {
              if ("log" === o.event) return console.log("tab " + e, o.payload);
              console.log("backend -> devtools", o), n.postMessage(o);
            }
            function r() {
              console.log("tab " + e + " disconnected."),
                n.onMessage.removeListener(s),
                o.onMessage.removeListener(c),
                n.disconnect(),
                o.disconnect(),
                (t[e] = null);
            }
            n.onMessage.addListener(s),
              o.onMessage.addListener(c),
              n.onDisconnect.addListener(r),
              o.onDisconnect.addListener(r),
              console.log("tab " + e + " connected.");
          })(s, t[s].devtools, t[s].backend);
    });
  },
});
