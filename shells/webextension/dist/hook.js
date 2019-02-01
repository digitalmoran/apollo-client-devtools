!(function(e) {
  var t = {};
  function o(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
  }
  (o.m = e),
    (o.c = t),
    (o.d = function(e, t, n) {
      o.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 192));
})({
  192: function(e, t, o) {
    "use strict";
    var n = o(193),
      r = o(194);
    if (document instanceof HTMLDocument) {
      var i = document.createElement("script");
      (i.textContent =
        ";(" + n.installHook.toString() + ')(window, "' + r.version + '")'),
        document.documentElement.appendChild(i),
        i.parentNode.removeChild(i);
    }
  },
  193: function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.installHook = function(e, t) {
        var o = {},
          n = {
            ApolloClient: null,
            actionLog: [],
            devToolsVersion: t,
            on: function(e, t) {
              (o[(e = "$" + e)] || (o[e] = [])).push(t);
            },
            once: function(e, t) {
              var n = e;
              (o[(e = "$" + e)] || (o[e] = [])).push(function e() {
                this.off(n, e);
                t.apply(this, arguments);
              });
            },
            off: function(e, t) {
              if (((e = "$" + e), arguments.length)) {
                var n = o[e];
                if (n)
                  if (t)
                    for (var r = 0, i = n.length; r < i; r++) {
                      var s = n[r];
                      if (s === t || s.fn === t) {
                        n.splice(r, 1);
                        break;
                      }
                    }
                  else o[e] = null;
              } else o = {};
            },
            emit: function(e) {
              var t = o[(e = "$" + e)];
              if (t)
                for (
                  var n = [].slice.call(arguments, 1),
                    r = 0,
                    i = (t = t.slice()).length;
                  r < i;
                  r++
                )
                  t[r].apply(this, n);
            },
          };
        Object.defineProperty(e, "__APOLLO_DEVTOOLS_GLOBAL_HOOK__", {
          get: function() {
            return n;
          },
        });
        var r = void 0,
          i = 0;
        r = setInterval(function() {
          i++ > 10 && clearInterval(r);
          e.__APOLLO_CLIENT__ &&
            ((n.ApolloClient = e.__APOLLO_CLIENT__),
            n.ApolloClient.__actionHookForDevTools(function(e) {
              var t = e.state,
                o = t.queries,
                r = t.mutations,
                i = e.dataWithOptimisticResults;
              n.actionLog.push({ queries: o, mutations: r, inspector: i });
            }),
            clearInterval(r));
        }, 1e3);
      });
  },
  194: function(e, t) {
    e.exports = {
      version: "2.1.6",
      author: "Apollo",
      name: "Apollo Client Developer Tools",
      short_name: "Apollo DevTools",
      description:
        "GraphQL debugging tools for Apollo Client in the Chrome developer console.",
      icons: {
        16: "imgs/logo64.png",
        48: "imgs/logo128.png",
        128: "imgs/logo400.png",
      },
      page_action: {},
      content_security_policy:
        "script-src 'self' 'unsafe-eval'; object-src 'self'",
      permissions: ["tabs", "http://*/*", "https://*/*"],
      devtools_page: "devtools-background.html",
      background: { scripts: ["dist/background.js"], persistent: !1 },
      web_accessible_resources: [
        "devtools.html",
        "devtools-background.html",
        "dist/backend.js",
      ],
      content_scripts: [
        {
          matches: ["<all_urls>"],
          js: ["dist/hook.js"],
          run_at: "document_start",
        },
      ],
      manifest_version: 2,
    };
  },
});
