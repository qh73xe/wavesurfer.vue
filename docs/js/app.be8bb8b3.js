(function(e) {
  function t(t) {
    for (
      var n, s, o = t[0], l = t[1], u = t[2], c = 0, h = [];
      c < o.length;
      c++
    )
      (s = o[c]),
        Object.prototype.hasOwnProperty.call(r, s) && r[s] && h.push(r[s][0]),
        (r[s] = 0);
    for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
    d && d(t);
    while (h.length) h.shift()();
    return i.push.apply(i, u || []), a();
  }
  function a() {
    for (var e, t = 0; t < i.length; t++) {
      for (var a = i[t], n = !0, s = 1; s < a.length; s++) {
        var l = a[s];
        0 !== r[l] && (n = !1);
      }
      n && (i.splice(t--, 1), (e = o((o.s = a[0]))));
    }
    return e;
  }
  var n = {},
    r = { app: 0 },
    i = [];
  function s(e) {
    return (
      o.p +
      "js/" +
      ({}[e] || e) +
      "." +
      { "chunk-2d22d746": "d9c70234" }[e] +
      ".js"
    );
  }
  function o(t) {
    if (n[t]) return n[t].exports;
    var a = (n[t] = { i: t, l: !1, exports: {} });
    return e[t].call(a.exports, a, a.exports, o), (a.l = !0), a.exports;
  }
  (o.e = function(e) {
    var t = [],
      a = r[e];
    if (0 !== a)
      if (a) t.push(a[2]);
      else {
        var n = new Promise(function(t, n) {
          a = r[e] = [t, n];
        });
        t.push((a[2] = n));
        var i,
          l = document.createElement("script");
        (l.charset = "utf-8"),
          (l.timeout = 120),
          o.nc && l.setAttribute("nonce", o.nc),
          (l.src = s(e));
        var u = new Error();
        i = function(t) {
          (l.onerror = l.onload = null), clearTimeout(c);
          var a = r[e];
          if (0 !== a) {
            if (a) {
              var n = t && ("load" === t.type ? "missing" : t.type),
                i = t && t.target && t.target.src;
              (u.message =
                "Loading chunk " + e + " failed.\n(" + n + ": " + i + ")"),
                (u.name = "ChunkLoadError"),
                (u.type = n),
                (u.request = i),
                a[1](u);
            }
            r[e] = void 0;
          }
        };
        var c = setTimeout(function() {
          i({ type: "timeout", target: l });
        }, 12e4);
        (l.onerror = l.onload = i), document.head.appendChild(l);
      }
    return Promise.all(t);
  }),
    (o.m = e),
    (o.c = n),
    (o.d = function(e, t, a) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (o.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (o.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          o.d(
            a,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return a;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = "/wavesurfer.vue/"),
    (o.oe = function(e) {
      throw (console.error(e), e);
    });
  var l = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    u = l.push.bind(l);
  (l.push = t), (l = l.slice());
  for (var c = 0; c < l.length; c++) t(l[c]);
  var d = u;
  i.push([0, "chunk-vendors"]), a();
})({
  0: function(e, t, a) {
    e.exports = a("56d7");
  },
  "475a": function(e, t, a) {
    "use strict";
    var n = a("b05e"),
      r = a.n(n);
    r.a;
  },
  "56d7": function(e, t, a) {
    "use strict";
    a.r(t);
    var n = {};
    a.r(n),
      a.d(n, "ajax", function() {
        return rt;
      }),
      a.d(n, "getId", function() {
        return it;
      }),
      a.d(n, "max", function() {
        return st;
      }),
      a.d(n, "min", function() {
        return ot;
      }),
      a.d(n, "Observer", function() {
        return nt;
      }),
      a.d(n, "style", function() {
        return lt;
      }),
      a.d(n, "requestAnimationFrame", function() {
        return ut;
      }),
      a.d(n, "frame", function() {
        return ct;
      }),
      a.d(n, "debounce", function() {
        return ht.a;
      }),
      a.d(n, "preventClick", function() {
        return pt;
      }),
      a.d(n, "fetchFile", function() {
        return mt;
      });
    a("e260"), a("e6cf"), a("cca6"), a("a79d");
    var r = a("2b0e"),
      i = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-app",
          [
            a("w-navigation-drawer"),
            a("w-app-bar"),
            a("v-main", [a("router-view")], 1)
          ],
          1
        );
      },
      s = [],
      o = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-app-bar",
          {
            attrs: {
              "clipped-left": e.$vuetify.breakpoint.lgAndUp,
              app: "",
              color: "primary",
              dark: ""
            }
          },
          [
            a("v-app-bar-nav-icon", {
              on: {
                click: function(t) {
                  t.stopPropagation(), (e.drawer = !e.drawer);
                }
              }
            }),
            a(
              "v-toolbar-title",
              { staticClass: "ml-0 pl-4", staticStyle: { width: "300px" } },
              [
                a("span", {
                  staticClass: "hidden-sm-and-down",
                  domProps: { textContent: e._s(e.$store.state.app_name) }
                })
              ]
            ),
            a("v-text-field", {
              staticClass: "hidden-sm-and-down",
              attrs: {
                flat: "",
                "solo-inverted": "",
                "hide-details": "",
                "prepend-inner-icon": "mdi-magnify",
                label: "Search"
              },
              model: {
                value: e.search,
                callback: function(t) {
                  e.search = t;
                },
                expression: "search"
              }
            }),
            a("v-spacer"),
            a(
              "v-btn",
              {
                attrs: { icon: "" },
                on: {
                  click: function(t) {
                    return e.$router.push({ name: "home" });
                  }
                }
              },
              [a("v-icon", [e._v("mdi-home")])],
              1
            ),
            a(
              "v-btn",
              { attrs: { icon: "", href: e.$store.state.github } },
              [a("v-icon", [e._v("mdi-github")])],
              1
            )
          ],
          1
        );
      },
      l = [],
      u =
        (a("ac1f"),
        a("841c"),
        {
          computed: {
            drawer: {
              get: function() {
                return this.$store.state.app_bar.drawer;
              },
              set: function(e) {
                this.$store.commit("app_bar/set_drawer", e);
              }
            },
            search: {
              get: function() {
                return this.$store.state.app_bar.search;
              },
              set: function(e) {
                this.$store.commit("app_bar/set_search", e);
              }
            }
          }
        }),
      c = u,
      d = a("2877"),
      h = a("6544"),
      f = a.n(h),
      p = a("40dc"),
      v = a("5bc1"),
      m = a("8336"),
      g = a("132d"),
      y = a("2fa4"),
      b = a("8654"),
      k = a("2a7f"),
      w = Object(d["a"])(c, o, l, !1, null, "4f8f7867", null),
      C = w.exports;
    f()(w, {
      VAppBar: p["a"],
      VAppBarNavIcon: v["a"],
      VBtn: m["a"],
      VIcon: g["a"],
      VSpacer: y["a"],
      VTextField: b["a"],
      VToolbarTitle: k["a"]
    });
    var P = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-navigation-drawer",
          {
            attrs: { clipped: e.$vuetify.breakpoint.lgAndUp, app: "" },
            model: {
              value: e.drawer,
              callback: function(t) {
                e.drawer = t;
              },
              expression: "drawer"
            }
          },
          [
            a(
              "v-list",
              { attrs: { dense: "" } },
              [
                e._l(e.items, function(t) {
                  return [
                    t.children
                      ? a(
                          "v-list-group",
                          {
                            key: t.text,
                            attrs: { "prepend-icon": t.icon },
                            scopedSlots: e._u(
                              [
                                {
                                  key: "activator",
                                  fn: function() {
                                    return [
                                      a(
                                        "v-list-item-content",
                                        [
                                          a("v-list-item-title", [
                                            e._v(
                                              " " +
                                                e._s(t.text.toUpperCase()) +
                                                " "
                                            )
                                          ])
                                        ],
                                        1
                                      )
                                    ];
                                  },
                                  proxy: !0
                                }
                              ],
                              null,
                              !0
                            )
                          },
                          e._l(t.children, function(t, n) {
                            return a(
                              "v-list-item",
                              {
                                key: n,
                                attrs: { link: "" },
                                on: {
                                  click: function(a) {
                                    return e.$router.push({ name: t.name });
                                  }
                                }
                              },
                              [
                                a(
                                  "v-list-item-action",
                                  [a("v-icon", [e._v(e._s(t.icon))])],
                                  1
                                ),
                                a(
                                  "v-list-item-content",
                                  [
                                    a("v-list-item-title", [
                                      e._v(
                                        " " + e._s(t.text.toUpperCase()) + " "
                                      )
                                    ])
                                  ],
                                  1
                                )
                              ],
                              1
                            );
                          }),
                          1
                        )
                      : a(
                          "v-list-item",
                          {
                            key: t.text,
                            attrs: { link: "" },
                            on: {
                              click: function(a) {
                                return e.$router.push({ name: t.name });
                              }
                            }
                          },
                          [
                            a(
                              "v-list-item-action",
                              [a("v-icon", [e._v(e._s(t.icon))])],
                              1
                            ),
                            a(
                              "v-list-item-content",
                              [
                                a("v-list-item-title", [
                                  e._v(" " + e._s(t.text.toUpperCase()) + " ")
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        )
                  ];
                })
              ],
              2
            )
          ],
          1
        );
      },
      x = [],
      E = (a("b0c0"), a("466d"), a("b85c")),
      S = {
        data: function() {
          return {
            items: [
              { icon: "mdi-home", text: "Home", name: "Home" },
              { icon: "mdi-help-circle", text: "About", name: "About" },
              { icon: "mdi-file-document", text: "Document", children: [] },
              { icon: "mdi-xml", text: "Example", children: [] }
            ]
          };
        },
        computed: {
          drawer: {
            get: function() {
              return this.$store.state.app_bar.drawer;
            },
            set: function(e) {
              this.$store.commit("app_bar/set_drawer", e);
            }
          }
        },
        mounted: function() {
          var e,
            t = Object(E["a"])(this.$router.options.routes);
          try {
            for (t.s(); !(e = t.n()).done; ) {
              var a = e.value;
              a.name.match(/docs-/)
                ? this.items[2].children.push(a)
                : a.name.match(/example-/) && this.items[3].children.push(a);
            }
          } catch (n) {
            t.e(n);
          } finally {
            t.f();
          }
        }
      },
      R = S,
      W = a("8860"),
      A = a("56b0"),
      _ = a("da13"),
      O = a("1800"),
      M = a("5d23"),
      T = a("f774"),
      j = Object(d["a"])(R, P, x, !1, null, "1abdbb86", null),
      L = j.exports;
    f()(j, {
      VIcon: g["a"],
      VList: W["a"],
      VListGroup: A["a"],
      VListItem: _["a"],
      VListItemAction: O["a"],
      VListItemContent: M["a"],
      VListItemTitle: M["c"],
      VNavigationDrawer: T["a"]
    });
    var $ = {
        name: "App",
        components: { WNavigationDrawer: L, WAppBar: C },
        data: function() {
          return {};
        }
      },
      B = $,
      D = a("7496"),
      V = a("f6c4"),
      I = Object(d["a"])(B, i, s, !1, null, null, null),
      N = I.exports;
    f()(I, { VApp: D["a"], VMain: V["a"] });
    var F = a("9483");
    Object(F["a"])("".concat("/wavesurfer.vue/", "service-worker.js"), {
      ready: function() {
        console.log(
          "App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"
        );
      },
      registered: function() {
        console.log("Service worker has been registered.");
      },
      cached: function() {
        console.log("Content has been cached for offline use.");
      },
      updatefound: function() {
        console.log("New content is downloading.");
      },
      updated: function() {
        console.log("New content is available; please refresh.");
      },
      offline: function() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error: function(e) {
        console.error("Error during service worker registration:", e);
      }
    });
    a("99af"), a("d3b7");
    var z = a("8c4f"),
      H = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "w-documentation-layout",
          { attrs: { heading: e.heading, desc: e.$vuetify.lang.t(e.desc) } },
          [
            a("v-data-table", {
              staticClass: "elevation-1",
              attrs: {
                headers: e.headers.map(function(t) {
                  return { text: e.$vuetify.lang.t(t.text), value: t.value };
                }),
                items: e.options,
                "items-per-page": -1,
                search: e.search
              }
            })
          ],
          1
        );
      },
      q = [],
      U = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-container",
          { staticClass: "grey lighten-2 fill-height", attrs: { fluid: "" } },
          [
            a(
              "v-row",
              [
                a(
                  "v-col",
                  [
                    a("w-jumbotron", {
                      attrs: { heading: e.heading, desc: e.desc }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            a("v-row", [a("v-col", [e._t("default")], 2)], 1)
          ],
          1
        );
      },
      G = [],
      Y = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a("section", { staticClass: "text-center" }, [
          a("h1", {
            staticClass: "font-weight-light headline",
            domProps: { textContent: e._s("" + e.heading) }
          }),
          e.desc
            ? a("span", { staticClass: "font-weight-light subtitle-1" }, [
                e._v(" " + e._s(e.desc) + " ")
              ])
            : e._e()
        ]);
      },
      X = [],
      J = {
        name: "WJumbotron.vue",
        props: {
          heading: { type: String, default: "" },
          desc: { type: String, default: "" }
        }
      },
      Z = J,
      K = Object(d["a"])(Z, Y, X, !1, null, "4a533e26", null),
      Q = K.exports,
      ee = {
        name: "WDocumentationLayout.vue",
        components: { WJumbotron: Q },
        props: { heading: { type: String }, desc: { type: String } }
      },
      te = ee,
      ae = a("62ad"),
      ne = a("a523"),
      re = a("0fd9"),
      ie = Object(d["a"])(te, U, G, !1, null, "5685e3c4", null),
      se = ie.exports;
    f()(ie, { VCol: ae["a"], VContainer: ne["a"], VRow: re["a"] });
    var oe = "$vuetify.document.options",
      le = {
        name: "Options.vue",
        components: { WDocumentationLayout: se },
        data: function() {
          return {
            locale: oe,
            heading: "wavesurfer.vue/documentation/options",
            desc: "".concat(oe, ".desc"),
            headers: [
              { text: "".concat(oe, ".headers.option"), value: "option" },
              { text: "".concat(oe, ".headers.type"), value: "type" },
              { text: "".concat(oe, ".headers.default"), value: "default" },
              {
                text: "".concat(oe, ".headers.description"),
                value: "description"
              }
            ],
            options: []
          };
        },
        computed: {
          search: {
            get: function() {
              return this.$store.state.app_bar.search;
            },
            set: function(e) {
              this.$store.commit("app_bar/set_search", e);
            }
          }
        },
        mounted: function() {
          this.options = [
            {
              option: "audioRate",
              type: "float",
              default: "1",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.audioRate")
              )
            },
            {
              option: "audioContext",
              type: "object",
              default: "{}",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.audioContext")
              )
            },
            {
              option: "audioScriptProcessor",
              type: "object",
              default: "{}",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.audioScriptProcessor")
              )
            },
            {
              option: "autoCenter",
              type: "boolean",
              default: "true",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.autoCenter")
              )
            },
            {
              option: "backend",
              type: "string",
              default: "WebAudio",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.backend")
              )
            },
            {
              option: "backgroundColor",
              type: "string",
              default: "none",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.backgroundColor")
              )
            },
            {
              option: "barGap",
              type: "number",
              default: "none",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.barGap")
              )
            },
            {
              option: "barHeight",
              type: "number",
              default: "1",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.barHeight")
              )
            },
            {
              option: "barMinHeight",
              type: "number",
              default: "null",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.barMinHeight")
              )
            },
            {
              option: "barRadius",
              type: "number",
              default: "0",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.barRadius")
              )
            },
            {
              option: "barWidth",
              type: "number",
              default: "none",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.barWidth")
              )
            },
            {
              option: "closeAudioContext",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.closeAudioContext")
              )
            },
            {
              option: "cursorColor",
              type: "string",
              default: "#333",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.cursorColor")
              )
            },
            {
              option: "cursorWidth",
              type: "integer",
              default: "1",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.cursorWidth")
              )
            },
            {
              option: "drawingContextAttributes",
              type: "object",
              default: "{desynchronized: true}",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.drawingContextAttributes")
              )
            },
            {
              option: "fillParent",
              type: "boolean",
              default: "true",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.fillParent")
              )
            },
            {
              option: "forceDecode",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.forceDecode")
              )
            },
            {
              option: "height",
              type: "integer",
              default: "128",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.height")
              )
            },
            {
              option: "hideScrollbar",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.hideScrollbar")
              )
            },
            {
              option: "interact",
              type: "boolean",
              default: "true",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.interact")
              )
            },
            {
              option: "loopSelection",
              type: "boolean",
              default: "true",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.loopSelection")
              )
            },
            {
              option: "maxCanvasWidth",
              type: "integer",
              default: "4000",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.maxCanvasWidth")
              )
            },
            {
              option: "mediaControls",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.mediaControls")
              )
            },
            {
              option: "mediaType",
              type: "string",
              default: "audio",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.mediaType")
              )
            },
            {
              option: "minPxPerSec",
              type: "integer",
              default: "50",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.minPxPerSec")
              )
            },
            {
              option: "normalize",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.normalize")
              )
            },
            {
              option: "partialRender",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.partialRender")
              )
            },
            {
              option: "pixelRatio",
              type: "integer",
              default: "window.devicePixelRatio",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.pixelRatio")
              )
            },
            {
              option: "progressColor",
              type: "string",
              default: "#555",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.progressColor")
              )
            },
            {
              option: "removeMediaElementOnDestroy",
              type: "boolean",
              default: "true",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.removeMediaElementOnDestroy")
              )
            },
            {
              option: "responsive",
              type: "boolean or float",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.responsive")
              )
            },
            {
              option: "scrollParent",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.scrollParent")
              )
            },
            {
              option: "skipLength",
              type: "float",
              default: "2",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.skipLength")
              )
            },
            {
              option: "splitChannels",
              type: "boolean",
              default: "false",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.splitChannels")
              )
            },
            {
              option: "waveColor",
              type: "string",
              default: "#999",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.waveColor")
              )
            },
            {
              option: "xhr",
              type: "Object",
              default: "{}",
              description: this.$vuetify.lang.t(
                "".concat(this.locale, ".options.xhr")
              )
            }
          ];
        }
      },
      ue = le,
      ce = a("8fea"),
      de = Object(d["a"])(ue, H, q, !1, null, "446a167c", null),
      he = de.exports;
    f()(de, { VDataTable: ce["a"] });
    var fe = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "w-documentation-layout",
          { attrs: { heading: e.heading, desc: e.desc } },
          [
            e.search.length > 0
              ? a(
                  "v-list",
                  { attrs: { "two-line": "" } },
                  e._l(
                    e.items.filter(function(t) {
                      return ~t[0].indexOf(e.search);
                    }),
                    function(t, n) {
                      return a(
                        "v-list-item",
                        { key: n },
                        [
                          a(
                            "v-list-item-content",
                            [
                              a("v-list-item-title", [e._v(e._s(t[0]))]),
                              a("v-list-item-subtitle", [e._v(e._s(t[1]))])
                            ],
                            1
                          )
                        ],
                        1
                      );
                    }
                  ),
                  1
                )
              : a(
                  "v-list",
                  { attrs: { "two-line": "" } },
                  e._l(e.items, function(t, n) {
                    return a(
                      "v-list-item",
                      { key: n },
                      [
                        a(
                          "v-list-item-content",
                          [
                            a("v-list-item-title", [e._v(e._s(t[0]))]),
                            a("v-list-item-subtitle", [e._v(e._s(t[1]))])
                          ],
                          1
                        )
                      ],
                      1
                    );
                  }),
                  1
                )
          ],
          1
        );
      },
      pe = [],
      ve = {
        name: "Methods.vue",
        components: { WDocumentationLayout: se },
        data: function() {
          return {
            heading: "wavesurfer.vue/documentation/methods",
            desc:
              'After creating an instance of the component (with ref="wavesurfer"), you can call the following methods on it:',
            items: [
              ["cancelAjax()", "Cancel the audio file loading process."],
              [
                "destroy()",
                "Removes events, elements and disconnects Web Audio nodes."
              ],
              [
                "empty()",
                "Clears the waveform as if a zero-length audio is loaded."
              ],
              [
                "getActivePlugins()",
                "Returns a map of plugin names that are currently initialised."
              ],
              [
                "getBackgroundColor()",
                "Returns the background color of the waveform container."
              ],
              ["getCurrentTime()", "Returns current progress in seconds."],
              [
                "getCursorColor()",
                "Returns the fill color of the cursor indicating the playhead position."
              ],
              [
                "getDuration()",
                "Returns the duration of an audio clip in seconds."
              ],
              [
                "getPlaybackRate()",
                "Returns the playback speed of an audio clip."
              ],
              [
                "getProgressColor()",
                "Returns the fill color of the waveform behind the cursor."
              ],
              ["getVolume()", "Returns the volume of the current audio clip."],
              ["getMute()", "Returns the current mute status."],
              ["getFilters()", "Returns an array of the current set filters."],
              [
                "getWaveColor()",
                "Returns the fill color of the waveform after the cursor."
              ],
              [
                "exportPCM(length, accuracy, noWindow, start)",
                "Exports PCM data into a JSON array. Optional parameters length [number] - default: 1024, accuracy [number] - default: 10000, noWindow [true|false] - default: false, start [number] - default: 0exportImage(format, quality, type)",
                "Return waveform image as data URI or Blob."
              ],
              [
                "isPlaying()",
                "Returns true if currently playing, false otherwise."
              ],
              [
                "load(url, peaks, preload)",
                "Loads audio from URL via XHR. Optional array of peaks. Optional preload parameter [none|metadata|auto], passed to the Audio element if using backend MediaElement."
              ],
              ["loadBlob(url)", "Loads audio from a Blob or File object."],
              [
                "on(eventName, callback)",
                "Subscribes to an event. See WaveSurfer Events for the list of all events."
              ],
              ["un(eventName, callback)", "Unsubscribes from an event."],
              ["unAll()", "Unsubscribes from all events."],
              ["pause()", "Stops playback."],
              [
                "play([start[, end]])",
                "Starts playback from the current position. Optional start and end measured in seconds can be used to set the range of audio to play."
              ],
              ["playPause()", "Plays if paused, pauses if playing."],
              [
                "seekAndCenter(progress)",
                "Seeks to a progress and centers view [0..1] (0 = beginning, 1 = end)."
              ],
              [
                "seekTo(progress)",
                "Seeks to a progress [0..1] (0 = beginning, 1 = end)."
              ],
              [
                "setBackgroundColor(color)",
                "Sets the background color of the waveform container."
              ],
              [
                "setCursorColor(color)",
                "Sets the fill color of the cursor indicating the playhead position."
              ],
              ["setHeight(height)", "Sets the height of the waveform."],
              [
                "setFilter(filters)",
                "For inserting your own WebAudio nodes into the graph. See Connecting Filters below."
              ],
              [
                "setPlaybackRate(rate)",
                "Sets the speed of playback (0.5 is half speed, 1 is normal speed, 2 is double speed and so on)."
              ],
              [
                "setPlayEnd(position)",
                "Sets set a point in seconds for playback to stop at."
              ],
              [
                "setVolume(newVolume)",
                "Sets the playback volume to a new value [0..1] (0 = silent, 1 = maximum)."
              ],
              [
                "setMute(mute)",
                "Mute the current sound. Can be a boolean value of true to mute sound or false to unmute"
              ],
              [
                "setProgressColor(color)",
                "Sets the fill color of the waveform behind the cursor."
              ],
              [
                "setWaveColor(color)",
                "Sets the fill color of the waveform after the cursor."
              ],
              [
                "skip(offset)",
                "Skip a number of seconds from the current position (use a negative value to go backwards)."
              ],
              ["skipBackward()", "Rewind skipLength seconds."],
              ["skipForward()", "Skip ahead skipLength seconds."],
              [
                "setSinkId(deviceId)",
                "Set the sink id to change audio output device."
              ],
              ["stop()", "Stops and goes to the beginning."],
              ["toggleMute()", "Toggles the volume on and off."],
              ["toggleInteraction()", "Toggle mouse interaction."],
              ["toggleScroll()", "Toggles scrollParent."],
              [
                "zoom(pxPerSec)",
                "Horizontally zooms the waveform in and out. The parameter is a number of horizontal pixels per second of audio. It also changes the parameter minPxPerSec and enables the scrollParent option."
              ]
            ]
          };
        },
        computed: {
          search: {
            get: function() {
              return this.$store.state.app_bar.search;
            },
            set: function(e) {
              this.$store.commit("app_bar/set_search", e);
            }
          }
        }
      },
      me = ve,
      ge = Object(d["a"])(me, fe, pe, !1, null, "0b195c49", null),
      ye = ge.exports;
    f()(ge, {
      VList: W["a"],
      VListItem: _["a"],
      VListItemContent: M["a"],
      VListItemSubtitle: M["b"],
      VListItemTitle: M["c"]
    });
    var be = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "w-documentation-layout",
          { attrs: { heading: e.heading, desc: e.$vuetify.lang.t(e.desc) } },
          [
            e.search.length > 0
              ? a(
                  "v-list",
                  { attrs: { "two-line": "" } },
                  e._l(
                    e.items.filter(function(t) {
                      return ~t[0].indexOf(e.search);
                    }),
                    function(t, n) {
                      return a(
                        "v-list-item",
                        { key: n },
                        [
                          a(
                            "v-list-item-content",
                            [
                              a("v-list-item-title", [e._v(e._s(t))]),
                              a("v-list-item-subtitle", [
                                e._v(
                                  " " +
                                    e._s(
                                      e.$vuetify.lang.t(
                                        e.locale + ".descs." + t
                                      )
                                    ) +
                                    " "
                                )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      );
                    }
                  ),
                  1
                )
              : a(
                  "v-list",
                  { attrs: { "two-line": "" } },
                  e._l(e.items, function(t, n) {
                    return a(
                      "v-list-item",
                      { key: n },
                      [
                        a(
                          "v-list-item-content",
                          [
                            a("v-list-item-title", [e._v(e._s(t))]),
                            a("v-list-item-subtitle", [
                              e._v(
                                " " +
                                  e._s(
                                    e.$vuetify.lang.t(e.locale + ".descs." + t)
                                  ) +
                                  " "
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    );
                  }),
                  1
                )
          ],
          1
        );
      },
      ke = [],
      we = "$vuetify.document.events",
      Ce = {
        name: "Events.vue",
        components: { WDocumentationLayout: se },
        data: function() {
          return {
            heading: "wavesurfer.vue/documentation/events",
            locale: we,
            desc: "".concat(we, ".desc"),
            items: [
              "audioprocess",
              "dblclick",
              "destroy",
              "error",
              "finish",
              "interaction",
              "loading",
              "mute",
              "pause",
              "play",
              "ready",
              "scroll",
              "seek",
              "volume",
              "waveform-ready",
              "zoom"
            ]
          };
        },
        computed: {
          search: {
            get: function() {
              return this.$store.state.app_bar.search;
            },
            set: function(e) {
              this.$store.commit("app_bar/set_search", e);
            }
          }
        }
      },
      Pe = Ce,
      xe = Object(d["a"])(Pe, be, ke, !1, null, "4ac49bef", null),
      Ee = xe.exports;
    f()(xe, {
      VList: W["a"],
      VListItem: _["a"],
      VListItemContent: M["a"],
      VListItemSubtitle: M["b"],
      VListItemTitle: M["c"]
    });
    var Se = "docs",
      Re = [
        {
          path: "/".concat(Se, "/options"),
          name: "".concat(Se, "-option"),
          text: "Options",
          component: he
        },
        {
          path: "/".concat(Se, "/methods"),
          name: "".concat(Se, "-methods"),
          text: "Methods",
          component: ye
        },
        {
          path: "/".concat(Se, "/events"),
          name: "".concat(Se, "-events"),
          text: "Events",
          component: Ee
        }
      ],
      We = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "w-example-layout",
          {
            attrs: {
              heading: e.title,
              desc: e.desc,
              template_code: e.template,
              script_code: e.code
            }
          },
          [
            a(
              "v-card",
              { staticClass: "mx-auto" },
              [
                a(
                  "v-system-bar",
                  { attrs: { color: "primary darken-2", dark: "" } },
                  [
                    a("v-spacer"),
                    a("v-icon", [e._v("mdi-window-minimize")]),
                    a("v-icon", [e._v("mdi-window-maximize")]),
                    a("v-icon", [e._v("mdi-close")])
                  ],
                  1
                ),
                a(
                  "v-toolbar",
                  { attrs: { color: "primary", dark: "" } },
                  [
                    a("v-app-bar-nav-icon"),
                    a("v-toolbar-title", [e._v("wave-furser")])
                  ],
                  1
                ),
                a(
                  "v-card-text",
                  [
                    a("v-file-input", {
                      attrs: { accept: "audio/*", label: "audio file" },
                      on: { change: e.onFileChange }
                    })
                  ],
                  1
                ),
                e.source
                  ? a("wave-surfer", {
                      ref: "wavesurfer",
                      attrs: { source: e.source, responsive: !0 },
                      on: {
                        play: e.onPlay,
                        pause: e.onPause,
                        destroy: e.onDestroy
                      }
                    })
                  : e._e(),
                e.source
                  ? a(
                      "v-card-actions",
                      [
                        a(
                          "v-btn",
                          {
                            attrs: { dark: "", icon: "", color: "primary" },
                            on: { click: e.skipBackward }
                          },
                          [
                            a("v-icon", { attrs: { dark: "" } }, [
                              e._v("mdi-skip-backward")
                            ])
                          ],
                          1
                        ),
                        a("v-spacer"),
                        a(
                          "v-btn",
                          {
                            attrs: { dark: "", icon: "", color: "primary" },
                            on: { click: e.playPause }
                          },
                          [
                            a("v-icon", { attrs: { dark: "" } }, [
                              e._v("mdi-play-pause")
                            ])
                          ],
                          1
                        ),
                        a(
                          "v-btn",
                          {
                            attrs: { dark: "", icon: "", color: "primary" },
                            on: { click: e.play }
                          },
                          [
                            a("v-icon", { attrs: { dark: "" } }, [
                              e._v("mdi-play")
                            ])
                          ],
                          1
                        ),
                        a(
                          "v-btn",
                          {
                            attrs: { dark: "", icon: "", color: "primary" },
                            on: { click: e.pause }
                          },
                          [
                            a("v-icon", { attrs: { dark: "" } }, [
                              e._v("mdi-pause")
                            ])
                          ],
                          1
                        ),
                        a("v-spacer"),
                        a(
                          "v-btn",
                          {
                            attrs: { dark: "", icon: "", color: "primary" },
                            on: { click: e.skipForward }
                          },
                          [
                            a("v-icon", { attrs: { dark: "" } }, [
                              e._v("mdi-skip-forward")
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : e._e(),
                a(
                  "v-snackbar",
                  {
                    model: {
                      value: e.snackbar.show,
                      callback: function(t) {
                        e.$set(e.snackbar, "show", t);
                      },
                      expression: "snackbar.show"
                    }
                  },
                  [e._v(" " + e._s(e.snackbar.text) + " ")]
                )
              ],
              1
            )
          ],
          1
        );
      },
      Ae = [],
      _e = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-container",
          { staticClass: "grey lighten-2 fill-height", attrs: { fluid: "" } },
          [
            a(
              "v-row",
              [
                a(
                  "v-col",
                  [
                    a("w-jumbotron", {
                      attrs: { heading: e.heading, desc: e.desc }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            a("v-row", [a("v-col", [e._t("default")], 2)], 1),
            a(
              "v-row",
              [
                a(
                  "v-col",
                  [
                    a(
                      "v-tabs",
                      {
                        attrs: { dark: "" },
                        model: {
                          value: e.tab,
                          callback: function(t) {
                            e.tab = t;
                          },
                          expression: "tab"
                        }
                      },
                      e._l(e.items, function(t) {
                        return a("v-tab", { key: t.tab }, [
                          e._v(" " + e._s(t.tab) + " ")
                        ]);
                      }),
                      1
                    ),
                    a(
                      "v-tabs-items",
                      {
                        model: {
                          value: e.tab,
                          callback: function(t) {
                            e.tab = t;
                          },
                          expression: "tab"
                        }
                      },
                      e._l(e.items, function(t) {
                        return a(
                          "v-tab-item",
                          {
                            key: t.tab,
                            staticClass: "overflow-y-auto",
                            staticStyle: { "max-height": "400px" }
                          },
                          [
                            "Template" == t.tab
                              ? a("w-code-heighlight", [
                                  e._v(" " + e._s(e.template_string) + " ")
                                ])
                              : e._e(),
                            "Script" == t.tab
                              ? a("w-code-heighlight", [
                                  e._v(" " + e._s(e.script_string) + " ")
                                ])
                              : e._e(),
                            "Style" == t.tab
                              ? a("w-code-heighlight", [
                                  e._v(" " + e._s(e.style_string) + " ")
                                ])
                              : e._e()
                          ],
                          1
                        );
                      }),
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        );
      },
      Oe = [],
      Me =
        (a("4de4"),
        a("a15b"),
        a("1276"),
        a("498a"),
        function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a("code-highlight", [e._t("default")], 2);
        }),
      Te = [],
      je = a("8695"),
      Le =
        (a("00e9"),
        {
          name: "WCode.vue",
          props: {},
          directives: {
            escapeContent: {
              bind: function(e) {
                console.log(e);
                var t = e.innerHTML;
                e.textContent = t;
              }
            }
          },
          components: { CodeHighlight: je["a"] }
        }),
      $e = Le,
      Be = (a("475a"), Object(d["a"])($e, Me, Te, !1, null, "9bd36aee", null)),
      De = Be.exports,
      Ve = {
        name: "WExampleLayout.vue",
        components: { WJumbotron: Q, WCodeHeighlight: De },
        data: function() {
          return {
            tab: null,
            items: [
              { tab: "Template", content: "template" },
              { tab: "Script", content: "script" },
              { tab: "Style", content: "style" }
            ]
          };
        },
        props: {
          heading: { type: String },
          desc: { type: String },
          template_code: { type: String, default: "" },
          script_code: { type: String, default: "" },
          style_code: { type: String, default: "" }
        },
        computed: {
          template_string: function() {
            if (0 == this.template_code.length) return "<template></template>";
            var e,
              t = [],
              a = Object(E["a"])(
                this.template_code.split("\n").filter(function(e) {
                  return e.trim().length > 0;
                })
              );
            try {
              for (a.s(); !(e = a.n()).done; ) {
                var n = e.value;
                t.push(n);
              }
            } catch (r) {
              a.e(r);
            } finally {
              a.f();
            }
            return "<template>\n".concat(t.join("\n"), "\n</template>");
          },
          script_string: function() {
            if (0 == this.script_code.length) return "<script></script>";
            var e,
              t = [],
              a = Object(E["a"])(
                this.script_code.split("\n").filter(function(e) {
                  return e.trim().length > 0;
                })
              );
            try {
              for (a.s(); !(e = a.n()).done; ) {
                var n = e.value;
                t.push(n);
              }
            } catch (r) {
              a.e(r);
            } finally {
              a.f();
            }
            return "<script>\n".concat(t.join("\n"), "\n</script>");
          },
          style_string: function() {
            if (0 == this.style_code.length) return "<style scoped></style>";
            var e,
              t = [],
              a = Object(E["a"])(
                this.style_code.split("\n").filter(function(e) {
                  return e.trim().length > 0;
                })
              );
            try {
              for (a.s(); !(e = a.n()).done; ) {
                var n = e.value;
                t.push(n);
              }
            } catch (r) {
              a.e(r);
            } finally {
              a.f();
            }
            return "<style scoped>\n".concat(t.join("\n"), "\n</style>");
          }
        }
      },
      Ie = Ve,
      Ne = a("71a3"),
      Fe = a("c671"),
      ze = a("fe57"),
      He = a("aac8"),
      qe = Object(d["a"])(Ie, _e, Oe, !1, null, "67d94f71", null),
      Ue = qe.exports;
    f()(qe, {
      VCol: ae["a"],
      VContainer: ne["a"],
      VRow: re["a"],
      VTab: Ne["a"],
      VTabItem: Fe["a"],
      VTabs: ze["a"],
      VTabsItems: He["a"]
    });
    var Ge = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a("div", { ref: "waveform", attrs: { id: "waveform" } });
      },
      Ye = [],
      Xe = (a("a9e3"), a("2909")),
      Je =
        (a("4160"),
        a("c975"),
        a("d81d"),
        a("7039"),
        a("b64b"),
        a("159b"),
        a("99de")),
      Ze = a("257e"),
      Ke = a("262e"),
      Qe = a("2caf"),
      et = a("ade3"),
      tt = a("d4ec"),
      at = a("bee2"),
      nt =
        (a("caad"),
        a("a434"),
        a("2532"),
        (function() {
          function e() {
            Object(tt["a"])(this, e),
              (this._disabledEventEmissions = []),
              (this.handlers = null);
          }
          return (
            Object(at["a"])(e, [
              {
                key: "on",
                value: function(e, t) {
                  var a = this;
                  this.handlers || (this.handlers = {});
                  var n = this.handlers[e];
                  return (
                    n || (n = this.handlers[e] = []),
                    n.push(t),
                    {
                      name: e,
                      callback: t,
                      un: function(e, t) {
                        return a.un(e, t);
                      }
                    }
                  );
                }
              },
              {
                key: "un",
                value: function(e, t) {
                  if (this.handlers) {
                    var a,
                      n = this.handlers[e];
                    if (n)
                      if (t)
                        for (a = n.length - 1; a >= 0; a--)
                          n[a] == t && n.splice(a, 1);
                      else n.length = 0;
                  }
                }
              },
              {
                key: "unAll",
                value: function() {
                  this.handlers = null;
                }
              },
              {
                key: "once",
                value: function(e, t) {
                  var a = this,
                    n = function n() {
                      for (
                        var r = arguments.length, i = new Array(r), s = 0;
                        s < r;
                        s++
                      )
                        i[s] = arguments[s];
                      t.apply(a, i),
                        setTimeout(function() {
                          a.un(e, n);
                        }, 0);
                    };
                  return this.on(e, n);
                }
              },
              {
                key: "setDisabledEventEmissions",
                value: function(e) {
                  this._disabledEventEmissions = e;
                }
              },
              {
                key: "_isDisabledEventEmission",
                value: function(e) {
                  return (
                    this._disabledEventEmissions &&
                    this._disabledEventEmissions.includes(e)
                  );
                }
              },
              {
                key: "fireEvent",
                value: function(e) {
                  for (
                    var t = arguments.length,
                      a = new Array(t > 1 ? t - 1 : 0),
                      n = 1;
                    n < t;
                    n++
                  )
                    a[n - 1] = arguments[n];
                  if (this.handlers && !this._isDisabledEventEmission(e)) {
                    var r = this.handlers[e];
                    r &&
                      r.forEach(function(e) {
                        e.apply(void 0, a);
                      });
                  }
                }
              }
            ]),
            e
          );
        })());
    function rt(e) {
      var t = new nt(),
        a = new XMLHttpRequest(),
        n = !1;
      return (
        a.open(e.method || "GET", e.url, !0),
        (a.responseType = e.responseType || "json"),
        e.xhr &&
          (e.xhr.requestHeaders &&
            e.xhr.requestHeaders.forEach(function(e) {
              a.setRequestHeader(e.key, e.value);
            }),
          e.xhr.withCredentials && (a.withCredentials = !0)),
        a.addEventListener("progress", function(e) {
          t.fireEvent("progress", e),
            e.lengthComputable && e.loaded == e.total && (n = !0);
        }),
        a.addEventListener("load", function(e) {
          n || t.fireEvent("progress", e),
            t.fireEvent("load", e),
            200 == a.status || 206 == a.status
              ? t.fireEvent("success", a.response, e)
              : t.fireEvent("error", e);
        }),
        a.addEventListener("error", function(e) {
          return t.fireEvent("error", e);
        }),
        a.send(),
        (t.xhr = a),
        t
      );
    }
    a("25f0");
    function it(e) {
      return (
        void 0 === e && (e = "wavesurfer_"),
        e +
          Math.random()
            .toString(32)
            .substring(2)
      );
    }
    function st(e) {
      var t = -1 / 0;
      return (
        Object.keys(e).forEach(function(a) {
          e[a] > t && (t = e[a]);
        }),
        t
      );
    }
    function ot(e) {
      var t = Number(1 / 0);
      return (
        Object.keys(e).forEach(function(a) {
          e[a] < t && (t = e[a]);
        }),
        t
      );
    }
    function lt(e, t) {
      return (
        Object.keys(t).forEach(function(a) {
          e.style[a] !== t[a] && (e.style[a] = t[a]);
        }),
        e
      );
    }
    var ut = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(e, t) {
        return setTimeout(e, 1e3 / 60);
      }
    ).bind(window);
    function ct(e) {
      return function() {
        for (var t = arguments.length, a = new Array(t), n = 0; n < t; n++)
          a[n] = arguments[n];
        return ut(function() {
          return e.apply(void 0, a);
        });
      };
    }
    var dt = a("b012"),
      ht = a.n(dt);
    function ft(e) {
      e.stopPropagation(), document.body.removeEventListener("click", ft, !0);
    }
    function pt(e) {
      document.body.addEventListener("click", ft, !0);
    }
    var vt = (function() {
      function e(t, a, n) {
        Object(tt["a"])(this, e),
          (this.instance = t),
          (this.instance._reader = n.body.getReader()),
          (this.total = parseInt(a, 10)),
          (this.loaded = 0);
      }
      return (
        Object(at["a"])(e, [
          {
            key: "start",
            value: function(e) {
              var t = this,
                a = function a() {
                  t.instance._reader
                    .read()
                    .then(function(n) {
                      var r = n.done,
                        i = n.value;
                      if (r)
                        return (
                          0 === t.total &&
                            t.instance.onProgress.call(t.instance, {
                              loaded: t.loaded,
                              total: t.total,
                              lengthComputable: !1
                            }),
                          void e.close()
                        );
                      (t.loaded += i.byteLength),
                        t.instance.onProgress.call(t.instance, {
                          loaded: t.loaded,
                          total: t.total,
                          lengthComputable: !(0 === t.total)
                        }),
                        e.enqueue(i),
                        a();
                    })
                    .catch(function(t) {
                      e.error(t);
                    });
                };
              a();
            }
          }
        ]),
        e
      );
    })();
    function mt(e) {
      if (!e) throw new Error("fetch options missing");
      if (!e.url) throw new Error("fetch url missing");
      var t = new nt(),
        a = new Headers(),
        n = new Request(e.url);
      (t.controller = new AbortController()),
        e &&
          e.requestHeaders &&
          e.requestHeaders.forEach(function(e) {
            a.append(e.key, e.value);
          });
      var r = e.responseType || "json",
        i = {
          method: e.method || "GET",
          headers: a,
          mode: e.mode || "cors",
          credentials: e.credentials || "same-origin",
          cache: e.cache || "default",
          redirect: e.redirect || "follow",
          referrer: e.referrer || "client",
          signal: t.controller.signal
        };
      return (
        fetch(n, i)
          .then(function(e) {
            t.response = e;
            var a = !0;
            e.body || (a = !1);
            var n = e.headers.get("content-length");
            return (
              null === n && (a = !1),
              a
                ? ((t.onProgress = function(e) {
                    t.fireEvent("progress", e);
                  }),
                  new Response(new ReadableStream(new vt(t, n, e)), i))
                : e
            );
          })
          .then(function(e) {
            var t;
            if (e.ok)
              switch (r) {
                case "arraybuffer":
                  return e.arrayBuffer();
                case "json":
                  return e.json();
                case "blob":
                  return e.blob();
                case "text":
                  return e.text();
                default:
                  t = "Unknown responseType: " + r;
                  break;
              }
            throw (t || (t = "HTTP error status: " + e.status), new Error(t));
          })
          .then(function(e) {
            t.fireEvent("success", e);
          })
          .catch(function(e) {
            t.fireEvent("error", e);
          }),
        (t.fetchRequest = n),
        t
      );
    }
    a("45fc"), a("3ca3"), a("ddb0");
    var gt = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e, n) {
          var r;
          return (
            Object(tt["a"])(this, a),
            (r = t.call(this)),
            (r.container = e),
            (r.params = n),
            (r.width = 0),
            (r.height = n.height * r.params.pixelRatio),
            (r.lastPos = 0),
            (r.wrapper = null),
            r
          );
        }
        return (
          Object(at["a"])(a, [
            {
              key: "style",
              value: function(e, t) {
                return lt(e, t);
              }
            },
            {
              key: "createWrapper",
              value: function() {
                (this.wrapper = this.container.appendChild(
                  document.createElement("wave")
                )),
                  this.style(this.wrapper, {
                    display: "block",
                    position: "relative",
                    userSelect: "none",
                    webkitUserSelect: "none",
                    height: this.params.height + "px"
                  }),
                  (this.params.fillParent || this.params.scrollParent) &&
                    this.style(this.wrapper, {
                      width: "100%",
                      overflowX: this.params.hideScrollbar ? "hidden" : "auto",
                      overflowY: "hidden"
                    }),
                  this.setupWrapperEvents();
              }
            },
            {
              key: "handleEvent",
              value: function(e, t) {
                !t && e.preventDefault();
                var a,
                  n = e.targetTouches ? e.targetTouches[0].clientX : e.clientX,
                  r = this.wrapper.getBoundingClientRect(),
                  i = this.width,
                  s = this.getWidth();
                return (
                  !this.params.fillParent && i < s
                    ? ((a =
                        (this.params.rtl ? r.right - n : n - r.left) *
                          (this.params.pixelRatio / i) || 0),
                      a > 1 && (a = 1))
                    : (a =
                        ((this.params.rtl ? r.right - n : n - r.left) +
                          this.wrapper.scrollLeft) /
                          this.wrapper.scrollWidth || 0),
                  a
                );
              }
            },
            {
              key: "setupWrapperEvents",
              value: function() {
                var e = this;
                this.wrapper.addEventListener("click", function(t) {
                  var a = e.wrapper.offsetHeight - e.wrapper.clientHeight;
                  if (0 !== a) {
                    var n = e.wrapper.getBoundingClientRect();
                    if (t.clientY >= n.bottom - a) return;
                  }
                  e.params.interact &&
                    e.fireEvent("click", t, e.handleEvent(t));
                }),
                  this.wrapper.addEventListener("dblclick", function(t) {
                    e.params.interact &&
                      e.fireEvent("dblclick", t, e.handleEvent(t));
                  }),
                  this.wrapper.addEventListener("scroll", function(t) {
                    return e.fireEvent("scroll", t);
                  });
              }
            },
            {
              key: "drawPeaks",
              value: function(e, t, a, n) {
                this.setWidth(t) || this.clearWave(),
                  this.params.barWidth
                    ? this.drawBars(e, 0, a, n)
                    : this.drawWave(e, 0, a, n);
              }
            },
            {
              key: "resetScroll",
              value: function() {
                null !== this.wrapper && (this.wrapper.scrollLeft = 0);
              }
            },
            {
              key: "recenter",
              value: function(e) {
                var t = this.wrapper.scrollWidth * e;
                this.recenterOnPosition(t, !0);
              }
            },
            {
              key: "recenterOnPosition",
              value: function(e, t) {
                var a = this.wrapper.scrollLeft,
                  n = ~~(this.wrapper.clientWidth / 2),
                  r = this.wrapper.scrollWidth - this.wrapper.clientWidth,
                  i = e - n,
                  s = i - a;
                if (0 != r) {
                  if (!t && -n <= s && s < n) {
                    var o = this.params.autoCenterRate;
                    (o /= n),
                      (o *= r),
                      (s = Math.max(-o, Math.min(o, s))),
                      (i = a + s);
                  }
                  (i = Math.max(0, Math.min(r, i))),
                    i != a && (this.wrapper.scrollLeft = i);
                }
              }
            },
            {
              key: "getScrollX",
              value: function() {
                var e = 0;
                if (this.wrapper) {
                  var t = this.params.pixelRatio;
                  if (
                    ((e = Math.round(this.wrapper.scrollLeft * t)),
                    this.params.scrollParent)
                  ) {
                    var a = ~~(this.wrapper.scrollWidth * t - this.getWidth());
                    e = Math.min(a, Math.max(0, e));
                  }
                }
                return e;
              }
            },
            {
              key: "getWidth",
              value: function() {
                return Math.round(
                  this.container.clientWidth * this.params.pixelRatio
                );
              }
            },
            {
              key: "setWidth",
              value: function(e) {
                return (
                  this.width != e &&
                  ((this.width = e),
                  this.params.fillParent || this.params.scrollParent
                    ? this.style(this.wrapper, { width: "" })
                    : this.style(this.wrapper, {
                        width: ~~(this.width / this.params.pixelRatio) + "px"
                      }),
                  this.updateSize(),
                  !0)
                );
              }
            },
            {
              key: "setHeight",
              value: function(e) {
                return (
                  e != this.height &&
                  ((this.height = e),
                  this.style(this.wrapper, {
                    height: ~~(this.height / this.params.pixelRatio) + "px"
                  }),
                  this.updateSize(),
                  !0)
                );
              }
            },
            {
              key: "progress",
              value: function(e) {
                var t = 1 / this.params.pixelRatio,
                  a = Math.round(e * this.width) * t;
                if (a < this.lastPos || a - this.lastPos >= t) {
                  if (
                    ((this.lastPos = a),
                    this.params.scrollParent && this.params.autoCenter)
                  ) {
                    var n = ~~(this.wrapper.scrollWidth * e);
                    this.recenterOnPosition(
                      n,
                      this.params.autoCenterImmediately
                    );
                  }
                  this.updateProgress(a);
                }
              }
            },
            {
              key: "destroy",
              value: function() {
                this.unAll(),
                  this.wrapper &&
                    (this.wrapper.parentNode == this.container &&
                      this.container.removeChild(this.wrapper),
                    (this.wrapper = null));
              }
            },
            { key: "updateCursor", value: function() {} },
            { key: "updateSize", value: function() {} },
            { key: "drawBars", value: function(e, t, a, n) {} },
            { key: "drawWave", value: function(e, t, a, n) {} },
            { key: "clearWave", value: function() {} },
            { key: "updateProgress", value: function(e) {} }
          ]),
          a
        );
      })(nt),
      yt =
        (a("cb29"),
        (function() {
          function e() {
            Object(tt["a"])(this, e),
              (this.wave = null),
              (this.waveCtx = null),
              (this.progress = null),
              (this.progressCtx = null),
              (this.start = 0),
              (this.end = 1),
              (this.id = it(
                "undefined" !== typeof this.constructor.name
                  ? this.constructor.name.toLowerCase() + "_"
                  : "canvasentry_"
              )),
              (this.canvasContextAttributes = {});
          }
          return (
            Object(at["a"])(e, [
              {
                key: "initWave",
                value: function(e) {
                  (this.wave = e),
                    (this.waveCtx = this.wave.getContext(
                      "2d",
                      this.canvasContextAttributes
                    ));
                }
              },
              {
                key: "initProgress",
                value: function(e) {
                  (this.progress = e),
                    (this.progressCtx = this.progress.getContext(
                      "2d",
                      this.canvasContextAttributes
                    ));
                }
              },
              {
                key: "updateDimensions",
                value: function(e, t, a, n) {
                  (this.start = this.wave.offsetLeft / t || 0),
                    (this.end = this.start + e / t),
                    (this.wave.width = a),
                    (this.wave.height = n);
                  var r = { width: e + "px" };
                  lt(this.wave, r),
                    this.hasProgressCanvas &&
                      ((this.progress.width = a),
                      (this.progress.height = n),
                      lt(this.progress, r));
                }
              },
              {
                key: "clearWave",
                value: function() {
                  this.waveCtx.clearRect(
                    0,
                    0,
                    this.waveCtx.canvas.width,
                    this.waveCtx.canvas.height
                  ),
                    this.hasProgressCanvas &&
                      this.progressCtx.clearRect(
                        0,
                        0,
                        this.progressCtx.canvas.width,
                        this.progressCtx.canvas.height
                      );
                }
              },
              {
                key: "setFillStyles",
                value: function(e, t) {
                  (this.waveCtx.fillStyle = e),
                    this.hasProgressCanvas && (this.progressCtx.fillStyle = t);
                }
              },
              {
                key: "fillRects",
                value: function(e, t, a, n, r) {
                  this.fillRectToContext(this.waveCtx, e, t, a, n, r),
                    this.hasProgressCanvas &&
                      this.fillRectToContext(this.progressCtx, e, t, a, n, r);
                }
              },
              {
                key: "fillRectToContext",
                value: function(e, t, a, n, r, i) {
                  e &&
                    (i
                      ? this.drawRoundedRect(e, t, a, n, r, i)
                      : e.fillRect(t, a, n, r));
                }
              },
              {
                key: "drawRoundedRect",
                value: function(e, t, a, n, r, i) {
                  0 !== r &&
                    (r < 0 && ((r *= -1), (a -= r)),
                    e.beginPath(),
                    e.moveTo(t + i, a),
                    e.lineTo(t + n - i, a),
                    e.quadraticCurveTo(t + n, a, t + n, a + i),
                    e.lineTo(t + n, a + r - i),
                    e.quadraticCurveTo(t + n, a + r, t + n - i, a + r),
                    e.lineTo(t + i, a + r),
                    e.quadraticCurveTo(t, a + r, t, a + r - i),
                    e.lineTo(t, a + i),
                    e.quadraticCurveTo(t, a, t + i, a),
                    e.closePath(),
                    e.fill());
                }
              },
              {
                key: "drawLines",
                value: function(e, t, a, n, r, i) {
                  this.drawLineToContext(this.waveCtx, e, t, a, n, r, i),
                    this.hasProgressCanvas &&
                      this.drawLineToContext(
                        this.progressCtx,
                        e,
                        t,
                        a,
                        n,
                        r,
                        i
                      );
                }
              },
              {
                key: "drawLineToContext",
                value: function(e, t, a, n, r, i, s) {
                  if (e) {
                    var o,
                      l,
                      u,
                      c = t.length / 2,
                      d = Math.round(c * this.start),
                      h = Math.round(c * this.end) + 1,
                      f = d,
                      p = h,
                      v = this.wave.width / (p - f - 1),
                      m = n + r,
                      g = a / n;
                    for (
                      e.beginPath(),
                        e.moveTo((f - d) * v, m),
                        e.lineTo(
                          (f - d) * v,
                          m - Math.round((t[2 * f] || 0) / g)
                        ),
                        o = f;
                      o < p;
                      o++
                    )
                      (l = t[2 * o] || 0),
                        (u = Math.round(l / g)),
                        e.lineTo((o - d) * v + this.halfPixel, m - u);
                    var y = p - 1;
                    for (y; y >= f; y--)
                      (l = t[2 * y + 1] || 0),
                        (u = Math.round(l / g)),
                        e.lineTo((y - d) * v + this.halfPixel, m - u);
                    e.lineTo(
                      (f - d) * v,
                      m - Math.round((t[2 * f + 1] || 0) / g)
                    ),
                      e.closePath(),
                      e.fill();
                  }
                }
              },
              {
                key: "destroy",
                value: function() {
                  (this.waveCtx = null),
                    (this.wave = null),
                    (this.progressCtx = null),
                    (this.progress = null);
                }
              },
              {
                key: "getImage",
                value: function(e, t, a) {
                  var n = this;
                  return "blob" === a
                    ? new Promise(function(a) {
                        n.wave.toBlob(a, e, t);
                      })
                    : "dataURL" === a
                    ? this.wave.toDataURL(e, t)
                    : void 0;
                }
              }
            ]),
            e
          );
        })()),
      bt = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e, n) {
          var r;
          return (
            Object(tt["a"])(this, a),
            (r = t.call(this, e, n)),
            (r.maxCanvasWidth = n.maxCanvasWidth),
            (r.maxCanvasElementWidth = Math.round(
              n.maxCanvasWidth / n.pixelRatio
            )),
            (r.hasProgressCanvas = n.waveColor != n.progressColor),
            (r.halfPixel = 0.5 / n.pixelRatio),
            (r.canvases = []),
            (r.progressWave = null),
            (r.EntryClass = yt),
            (r.canvasContextAttributes = n.drawingContextAttributes),
            (r.overlap = 2 * Math.ceil(n.pixelRatio / 2)),
            (r.barRadius = n.barRadius || 0),
            r
          );
        }
        return (
          Object(at["a"])(a, [
            {
              key: "init",
              value: function() {
                this.createWrapper(), this.createElements();
              }
            },
            {
              key: "createElements",
              value: function() {
                (this.progressWave = this.wrapper.appendChild(
                  this.style(document.createElement("wave"), {
                    position: "absolute",
                    zIndex: 3,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    overflow: "hidden",
                    width: "0",
                    display: "none",
                    boxSizing: "border-box",
                    borderRightStyle: "solid",
                    pointerEvents: "none"
                  })
                )),
                  this.addCanvas(),
                  this.updateCursor();
              }
            },
            {
              key: "updateCursor",
              value: function() {
                this.style(this.progressWave, {
                  borderRightWidth: this.params.cursorWidth + "px",
                  borderRightColor: this.params.cursorColor
                });
              }
            },
            {
              key: "updateSize",
              value: function() {
                var e = this,
                  t = Math.round(this.width / this.params.pixelRatio),
                  a = Math.ceil(
                    t / (this.maxCanvasElementWidth + this.overlap)
                  );
                while (this.canvases.length < a) this.addCanvas();
                while (this.canvases.length > a) this.removeCanvas();
                var n = this.maxCanvasWidth + this.overlap,
                  r = this.canvases.length - 1;
                this.canvases.forEach(function(t, a) {
                  a == r && (n = e.width - e.maxCanvasWidth * r),
                    e.updateDimensions(t, n, e.height),
                    t.clearWave();
                });
              }
            },
            {
              key: "addCanvas",
              value: function() {
                var e = new this.EntryClass();
                (e.canvasContextAttributes = this.canvasContextAttributes),
                  (e.hasProgressCanvas = this.hasProgressCanvas),
                  (e.halfPixel = this.halfPixel);
                var t = this.maxCanvasElementWidth * this.canvases.length;
                e.initWave(
                  this.wrapper.appendChild(
                    this.style(document.createElement("canvas"), {
                      position: "absolute",
                      zIndex: 2,
                      left: t + "px",
                      top: 0,
                      bottom: 0,
                      height: "100%",
                      pointerEvents: "none"
                    })
                  )
                ),
                  this.hasProgressCanvas &&
                    e.initProgress(
                      this.progressWave.appendChild(
                        this.style(document.createElement("canvas"), {
                          position: "absolute",
                          left: t + "px",
                          top: 0,
                          bottom: 0,
                          height: "100%"
                        })
                      )
                    ),
                  this.canvases.push(e);
              }
            },
            {
              key: "removeCanvas",
              value: function() {
                var e = this.canvases[this.canvases.length - 1];
                e.wave.parentElement.removeChild(e.wave),
                  this.hasProgressCanvas &&
                    e.progress.parentElement.removeChild(e.progress),
                  e && (e.destroy(), (e = null)),
                  this.canvases.pop();
              }
            },
            {
              key: "updateDimensions",
              value: function(e, t, a) {
                var n = Math.round(t / this.params.pixelRatio),
                  r = Math.round(this.width / this.params.pixelRatio);
                e.updateDimensions(n, r, t, a),
                  this.style(this.progressWave, { display: "block" });
              }
            },
            {
              key: "clearWave",
              value: function() {
                var e = this;
                ct(function() {
                  e.canvases.forEach(function(e) {
                    return e.clearWave();
                  });
                })();
              }
            },
            {
              key: "drawBars",
              value: function(e, t, a, n) {
                var r = this;
                return this.prepareDraw(e, t, a, n, function(e) {
                  var t = e.absmax,
                    i = e.hasMinVals,
                    s = (e.height, e.offsetY),
                    o = e.halfH,
                    l = e.peaks;
                  if (void 0 !== a) {
                    var u = i ? 2 : 1,
                      c = l.length / u,
                      d = r.params.barWidth * r.params.pixelRatio,
                      h =
                        null === r.params.barGap
                          ? Math.max(r.params.pixelRatio, ~~(d / 2))
                          : Math.max(
                              r.params.pixelRatio,
                              r.params.barGap * r.params.pixelRatio
                            ),
                      f = d + h,
                      p = c / r.width,
                      v = a,
                      m = n,
                      g = v;
                    for (g; g < m; g += f) {
                      var y = l[Math.floor(g * p * u)] || 0,
                        b = Math.round((y / t) * o);
                      0 == b &&
                        r.params.barMinHeight &&
                        (b = r.params.barMinHeight),
                        r.fillRect(
                          g + r.halfPixel,
                          o - b + s,
                          d + r.halfPixel,
                          2 * b,
                          r.barRadius
                        );
                    }
                  }
                });
              }
            },
            {
              key: "drawWave",
              value: function(e, t, a, n) {
                var r = this;
                return this.prepareDraw(e, t, a, n, function(e) {
                  var t = e.absmax,
                    i = e.hasMinVals,
                    s = (e.height, e.offsetY),
                    o = e.halfH,
                    l = e.peaks,
                    u = e.channelIndex;
                  if (!i) {
                    var c = [],
                      d = l.length,
                      h = 0;
                    for (h; h < d; h++)
                      (c[2 * h] = l[h]), (c[2 * h + 1] = -l[h]);
                    l = c;
                  }
                  void 0 !== a && r.drawLine(l, t, o, s, a, n, u),
                    r.fillRect(
                      0,
                      o + s - r.halfPixel,
                      r.width,
                      r.halfPixel,
                      r.barRadius
                    );
                });
              }
            },
            {
              key: "drawLine",
              value: function(e, t, a, n, r, i, s) {
                var o = this,
                  l = this.params.splitChannelsOptions.channelColors[s] || {},
                  u = l.waveColor,
                  c = l.progressColor;
                this.canvases.forEach(function(s, l) {
                  o.setFillStyles(s, u, c), s.drawLines(e, t, a, n, r, i);
                });
              }
            },
            {
              key: "fillRect",
              value: function(e, t, a, n, r) {
                var i = Math.floor(e / this.maxCanvasWidth),
                  s = Math.min(
                    Math.ceil((e + a) / this.maxCanvasWidth) + 1,
                    this.canvases.length
                  ),
                  o = i;
                for (o; o < s; o++) {
                  var l = this.canvases[o],
                    u = o * this.maxCanvasWidth,
                    c = {
                      x1: Math.max(e, o * this.maxCanvasWidth),
                      y1: t,
                      x2: Math.min(
                        e + a,
                        o * this.maxCanvasWidth + l.wave.width
                      ),
                      y2: t + n
                    };
                  c.x1 < c.x2 &&
                    (this.setFillStyles(l),
                    l.fillRects(c.x1 - u, c.y1, c.x2 - c.x1, c.y2 - c.y1, r));
                }
              }
            },
            {
              key: "hideChannel",
              value: function(e) {
                return (
                  this.params.splitChannels &&
                  this.params.splitChannelsOptions.filterChannels.includes(e)
                );
              }
            },
            {
              key: "prepareDraw",
              value: function(e, t, a, n, r, i) {
                var s = this;
                return ct(function() {
                  if (e[0] instanceof Array) {
                    var o = e;
                    if (s.params.splitChannels) {
                      var l = o.filter(function(e, t) {
                        return !s.hideChannel(t);
                      });
                      return (
                        s.params.splitChannelsOptions.overlay ||
                          s.setHeight(
                            Math.max(l.length, 1) *
                              s.params.height *
                              s.params.pixelRatio
                          ),
                        o.forEach(function(e, t) {
                          return s.prepareDraw(e, t, a, n, r, l.indexOf(e));
                        })
                      );
                    }
                    e = o[0];
                  }
                  if (!s.hideChannel(t)) {
                    var u = 1 / s.params.barHeight;
                    if (s.params.normalize) {
                      var c = st(e),
                        d = ot(e);
                      u = -d > c ? -d : c;
                    }
                    var h = [].some.call(e, function(e) {
                        return e < 0;
                      }),
                      f = s.params.height * s.params.pixelRatio,
                      p = f * i || 0,
                      v = f / 2;
                    return r({
                      absmax: u,
                      hasMinVals: h,
                      height: f,
                      offsetY: p,
                      halfH: v,
                      peaks: e,
                      channelIndex: t
                    });
                  }
                })();
              }
            },
            {
              key: "setFillStyles",
              value: function(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.params.waveColor,
                  a =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : this.params.progressColor;
                e.setFillStyles(t, a);
              }
            },
            {
              key: "getImage",
              value: function(e, t, a) {
                if ("blob" === a)
                  return Promise.all(
                    this.canvases.map(function(n) {
                      return n.getImage(e, t, a);
                    })
                  );
                if ("dataURL" === a) {
                  var n = this.canvases.map(function(n) {
                    return n.getImage(e, t, a);
                  });
                  return n.length > 1 ? n : n[0];
                }
              }
            },
            {
              key: "updateProgress",
              value: function(e) {
                this.style(this.progressWave, { width: e + "px" });
              }
            }
          ]),
          a
        );
      })(gt),
      kt = (a("13d5"), "playing"),
      wt = "paused",
      Ct = "finished",
      Pt = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e) {
          var n, r, i;
          return (
            Object(tt["a"])(this, a),
            (i = t.call(this)),
            Object(et["a"])(Object(Ze["a"])(i), "audioContext", null),
            Object(et["a"])(Object(Ze["a"])(i), "offlineAudioContext", null),
            Object(et["a"])(
              Object(Ze["a"])(i),
              "stateBehaviors",
              ((n = {}),
              Object(et["a"])(n, kt, {
                init: function() {
                  this.addOnAudioProcess();
                },
                getPlayedPercents: function() {
                  var e = this.getDuration();
                  return this.getCurrentTime() / e || 0;
                },
                getCurrentTime: function() {
                  return this.startPosition + this.getPlayedTime();
                }
              }),
              Object(et["a"])(n, wt, {
                init: function() {
                  this.removeOnAudioProcess();
                },
                getPlayedPercents: function() {
                  var e = this.getDuration();
                  return this.getCurrentTime() / e || 0;
                },
                getCurrentTime: function() {
                  return this.startPosition;
                }
              }),
              Object(et["a"])(n, Ct, {
                init: function() {
                  this.removeOnAudioProcess(), this.fireEvent("finish");
                },
                getPlayedPercents: function() {
                  return 1;
                },
                getCurrentTime: function() {
                  return this.getDuration();
                }
              }),
              n)
            ),
            (i.params = e),
            (i.ac =
              e.audioContext ||
              (i.supportsWebAudio() ? i.getAudioContext() : {})),
            (i.lastPlay = i.ac.currentTime),
            (i.startPosition = 0),
            (i.scheduledPause = null),
            (i.states =
              ((r = {}),
              Object(et["a"])(r, kt, Object.create(i.stateBehaviors[kt])),
              Object(et["a"])(r, wt, Object.create(i.stateBehaviors[wt])),
              Object(et["a"])(r, Ct, Object.create(i.stateBehaviors[Ct])),
              r)),
            (i.buffer = null),
            (i.filters = []),
            (i.gainNode = null),
            (i.mergedPeaks = null),
            (i.offlineAc = null),
            (i.peaks = null),
            (i.playbackRate = 1),
            (i.analyser = null),
            (i.scriptNode = null),
            (i.source = null),
            (i.splitPeaks = []),
            (i.state = null),
            (i.explicitDuration = e.duration),
            (i.destroyed = !1),
            i
          );
        }
        return (
          Object(at["a"])(a, [
            {
              key: "supportsWebAudio",
              value: function() {
                return !(!window.AudioContext && !window.webkitAudioContext);
              }
            },
            {
              key: "getAudioContext",
              value: function() {
                return (
                  window.WaveSurferAudioContext ||
                    (window.WaveSurferAudioContext = new (window.AudioContext ||
                      window.webkitAudioContext)()),
                  window.WaveSurferAudioContext
                );
              }
            },
            {
              key: "getOfflineAudioContext",
              value: function(e) {
                return (
                  window.WaveSurferOfflineAudioContext ||
                    (window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext ||
                      window.webkitOfflineAudioContext)(1, 2, e)),
                  window.WaveSurferOfflineAudioContext
                );
              }
            }
          ]),
          Object(at["a"])(a, [
            {
              key: "init",
              value: function() {
                this.createVolumeNode(),
                  this.createScriptNode(),
                  this.createAnalyserNode(),
                  this.setState(wt),
                  this.setPlaybackRate(this.params.audioRate),
                  this.setLength(0);
              }
            },
            {
              key: "disconnectFilters",
              value: function() {
                this.filters &&
                  (this.filters.forEach(function(e) {
                    e && e.disconnect();
                  }),
                  (this.filters = null),
                  this.analyser.connect(this.gainNode));
              }
            },
            {
              key: "setState",
              value: function(e) {
                this.state !== this.states[e] &&
                  ((this.state = this.states[e]), this.state.init.call(this));
              }
            },
            {
              key: "setFilter",
              value: function() {
                for (
                  var e = arguments.length, t = new Array(e), a = 0;
                  a < e;
                  a++
                )
                  t[a] = arguments[a];
                this.setFilters(t);
              }
            },
            {
              key: "setFilters",
              value: function(e) {
                this.disconnectFilters(),
                  e &&
                    e.length &&
                    ((this.filters = e),
                    this.analyser.disconnect(),
                    e
                      .reduce(function(e, t) {
                        return e.connect(t), t;
                      }, this.analyser)
                      .connect(this.gainNode));
              }
            },
            {
              key: "createScriptNode",
              value: function() {
                this.params.audioScriptProcessor
                  ? (this.scriptNode = this.params.audioScriptProcessor)
                  : this.ac.createScriptProcessor
                  ? (this.scriptNode = this.ac.createScriptProcessor(
                      a.scriptBufferSize
                    ))
                  : (this.scriptNode = this.ac.createJavaScriptNode(
                      a.scriptBufferSize
                    )),
                  this.scriptNode.connect(this.ac.destination);
              }
            },
            {
              key: "addOnAudioProcess",
              value: function() {
                var e = this;
                this.scriptNode.onaudioprocess = function() {
                  var t = e.getCurrentTime();
                  t >= e.getDuration()
                    ? (e.setState(Ct), e.fireEvent("pause"))
                    : t >= e.scheduledPause
                    ? e.pause()
                    : e.state === e.states[kt] &&
                      e.fireEvent("audioprocess", t);
                };
              }
            },
            {
              key: "removeOnAudioProcess",
              value: function() {
                this.scriptNode.onaudioprocess = function() {};
              }
            },
            {
              key: "createAnalyserNode",
              value: function() {
                (this.analyser = this.ac.createAnalyser()),
                  this.analyser.connect(this.gainNode);
              }
            },
            {
              key: "createVolumeNode",
              value: function() {
                this.ac.createGain
                  ? (this.gainNode = this.ac.createGain())
                  : (this.gainNode = this.ac.createGainNode()),
                  this.gainNode.connect(this.ac.destination);
              }
            },
            {
              key: "setSinkId",
              value: function(e) {
                if (e) {
                  var t = new window.Audio();
                  if (!t.setSinkId)
                    return Promise.reject(
                      new Error("setSinkId is not supported in your browser")
                    );
                  t.autoplay = !0;
                  var a = this.ac.createMediaStreamDestination();
                  return (
                    this.gainNode.disconnect(),
                    this.gainNode.connect(a),
                    (t.srcObject = a.stream),
                    t.setSinkId(e)
                  );
                }
                return Promise.reject(new Error("Invalid deviceId: " + e));
              }
            },
            {
              key: "setVolume",
              value: function(e) {
                this.gainNode.gain.setValueAtTime(e, this.ac.currentTime);
              }
            },
            {
              key: "getVolume",
              value: function() {
                return this.gainNode.gain.value;
              }
            },
            {
              key: "decodeArrayBuffer",
              value: function(e, t, a) {
                this.offlineAc ||
                  (this.offlineAc = this.getOfflineAudioContext(
                    this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100
                  )),
                  this.offlineAc.decodeAudioData(
                    e,
                    function(e) {
                      return t(e);
                    },
                    a
                  );
              }
            },
            {
              key: "setPeaks",
              value: function(e, t) {
                null != t && (this.explicitDuration = t), (this.peaks = e);
              }
            },
            {
              key: "setLength",
              value: function(e) {
                if (
                  !this.mergedPeaks ||
                  e != 2 * this.mergedPeaks.length - 1 + 2
                ) {
                  (this.splitPeaks = []), (this.mergedPeaks = []);
                  var t,
                    a = this.buffer ? this.buffer.numberOfChannels : 1;
                  for (t = 0; t < a; t++)
                    (this.splitPeaks[t] = []),
                      (this.splitPeaks[t][2 * (e - 1)] = 0),
                      (this.splitPeaks[t][2 * (e - 1) + 1] = 0);
                  (this.mergedPeaks[2 * (e - 1)] = 0),
                    (this.mergedPeaks[2 * (e - 1) + 1] = 0);
                }
              }
            },
            {
              key: "getPeaks",
              value: function(e, t, a) {
                if (this.peaks) return this.peaks;
                if (!this.buffer) return [];
                if (
                  ((t = t || 0),
                  (a = a || e - 1),
                  this.setLength(e),
                  !this.buffer)
                )
                  return this.params.splitChannels
                    ? this.splitPeaks
                    : this.mergedPeaks;
                if (!this.buffer.length) {
                  var n = this.createBuffer(1, 4096, this.sampleRate);
                  this.buffer = n.buffer;
                }
                var r,
                  i = this.buffer.length / e,
                  s = ~~(i / 10) || 1,
                  o = this.buffer.numberOfChannels;
                for (r = 0; r < o; r++) {
                  var l = this.splitPeaks[r],
                    u = this.buffer.getChannelData(r),
                    c = void 0;
                  for (c = t; c <= a; c++) {
                    var d = ~~(c * i),
                      h = ~~(d + i),
                      f = u[d],
                      p = f,
                      v = void 0;
                    for (v = d; v < h; v += s) {
                      var m = u[v];
                      m > p && (p = m), m < f && (f = m);
                    }
                    (l[2 * c] = p),
                      (l[2 * c + 1] = f),
                      (0 == r || p > this.mergedPeaks[2 * c]) &&
                        (this.mergedPeaks[2 * c] = p),
                      (0 == r || f < this.mergedPeaks[2 * c + 1]) &&
                        (this.mergedPeaks[2 * c + 1] = f);
                  }
                }
                return this.params.splitChannels
                  ? this.splitPeaks
                  : this.mergedPeaks;
              }
            },
            {
              key: "getPlayedPercents",
              value: function() {
                return this.state.getPlayedPercents.call(this);
              }
            },
            {
              key: "disconnectSource",
              value: function() {
                this.source && this.source.disconnect();
              }
            },
            {
              key: "destroyWebAudio",
              value: function() {
                this.disconnectFilters(),
                  this.disconnectSource(),
                  this.gainNode.disconnect(),
                  this.scriptNode.disconnect(),
                  this.analyser.disconnect(),
                  this.params.closeAudioContext &&
                    ("function" === typeof this.ac.close &&
                      "closed" != this.ac.state &&
                      this.ac.close(),
                    (this.ac = null),
                    this.params.audioContext
                      ? (this.params.audioContext = null)
                      : (window.WaveSurferAudioContext = null),
                    (window.WaveSurferOfflineAudioContext = null));
              }
            },
            {
              key: "destroy",
              value: function() {
                this.isPaused() || this.pause(),
                  this.unAll(),
                  (this.buffer = null),
                  (this.destroyed = !0),
                  this.destroyWebAudio();
              }
            },
            {
              key: "load",
              value: function(e) {
                (this.startPosition = 0),
                  (this.lastPlay = this.ac.currentTime),
                  (this.buffer = e),
                  this.createSource();
              }
            },
            {
              key: "createSource",
              value: function() {
                this.disconnectSource(),
                  (this.source = this.ac.createBufferSource()),
                  (this.source.start =
                    this.source.start || this.source.noteGrainOn),
                  (this.source.stop = this.source.stop || this.source.noteOff),
                  this.source.playbackRate.setValueAtTime(
                    this.playbackRate,
                    this.ac.currentTime
                  ),
                  (this.source.buffer = this.buffer),
                  this.source.connect(this.analyser);
              }
            },
            {
              key: "resumeAudioContext",
              value: function() {
                "suspended" == this.ac.state &&
                  this.ac.resume &&
                  this.ac.resume();
              }
            },
            {
              key: "isPaused",
              value: function() {
                return this.state !== this.states[kt];
              }
            },
            {
              key: "getDuration",
              value: function() {
                return this.explicitDuration
                  ? this.explicitDuration
                  : this.buffer
                  ? this.buffer.duration
                  : 0;
              }
            },
            {
              key: "seekTo",
              value: function(e, t) {
                if (this.buffer)
                  return (
                    (this.scheduledPause = null),
                    null == e &&
                      ((e = this.getCurrentTime()),
                      e >= this.getDuration() && (e = 0)),
                    null == t && (t = this.getDuration()),
                    (this.startPosition = e),
                    (this.lastPlay = this.ac.currentTime),
                    this.state === this.states[Ct] && this.setState(wt),
                    { start: e, end: t }
                  );
              }
            },
            {
              key: "getPlayedTime",
              value: function() {
                return (
                  (this.ac.currentTime - this.lastPlay) * this.playbackRate
                );
              }
            },
            {
              key: "play",
              value: function(e, t) {
                if (this.buffer) {
                  this.createSource();
                  var a = this.seekTo(e, t);
                  (e = a.start),
                    (t = a.end),
                    (this.scheduledPause = t),
                    this.source.start(0, e),
                    this.resumeAudioContext(),
                    this.setState(kt),
                    this.fireEvent("play");
                }
              }
            },
            {
              key: "pause",
              value: function() {
                (this.scheduledPause = null),
                  (this.startPosition += this.getPlayedTime()),
                  this.source && this.source.stop(0),
                  this.setState(wt),
                  this.fireEvent("pause");
              }
            },
            {
              key: "getCurrentTime",
              value: function() {
                return this.state.getCurrentTime.call(this);
              }
            },
            {
              key: "getPlaybackRate",
              value: function() {
                return this.playbackRate;
              }
            },
            {
              key: "setPlaybackRate",
              value: function(e) {
                (e = e || 1),
                  this.isPaused()
                    ? (this.playbackRate = e)
                    : (this.pause(), (this.playbackRate = e), this.play());
              }
            },
            {
              key: "setPlayEnd",
              value: function(e) {
                this.scheduledPause = e;
              }
            }
          ]),
          a
        );
      })(nt);
    Object(et["a"])(Pt, "scriptBufferSize", 256);
    var xt = a("45eb"),
      Et = a("7e84"),
      St = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e) {
          var n;
          return (
            Object(tt["a"])(this, a),
            (n = t.call(this, e)),
            (n.params = e),
            (n.media = {
              currentTime: 0,
              duration: 0,
              paused: !0,
              playbackRate: 1,
              play: function() {},
              pause: function() {},
              volume: 0
            }),
            (n.mediaType = e.mediaType.toLowerCase()),
            (n.elementPosition = e.elementPosition),
            (n.peaks = null),
            (n.playbackRate = 1),
            (n.volume = 1),
            (n.isMuted = !1),
            (n.buffer = null),
            (n.onPlayEnd = null),
            (n.mediaListeners = {}),
            n
          );
        }
        return (
          Object(at["a"])(a, [
            {
              key: "init",
              value: function() {
                this.setPlaybackRate(this.params.audioRate), this.createTimer();
              }
            },
            {
              key: "_setupMediaListeners",
              value: function() {
                var e = this;
                (this.mediaListeners.error = function() {
                  e.fireEvent("error", "Error loading media element");
                }),
                  (this.mediaListeners.canplay = function() {
                    e.fireEvent("canplay");
                  }),
                  (this.mediaListeners.ended = function() {
                    e.fireEvent("finish");
                  }),
                  (this.mediaListeners.play = function() {
                    e.fireEvent("play");
                  }),
                  (this.mediaListeners.pause = function() {
                    e.fireEvent("pause");
                  }),
                  (this.mediaListeners.seeked = function(t) {
                    e.fireEvent("seek");
                  }),
                  (this.mediaListeners.volumechange = function(t) {
                    (e.isMuted = e.media.muted),
                      e.isMuted ? (e.volume = 0) : (e.volume = e.media.volume),
                      e.fireEvent("volume");
                  }),
                  Object.keys(this.mediaListeners).forEach(function(t) {
                    e.media.removeEventListener(t, e.mediaListeners[t]),
                      e.media.addEventListener(t, e.mediaListeners[t]);
                  });
              }
            },
            {
              key: "createTimer",
              value: function() {
                var e = this,
                  t = function t() {
                    e.isPaused() ||
                      (e.fireEvent("audioprocess", e.getCurrentTime()),
                      ct(t)());
                  };
                this.on("play", t),
                  this.on("pause", function() {
                    e.fireEvent("audioprocess", e.getCurrentTime());
                  });
              }
            },
            {
              key: "load",
              value: function(e, t, a, n) {
                var r = document.createElement(this.mediaType);
                (r.controls = this.params.mediaControls),
                  (r.autoplay = this.params.autoplay || !1),
                  (r.preload = null == n ? "auto" : n),
                  (r.src = e),
                  (r.style.width = "100%");
                var i = t.querySelector(this.mediaType);
                i && t.removeChild(i), t.appendChild(r), this._load(r, a, n);
              }
            },
            {
              key: "loadElt",
              value: function(e, t) {
                (e.controls = this.params.mediaControls),
                  (e.autoplay = this.params.autoplay || !1),
                  this._load(e, t, e.preload);
              }
            },
            {
              key: "_load",
              value: function(e, t, a) {
                if (
                  !(e instanceof HTMLMediaElement) ||
                  "undefined" === typeof e.addEventListener
                )
                  throw new Error(
                    "media parameter is not a valid media element"
                  );
                "function" != typeof e.load || (t && "none" == a) || e.load(),
                  (this.media = e),
                  this._setupMediaListeners(),
                  (this.peaks = t),
                  (this.onPlayEnd = null),
                  (this.buffer = null),
                  (this.isMuted = e.muted),
                  this.setPlaybackRate(this.playbackRate),
                  this.setVolume(this.volume);
              }
            },
            {
              key: "isPaused",
              value: function() {
                return !this.media || this.media.paused;
              }
            },
            {
              key: "getDuration",
              value: function() {
                if (this.explicitDuration) return this.explicitDuration;
                var e = (this.buffer || this.media).duration;
                return e >= 1 / 0 && (e = this.media.seekable.end(0)), e;
              }
            },
            {
              key: "getCurrentTime",
              value: function() {
                return this.media && this.media.currentTime;
              }
            },
            {
              key: "getPlayedPercents",
              value: function() {
                return this.getCurrentTime() / this.getDuration() || 0;
              }
            },
            {
              key: "getPlaybackRate",
              value: function() {
                return this.playbackRate || this.media.playbackRate;
              }
            },
            {
              key: "setPlaybackRate",
              value: function(e) {
                (this.playbackRate = e || 1),
                  (this.media.playbackRate = this.playbackRate);
              }
            },
            {
              key: "seekTo",
              value: function(e) {
                null != e && (this.media.currentTime = e), this.clearPlayEnd();
              }
            },
            {
              key: "play",
              value: function(e, t) {
                this.seekTo(e);
                var a = this.media.play();
                return t && this.setPlayEnd(t), a;
              }
            },
            {
              key: "pause",
              value: function() {
                var e;
                return (
                  this.media && (e = this.media.pause()), this.clearPlayEnd(), e
                );
              }
            },
            {
              key: "setPlayEnd",
              value: function(e) {
                var t = this;
                this.clearPlayEnd(),
                  (this._onPlayEnd = function(a) {
                    a >= e && (t.pause(), t.seekTo(e));
                  }),
                  this.on("audioprocess", this._onPlayEnd);
              }
            },
            {
              key: "clearPlayEnd",
              value: function() {
                this._onPlayEnd &&
                  (this.un("audioprocess", this._onPlayEnd),
                  (this._onPlayEnd = null));
              }
            },
            {
              key: "getPeaks",
              value: function(e, t, n) {
                return this.buffer
                  ? Object(xt["a"])(
                      Object(Et["a"])(a.prototype),
                      "getPeaks",
                      this
                    ).call(this, e, t, n)
                  : this.peaks || [];
              }
            },
            {
              key: "setSinkId",
              value: function(e) {
                return e
                  ? this.media.setSinkId
                    ? this.media.setSinkId(e)
                    : Promise.reject(
                        new Error("setSinkId is not supported in your browser")
                      )
                  : Promise.reject(new Error("Invalid deviceId: " + e));
              }
            },
            {
              key: "getVolume",
              value: function() {
                return this.volume;
              }
            },
            {
              key: "setVolume",
              value: function(e) {
                (this.volume = e),
                  this.media.volume !== this.volume &&
                    (this.media.volume = this.volume);
              }
            },
            {
              key: "setMute",
              value: function(e) {
                this.isMuted = this.media.muted = e;
              }
            },
            {
              key: "destroy",
              value: function() {
                var e = this;
                this.pause(),
                  this.unAll(),
                  (this.destroyed = !0),
                  Object.keys(this.mediaListeners).forEach(function(t) {
                    e.media &&
                      e.media.removeEventListener(t, e.mediaListeners[t]);
                  }),
                  this.params.removeMediaElementOnDestroy &&
                    this.media &&
                    this.media.parentNode &&
                    this.media.parentNode.removeChild(this.media),
                  (this.media = null);
              }
            }
          ]),
          a
        );
      })(Pt),
      Rt = (function() {
        function e() {
          Object(tt["a"])(this, e), this.clearPeakCache();
        }
        return (
          Object(at["a"])(e, [
            {
              key: "clearPeakCache",
              value: function() {
                (this.peakCacheRanges = []), (this.peakCacheLength = -1);
              }
            },
            {
              key: "addRangeToPeakCache",
              value: function(e, t, a) {
                e != this.peakCacheLength &&
                  (this.clearPeakCache(), (this.peakCacheLength = e));
                var n = [],
                  r = 0;
                while (
                  r < this.peakCacheRanges.length &&
                  this.peakCacheRanges[r] < t
                )
                  r++;
                r % 2 == 0 && n.push(t);
                while (
                  r < this.peakCacheRanges.length &&
                  this.peakCacheRanges[r] <= a
                )
                  n.push(this.peakCacheRanges[r]), r++;
                r % 2 == 0 && n.push(a),
                  (n = n.filter(function(e, t, a) {
                    return 0 == t
                      ? e != a[t + 1]
                      : t == a.length - 1
                      ? e != a[t - 1]
                      : e != a[t - 1] && e != a[t + 1];
                  })),
                  (this.peakCacheRanges = this.peakCacheRanges.concat(n)),
                  (this.peakCacheRanges = this.peakCacheRanges
                    .sort(function(e, t) {
                      return e - t;
                    })
                    .filter(function(e, t, a) {
                      return 0 == t
                        ? e != a[t + 1]
                        : t == a.length - 1
                        ? e != a[t - 1]
                        : e != a[t - 1] && e != a[t + 1];
                    }));
                var i = [];
                for (r = 0; r < n.length; r += 2) i.push([n[r], n[r + 1]]);
                return i;
              }
            },
            {
              key: "getCacheRanges",
              value: function() {
                var e,
                  t = [];
                for (e = 0; e < this.peakCacheRanges.length; e += 2)
                  t.push([
                    this.peakCacheRanges[e],
                    this.peakCacheRanges[e + 1]
                  ]);
                return t;
              }
            }
          ]),
          e
        );
      })(),
      Wt = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e) {
          var n;
          return (
            Object(tt["a"])(this, a),
            (n = t.call(this, e)),
            (n.params = e),
            (n.sourceMediaElement = null),
            n
          );
        }
        return (
          Object(at["a"])(a, [
            {
              key: "init",
              value: function() {
                this.setPlaybackRate(this.params.audioRate),
                  this.createTimer(),
                  this.createVolumeNode(),
                  this.createScriptNode(),
                  this.createAnalyserNode();
              }
            },
            {
              key: "_load",
              value: function(e, t, n) {
                Object(xt["a"])(
                  Object(Et["a"])(a.prototype),
                  "_load",
                  this
                ).call(this, e, t, n),
                  this.createMediaElementSource(e);
              }
            },
            {
              key: "createMediaElementSource",
              value: function(e) {
                (this.sourceMediaElement = this.ac.createMediaElementSource(e)),
                  this.sourceMediaElement.connect(this.analyser);
              }
            },
            {
              key: "play",
              value: function(e, t) {
                return (
                  this.resumeAudioContext(),
                  Object(xt["a"])(
                    Object(Et["a"])(a.prototype),
                    "play",
                    this
                  ).call(this, e, t)
                );
              }
            },
            {
              key: "destroy",
              value: function() {
                Object(xt["a"])(
                  Object(Et["a"])(a.prototype),
                  "destroy",
                  this
                ).call(this),
                  this.destroyWebAudio();
              }
            }
          ]),
          a
        );
      })(St),
      At = (function(e) {
        Object(Ke["a"])(a, e);
        var t = Object(Qe["a"])(a);
        function a(e) {
          var r;
          if (
            (Object(tt["a"])(this, a),
            (r = t.call(this)),
            Object(et["a"])(Object(Ze["a"])(r), "defaultParams", {
              audioContext: null,
              audioScriptProcessor: null,
              audioRate: 1,
              autoCenter: !0,
              autoCenterRate: 5,
              autoCenterImmediately: !1,
              backend: "WebAudio",
              backgroundColor: null,
              barHeight: 1,
              barRadius: 0,
              barGap: null,
              barMinHeight: null,
              container: null,
              cursorColor: "#333",
              cursorWidth: 1,
              dragSelection: !0,
              drawingContextAttributes: { desynchronized: !1 },
              duration: null,
              fillParent: !0,
              forceDecode: !1,
              height: 128,
              hideScrollbar: !1,
              interact: !0,
              loopSelection: !0,
              maxCanvasWidth: 4e3,
              mediaContainer: null,
              mediaControls: !1,
              mediaType: "audio",
              minPxPerSec: 20,
              normalize: !1,
              partialRender: !1,
              pixelRatio:
                window.devicePixelRatio ||
                screen.deviceXDPI / screen.logicalXDPI,
              plugins: [],
              progressColor: "#555",
              removeMediaElementOnDestroy: !0,
              renderer: bt,
              responsive: !1,
              rtl: !1,
              scrollParent: !1,
              skipLength: 2,
              splitChannels: !1,
              splitChannelsOptions: {
                overlay: !1,
                channelColors: {},
                filterChannels: []
              },
              waveColor: "#999",
              xhr: {}
            }),
            Object(et["a"])(Object(Ze["a"])(r), "backends", {
              MediaElement: St,
              WebAudio: Pt,
              MediaElementWebAudio: Wt
            }),
            Object(et["a"])(Object(Ze["a"])(r), "util", n),
            (r.params = Object.assign({}, r.defaultParams, e)),
            (r.container =
              "string" == typeof e.container
                ? document.querySelector(r.params.container)
                : e.container),
            !r.container)
          )
            throw new Error("Container element not found");
          if (
            (null == r.params.mediaContainer
              ? (r.mediaContainer = r.container)
              : "string" == typeof r.params.mediaContainer
              ? (r.mediaContainer = document.querySelector(
                  r.params.mediaContainer
                ))
              : (r.mediaContainer = r.params.mediaContainer),
            !r.mediaContainer)
          )
            throw new Error("Media Container element not found");
          if (r.params.maxCanvasWidth <= 1)
            throw new Error("maxCanvasWidth must be greater than 1");
          if (r.params.maxCanvasWidth % 2 == 1)
            throw new Error("maxCanvasWidth must be an even number");
          if (
            (!0 === r.params.rtl &&
              lt(r.container, { transform: "rotateY(180deg)" }),
            r.params.backgroundColor &&
              r.setBackgroundColor(r.params.backgroundColor),
            (r.savedVolume = 0),
            (r.isMuted = !1),
            (r.tmpEvents = []),
            (r.currentRequest = null),
            (r.arraybuffer = null),
            (r.drawer = null),
            (r.backend = null),
            (r.peakCache = null),
            "function" !== typeof r.params.renderer)
          )
            throw new Error("Renderer parameter is invalid");
          (r.Drawer = r.params.renderer),
            "AudioElement" == r.params.backend &&
              (r.params.backend = "MediaElement"),
            ("WebAudio" != r.params.backend &&
              "MediaElementWebAudio" !== r.params.backend) ||
              Pt.prototype.supportsWebAudio.call(null) ||
              (r.params.backend = "MediaElement"),
            (r.Backend = r.backends[r.params.backend]),
            (r.initialisedPluginList = {}),
            (r.isDestroyed = !1),
            (r.isReady = !1);
          var i = 0;
          return (
            (r._onResize = ht.a(
              function() {
                i == r.drawer.wrapper.clientWidth ||
                  r.params.scrollParent ||
                  ((i = r.drawer.wrapper.clientWidth),
                  r.drawer.fireEvent("redraw"));
              },
              "number" === typeof r.params.responsive
                ? r.params.responsive
                : 100
            )),
            Object(Je["a"])(r, Object(Ze["a"])(r))
          );
        }
        return (
          Object(at["a"])(a, null, [
            {
              key: "create",
              value: function(e) {
                var t = new a(e);
                return t.init();
              }
            }
          ]),
          Object(at["a"])(a, [
            {
              key: "init",
              value: function() {
                return (
                  this.registerPlugins(this.params.plugins),
                  this.createDrawer(),
                  this.createBackend(),
                  this.createPeakCache(),
                  this
                );
              }
            },
            {
              key: "registerPlugins",
              value: function(e) {
                var t = this;
                return (
                  e.forEach(function(e) {
                    return t.addPlugin(e);
                  }),
                  e.forEach(function(e) {
                    e.deferInit || t.initPlugin(e.name);
                  }),
                  this.fireEvent("plugins-registered", e),
                  this
                );
              }
            },
            {
              key: "getActivePlugins",
              value: function() {
                return this.initialisedPluginList;
              }
            },
            {
              key: "addPlugin",
              value: function(e) {
                var t = this;
                if (!e.name) throw new Error("Plugin does not have a name!");
                if (!e.instance)
                  throw new Error(
                    "Plugin ".concat(
                      e.name,
                      " does not have an instance property!"
                    )
                  );
                e.staticProps &&
                  Object.keys(e.staticProps).forEach(function(a) {
                    t[a] = e.staticProps[a];
                  });
                var a = e.instance,
                  n = Object.getOwnPropertyNames(nt.prototype);
                return (
                  n.forEach(function(e) {
                    a.prototype[e] = nt.prototype[e];
                  }),
                  (this[e.name] = new a(e.params || {}, this)),
                  this.fireEvent("plugin-added", e.name),
                  this
                );
              }
            },
            {
              key: "initPlugin",
              value: function(e) {
                if (!this[e])
                  throw new Error(
                    "Plugin ".concat(e, " has not been added yet!")
                  );
                return (
                  this.initialisedPluginList[e] && this.destroyPlugin(e),
                  this[e].init(),
                  (this.initialisedPluginList[e] = !0),
                  this.fireEvent("plugin-initialised", e),
                  this
                );
              }
            },
            {
              key: "destroyPlugin",
              value: function(e) {
                if (!this[e])
                  throw new Error(
                    "Plugin ".concat(
                      e,
                      " has not been added yet and cannot be destroyed!"
                    )
                  );
                if (!this.initialisedPluginList[e])
                  throw new Error(
                    "Plugin ".concat(
                      e,
                      " is not active and cannot be destroyed!"
                    )
                  );
                if ("function" !== typeof this[e].destroy)
                  throw new Error(
                    "Plugin ".concat(e, " does not have a destroy function!")
                  );
                return (
                  this[e].destroy(),
                  delete this.initialisedPluginList[e],
                  this.fireEvent("plugin-destroyed", e),
                  this
                );
              }
            },
            {
              key: "destroyAllPlugins",
              value: function() {
                var e = this;
                Object.keys(this.initialisedPluginList).forEach(function(t) {
                  return e.destroyPlugin(t);
                });
              }
            },
            {
              key: "createDrawer",
              value: function() {
                var e = this;
                (this.drawer = new this.Drawer(this.container, this.params)),
                  this.drawer.init(),
                  this.fireEvent("drawer-created", this.drawer),
                  !1 !== this.params.responsive &&
                    (window.addEventListener("resize", this._onResize, !0),
                    window.addEventListener(
                      "orientationchange",
                      this._onResize,
                      !0
                    )),
                  this.drawer.on("redraw", function() {
                    e.drawBuffer(),
                      e.drawer.progress(e.backend.getPlayedPercents());
                  }),
                  this.drawer.on("click", function(t, a) {
                    setTimeout(function() {
                      return e.seekTo(a);
                    }, 0);
                  }),
                  this.drawer.on("scroll", function(t) {
                    e.params.partialRender && e.drawBuffer(),
                      e.fireEvent("scroll", t);
                  });
              }
            },
            {
              key: "createBackend",
              value: function() {
                var e = this;
                this.backend && this.backend.destroy(),
                  (this.backend = new this.Backend(this.params)),
                  this.backend.init(),
                  this.fireEvent("backend-created", this.backend),
                  this.backend.on("finish", function() {
                    e.drawer.progress(e.backend.getPlayedPercents()),
                      e.fireEvent("finish");
                  }),
                  this.backend.on("play", function() {
                    return e.fireEvent("play");
                  }),
                  this.backend.on("pause", function() {
                    return e.fireEvent("pause");
                  }),
                  this.backend.on("audioprocess", function(t) {
                    e.drawer.progress(e.backend.getPlayedPercents()),
                      e.fireEvent("audioprocess", t);
                  }),
                  ("MediaElement" !== this.params.backend &&
                    "MediaElementWebAudio" !== this.params.backend) ||
                    (this.backend.on("seek", function() {
                      e.drawer.progress(e.backend.getPlayedPercents());
                    }),
                    this.backend.on("volume", function() {
                      var t = e.getVolume();
                      e.fireEvent("volume", t),
                        e.backend.isMuted !== e.isMuted &&
                          ((e.isMuted = e.backend.isMuted),
                          e.fireEvent("mute", e.isMuted));
                    }));
              }
            },
            {
              key: "createPeakCache",
              value: function() {
                this.params.partialRender && (this.peakCache = new Rt());
              }
            },
            {
              key: "getDuration",
              value: function() {
                return this.backend.getDuration();
              }
            },
            {
              key: "getCurrentTime",
              value: function() {
                return this.backend.getCurrentTime();
              }
            },
            {
              key: "setCurrentTime",
              value: function(e) {
                e >= this.getDuration()
                  ? this.seekTo(1)
                  : this.seekTo(e / this.getDuration());
              }
            },
            {
              key: "play",
              value: function(e, t) {
                var a = this;
                return (
                  this.fireEvent("interaction", function() {
                    return a.play(e, t);
                  }),
                  this.backend.play(e, t)
                );
              }
            },
            {
              key: "setPlayEnd",
              value: function(e) {
                this.backend.setPlayEnd(e);
              }
            },
            {
              key: "pause",
              value: function() {
                if (!this.backend.isPaused()) return this.backend.pause();
              }
            },
            {
              key: "playPause",
              value: function() {
                return this.backend.isPaused() ? this.play() : this.pause();
              }
            },
            {
              key: "isPlaying",
              value: function() {
                return !this.backend.isPaused();
              }
            },
            {
              key: "skipBackward",
              value: function(e) {
                this.skip(-e || -this.params.skipLength);
              }
            },
            {
              key: "skipForward",
              value: function(e) {
                this.skip(e || this.params.skipLength);
              }
            },
            {
              key: "skip",
              value: function(e) {
                var t = this.getDuration() || 1,
                  a = this.getCurrentTime() || 0;
                (a = Math.max(0, Math.min(t, a + (e || 0)))),
                  this.seekAndCenter(a / t);
              }
            },
            {
              key: "seekAndCenter",
              value: function(e) {
                this.seekTo(e), this.drawer.recenter(e);
              }
            },
            {
              key: "seekTo",
              value: function(e) {
                var t = this;
                if ("number" !== typeof e || !isFinite(e) || e < 0 || e > 1)
                  throw new Error(
                    "Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!"
                  );
                this.fireEvent("interaction", function() {
                  return t.seekTo(e);
                });
                var a = this.backend.isPaused();
                a || this.backend.pause();
                var n = this.params.scrollParent;
                (this.params.scrollParent = !1),
                  this.backend.seekTo(e * this.getDuration()),
                  this.drawer.progress(e),
                  a || this.backend.play(),
                  (this.params.scrollParent = n),
                  this.fireEvent("seek", e);
              }
            },
            {
              key: "stop",
              value: function() {
                this.pause(), this.seekTo(0), this.drawer.progress(0);
              }
            },
            {
              key: "setSinkId",
              value: function(e) {
                return this.backend.setSinkId(e);
              }
            },
            {
              key: "setVolume",
              value: function(e) {
                this.backend.setVolume(e), this.fireEvent("volume", e);
              }
            },
            {
              key: "getVolume",
              value: function() {
                return this.backend.getVolume();
              }
            },
            {
              key: "setPlaybackRate",
              value: function(e) {
                this.backend.setPlaybackRate(e);
              }
            },
            {
              key: "getPlaybackRate",
              value: function() {
                return this.backend.getPlaybackRate();
              }
            },
            {
              key: "toggleMute",
              value: function() {
                this.setMute(!this.isMuted);
              }
            },
            {
              key: "setMute",
              value: function(e) {
                e !== this.isMuted
                  ? (this.backend.setMute
                      ? (this.backend.setMute(e), (this.isMuted = e))
                      : e
                      ? ((this.savedVolume = this.backend.getVolume()),
                        this.backend.setVolume(0),
                        (this.isMuted = !0),
                        this.fireEvent("volume", 0))
                      : (this.backend.setVolume(this.savedVolume),
                        (this.isMuted = !1),
                        this.fireEvent("volume", this.savedVolume)),
                    this.fireEvent("mute", this.isMuted))
                  : this.fireEvent("mute", this.isMuted);
              }
            },
            {
              key: "getMute",
              value: function() {
                return this.isMuted;
              }
            },
            {
              key: "getFilters",
              value: function() {
                return this.backend.filters || [];
              }
            },
            {
              key: "toggleScroll",
              value: function() {
                (this.params.scrollParent = !this.params.scrollParent),
                  this.drawBuffer();
              }
            },
            {
              key: "toggleInteraction",
              value: function() {
                this.params.interact = !this.params.interact;
              }
            },
            {
              key: "getWaveColor",
              value: function() {
                return this.params.waveColor;
              }
            },
            {
              key: "setWaveColor",
              value: function(e) {
                (this.params.waveColor = e), this.drawBuffer();
              }
            },
            {
              key: "getProgressColor",
              value: function() {
                return this.params.progressColor;
              }
            },
            {
              key: "setProgressColor",
              value: function(e) {
                (this.params.progressColor = e), this.drawBuffer();
              }
            },
            {
              key: "getBackgroundColor",
              value: function() {
                return this.params.backgroundColor;
              }
            },
            {
              key: "setBackgroundColor",
              value: function(e) {
                (this.params.backgroundColor = e),
                  lt(this.container, {
                    background: this.params.backgroundColor
                  });
              }
            },
            {
              key: "getCursorColor",
              value: function() {
                return this.params.cursorColor;
              }
            },
            {
              key: "setCursorColor",
              value: function(e) {
                (this.params.cursorColor = e), this.drawer.updateCursor();
              }
            },
            {
              key: "getHeight",
              value: function() {
                return this.params.height;
              }
            },
            {
              key: "setHeight",
              value: function(e) {
                (this.params.height = e),
                  this.drawer.setHeight(e * this.params.pixelRatio),
                  this.drawBuffer();
              }
            },
            {
              key: "setFilteredChannels",
              value: function(e) {
                (this.params.splitChannelsOptions.filterChannels = e),
                  this.drawBuffer();
              }
            },
            {
              key: "drawBuffer",
              value: function() {
                var e,
                  t = Math.round(
                    this.getDuration() *
                      this.params.minPxPerSec *
                      this.params.pixelRatio
                  ),
                  a = this.drawer.getWidth(),
                  n = t,
                  r = 0,
                  i = Math.max(r + a, n);
                if (
                  (this.params.fillParent &&
                    (!this.params.scrollParent || t < a) &&
                    ((n = a), (r = 0), (i = n)),
                  this.params.partialRender)
                ) {
                  var s,
                    o = this.peakCache.addRangeToPeakCache(n, r, i);
                  for (s = 0; s < o.length; s++)
                    (e = this.backend.getPeaks(n, o[s][0], o[s][1])),
                      this.drawer.drawPeaks(e, n, o[s][0], o[s][1]);
                } else
                  (e = this.backend.getPeaks(n, r, i)),
                    this.drawer.drawPeaks(e, n, r, i);
                this.fireEvent("redraw", e, n);
              }
            },
            {
              key: "zoom",
              value: function(e) {
                e
                  ? ((this.params.minPxPerSec = e),
                    (this.params.scrollParent = !0))
                  : ((this.params.minPxPerSec = this.defaultParams.minPxPerSec),
                    (this.params.scrollParent = !1)),
                  this.drawBuffer(),
                  this.drawer.progress(this.backend.getPlayedPercents()),
                  this.drawer.recenter(
                    this.getCurrentTime() / this.getDuration()
                  ),
                  this.fireEvent("zoom", e);
              }
            },
            {
              key: "loadArrayBuffer",
              value: function(e) {
                var t = this;
                this.decodeArrayBuffer(e, function(e) {
                  t.isDestroyed || t.loadDecodedBuffer(e);
                });
              }
            },
            {
              key: "loadDecodedBuffer",
              value: function(e) {
                this.backend.load(e),
                  this.drawBuffer(),
                  (this.isReady = !0),
                  this.fireEvent("ready");
              }
            },
            {
              key: "loadBlob",
              value: function(e) {
                var t = this,
                  a = new FileReader();
                a.addEventListener("progress", function(e) {
                  return t.onProgress(e);
                }),
                  a.addEventListener("load", function(e) {
                    return t.loadArrayBuffer(e.target.result);
                  }),
                  a.addEventListener("error", function() {
                    return t.fireEvent("error", "Error reading file");
                  }),
                  a.readAsArrayBuffer(e),
                  this.empty();
              }
            },
            {
              key: "load",
              value: function(e, t, a, n) {
                if (!e) throw new Error("url parameter cannot be empty");
                if ((this.empty(), a)) {
                  var r = {
                      "Preload is not 'auto', 'none' or 'metadata'":
                        -1 === ["auto", "metadata", "none"].indexOf(a),
                      "Peaks are not provided": !t,
                      "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'":
                        -1 ===
                        ["MediaElement", "MediaElementWebAudio"].indexOf(
                          this.params.backend
                        ),
                      "Url is not of type string": "string" !== typeof e
                    },
                    i = Object.keys(r).filter(function(e) {
                      return r[e];
                    });
                  i.length &&
                    (console.warn(
                      "Preload parameter of wavesurfer.load will be ignored because:\n\t- " +
                        i.join("\n\t- ")
                    ),
                    (a = null));
                }
                switch (this.params.backend) {
                  case "WebAudio":
                    return this.loadBuffer(e, t, n);
                  case "MediaElement":
                  case "MediaElementWebAudio":
                    return this.loadMediaElement(e, t, a, n);
                }
              }
            },
            {
              key: "loadBuffer",
              value: function(e, t, a) {
                var n = this,
                  r = function(t) {
                    return (
                      t && n.tmpEvents.push(n.once("ready", t)),
                      n.getArrayBuffer(e, function(e) {
                        return n.loadArrayBuffer(e);
                      })
                    );
                  };
                if (!t) return r();
                this.backend.setPeaks(t, a),
                  this.drawBuffer(),
                  this.tmpEvents.push(this.once("interaction", r));
              }
            },
            {
              key: "loadMediaElement",
              value: function(e, t, a, n) {
                var r = this,
                  i = e;
                if ("string" === typeof e)
                  this.backend.load(i, this.mediaContainer, t, a);
                else {
                  var s = e;
                  this.backend.loadElt(s, t), (i = s.src);
                }
                this.tmpEvents.push(
                  this.backend.once("canplay", function() {
                    r.backend.destroyed ||
                      (r.drawBuffer(), (r.isReady = !0), r.fireEvent("ready"));
                  }),
                  this.backend.once("error", function(e) {
                    return r.fireEvent("error", e);
                  })
                ),
                  t && (this.backend.setPeaks(t, n), this.drawBuffer()),
                  (t && !this.params.forceDecode) ||
                    !this.backend.supportsWebAudio() ||
                    this.getArrayBuffer(i, function(e) {
                      r.decodeArrayBuffer(e, function(e) {
                        (r.backend.buffer = e),
                          r.backend.setPeaks(null),
                          r.drawBuffer(),
                          r.fireEvent("waveform-ready");
                      });
                    });
              }
            },
            {
              key: "decodeArrayBuffer",
              value: function(e, t) {
                var a = this;
                (this.arraybuffer = e),
                  this.backend.decodeArrayBuffer(
                    e,
                    function(n) {
                      a.isDestroyed ||
                        a.arraybuffer != e ||
                        (t(n), (a.arraybuffer = null));
                    },
                    function() {
                      return a.fireEvent("error", "Error decoding audiobuffer");
                    }
                  );
              }
            },
            {
              key: "getArrayBuffer",
              value: function(e, t) {
                var a = this,
                  n = Object.assign(
                    { url: e, responseType: "arraybuffer" },
                    this.params.xhr
                  ),
                  r = mt(n);
                return (
                  (this.currentRequest = r),
                  this.tmpEvents.push(
                    r.on("progress", function(e) {
                      a.onProgress(e);
                    }),
                    r.on("success", function(e) {
                      t(e), (a.currentRequest = null);
                    }),
                    r.on("error", function(e) {
                      a.fireEvent("error", e), (a.currentRequest = null);
                    })
                  ),
                  r
                );
              }
            },
            {
              key: "onProgress",
              value: function(e) {
                var t;
                (t = e.lengthComputable
                  ? e.loaded / e.total
                  : e.loaded / (e.loaded + 1e6)),
                  this.fireEvent("loading", Math.round(100 * t), e.target);
              }
            },
            {
              key: "exportPCM",
              value: function(e, t, a, n, r) {
                (e = e || 1024), (n = n || 0), (t = t || 1e4), (a = a || !1);
                var i = this.backend.getPeaks(e, n, r),
                  s = [].map.call(i, function(e) {
                    return Math.round(e * t) / t;
                  });
                return new Promise(function(e, t) {
                  var n = JSON.stringify(s);
                  a ||
                    window.open(
                      "data:application/json;charset=utf-8," +
                        encodeURIComponent(n)
                    ),
                    e(n);
                });
              }
            },
            {
              key: "exportImage",
              value: function(e, t, a) {
                return (
                  e || (e = "image/png"),
                  t || (t = 1),
                  a || (a = "dataURL"),
                  this.drawer.getImage(e, t, a)
                );
              }
            },
            {
              key: "cancelAjax",
              value: function() {
                this.currentRequest &&
                  this.currentRequest.controller &&
                  (this.currentRequest.controller.abort(),
                  (this.currentRequest = null));
              }
            },
            {
              key: "clearTmpEvents",
              value: function() {
                this.tmpEvents.forEach(function(e) {
                  return e.un();
                });
              }
            },
            {
              key: "empty",
              value: function() {
                this.backend.isPaused() ||
                  (this.stop(), this.backend.disconnectSource()),
                  (this.isReady = !1),
                  this.cancelAjax(),
                  this.clearTmpEvents(),
                  this.drawer.progress(0),
                  this.drawer.setWidth(0),
                  this.drawer.drawPeaks({ length: this.drawer.getWidth() }, 0);
              }
            },
            {
              key: "destroy",
              value: function() {
                this.destroyAllPlugins(),
                  this.cancelAjax(),
                  this.clearTmpEvents(),
                  this.unAll(),
                  !1 !== this.params.responsive &&
                    (window.removeEventListener("resize", this._onResize, !0),
                    window.removeEventListener(
                      "orientationchange",
                      this._onResize,
                      !0
                    )),
                  this.backend && this.backend.destroy(),
                  this.drawer && this.drawer.destroy(),
                  (this.isDestroyed = !0),
                  (this.isReady = !1),
                  (this.arraybuffer = null);
              }
            }
          ]),
          a
        );
      })(nt);
    Object(et["a"])(At, "util", n);
    var _t = {
        name: "WaveSurfer.vue",
        data: function() {
          return { wavesurfer: null, options: {} };
        },
        props: {
          source: { type: String, default: "" },
          audioRate: { type: Number, default: 1 },
          audioContext: { type: Object, default: function() {} },
          audioScriptProcessor: { type: Object, default: function() {} },
          autoCenter: { type: Boolean, default: !0 },
          backend: { type: String, default: "WebAudio" },
          backgroundColor: { type: String, default: "" },
          barGap: {
            validator: function(e) {
              return "number" === typeof e || null === e;
            },
            default: null
          },
          barHeight: { type: Number, default: 1 },
          barMinHeight: {
            validator: function(e) {
              return "number" === typeof e || null === e;
            },
            default: null
          },
          barRadius: { type: Number, default: 0 },
          barWidth: {
            validator: function(e) {
              return "number" === typeof e || null === e;
            },
            default: null
          },
          closeAudioContext: { type: Boolean, default: !1 },
          cursorColor: { type: String, default: "#333" },
          cursorWidth: { type: Number, default: 1 },
          drawingContextAttributes: {
            type: Object,
            default: function() {
              return { desynchronized: !0 };
            }
          },
          fillParent: { type: Boolean, default: !0 },
          forceDecode: { type: Boolean, default: !1 },
          height: { type: Number, default: 128 },
          hideScrollbar: { type: Boolean, default: !1 },
          interact: { type: Boolean, default: !0 },
          loopSelection: { type: Boolean, default: !0 },
          maxCanvasWidth: { type: Number, default: 4e3 },
          mediaControls: { type: Boolean, default: !1 },
          mediaType: { type: String, default: "audio" },
          minPxPerSec: { type: Number, default: 50 },
          normalize: { type: Boolean, default: !1 },
          partialRender: { type: Boolean, default: !1 },
          pixelRatio: { type: Number, default: 1 },
          progressColor: { type: String, default: "#555" },
          removeMediaElementOnDestroy: { type: Boolean, default: !0 },
          responsive: { default: !1 },
          scrollParent: { type: Boolean, default: !1 },
          skipLength: { type: Number, default: 2 },
          splitChannels: { type: Boolean, default: !1 },
          waveColor: { type: String, default: "#999" },
          xhr: {
            type: Object,
            default: function() {
              return {};
            }
          }
        },
        watch: {
          source: function(e, t) {
            e != t && this.load(e);
          }
        },
        methods: {
          initWaveSurper: function() {
            var e = this;
            null === this.wavesurfer &&
              this.$nextTick(function() {
                var t = {
                  container: e.$refs.waveform,
                  audioRate: e.audioRate,
                  audioContext: e.audioContext,
                  audioScriptProcessor: e.audioScriptProcessor,
                  autoCenter: e.autoCenter,
                  backend: e.backend,
                  backgroundColor: e.backgroundColor,
                  barGap: e.barGap,
                  barHeight: e.barHeight,
                  barMinHeight: e.barMinHeight,
                  barRadius: e.barRadius,
                  barWidth: e.barWidth,
                  closeAudioContext: e.closeAudioContext,
                  cursorColor: e.cursorColor,
                  cursorWidth: e.cursorWidth,
                  drawingContextAttributes: e.drawingContextAttributes,
                  fillParent: e.fillParent,
                  forceDecode: e.forceDecode,
                  height: e.height,
                  hideScrollbar: e.hideScrollbar,
                  interact: e.interact,
                  loopSelection: e.loopSelection,
                  maxCanvasWidth: e.maxCanvasWidth,
                  mediaControls: e.mediaControls,
                  mediaType: e.mediaType,
                  minPxPerSec: e.minPxPerSec,
                  normalize: e.normalize,
                  partialRender: e.partialRender,
                  pixelRatio: e.pixelRatio,
                  progressColor: e.progressColor,
                  removeMediaElementOnDestroy: e.removeMediaElementOnDestroy,
                  responsive: e.responsive,
                  scrollParent: e.scrollParent,
                  skipLength: e.skipLength,
                  splitChannels: e.splitChannels,
                  waveColor: e.waveColor,
                  xhr: e.xhr
                };
                e.$refs.waveform &&
                  ((e.wavesurfer = At.create(t)),
                  e.wavesurfer.on("audioprocess", e.onAudioprocess),
                  e.wavesurfer.on("dblclick", e.onDblClick),
                  e.wavesurfer.on("error", e.onError),
                  e.wavesurfer.on("finish", e.onFinish),
                  e.wavesurfer.on("interaction", e.onInteraction),
                  e.wavesurfer.on("loading", e.onLoading),
                  e.wavesurfer.on("mute", e.onMute),
                  e.wavesurfer.on("pause", e.onPause),
                  e.wavesurfer.on("play", e.onPlay),
                  e.wavesurfer.on("ready", e.onReady),
                  e.wavesurfer.on("scroll", e.onScroll),
                  e.wavesurfer.on("seek", e.onSeek),
                  e.wavesurfer.on("volume", e.onVolume),
                  e.wavesurfer.on("waveform-ready", e.onWaveformReady),
                  e.wavesurfer.on("zoom", e.onZoom)),
                  e.source && e.load(e.source);
              });
          },
          runWaveSurfer: function(e) {
            var t,
              a =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
            return this.wavesurfer
              ? a
                ? (t = this.wavesurfer)[e].apply(t, Object(Xe["a"])(a))
                : this.wavesurfer[e]()
              : null;
          },
          onAudioprocess: function(e) {
            this.$emit("audioprocess", e);
          },
          onDblclick: function(e) {
            this.$emit("dblclick", e);
          },
          onDestroy: function(e) {
            this.$emit("destroy", e);
          },
          onError: function(e) {
            this.$emit("error", e);
          },
          onFinish: function(e) {
            this.$emit("finish", e);
          },
          onInteraction: function(e) {
            this.$emit("interaction", e);
          },
          onLoading: function(e) {
            this.$emit("loading", e);
          },
          onMute: function(e) {
            this.$emit("mute", e);
          },
          onPause: function(e) {
            this.$emit("pause", e);
          },
          onPlay: function(e) {
            this.$emit("play", e);
          },
          onReady: function(e) {
            this.$emit("ready", e);
          },
          onScroll: function(e) {
            this.$emit("scroll", e);
          },
          onSeek: function(e) {
            this.$emit("seek", e);
          },
          onVolume: function(e) {
            this.$emit("volume", e);
          },
          onZoom: function(e) {
            this.$emit("zoom", e);
          },
          onWaveformReady: function(e) {
            this.$emit("waveform-ready", e);
          },
          cancelAjax: function() {
            return this.runWaveSurfer("cancelAjax");
          },
          destroy: function() {
            var e = this.runWaveSurfer("destroy");
            return (this.wavesurfer = null), this.onDestroy(), e;
          },
          empty: function() {
            return this.runWaveSurfer("empty");
          },
          getActivePlugins: function() {
            return this.runWaveSurfer("getActivePlugins");
          },
          getBackgroundColor: function() {
            return this.runWaveSurfer("getBackgroundColor");
          },
          getCurrentTime: function() {
            return this.runWaveSurfer("getCurrentTime");
          },
          getCursorColor: function() {
            return this.runWaveSurfer("getCursorColor");
          },
          getDuration: function() {
            return this.runWaveSurfer("getDuration");
          },
          getPlaybackRate: function() {
            return this.runWaveSurfer("getPlaybackRate");
          },
          getProgressColor: function() {
            return this.runWaveSurfer("getProgressColor");
          },
          getVolume: function() {
            return this.runWaveSurfer("getVolume");
          },
          getMute: function() {
            return this.runWaveSurfer("getMute");
          },
          getFilters: function() {
            return this.runWaveSurfer("getFilters");
          },
          getWaveColor: function() {
            return this.runWaveSurfer("getCurrentTime");
          },
          exportPCM: function(e, t, a, n) {
            var r = [e, t, a, n];
            return this.runWaveSurfer("exportPCM", r);
          },
          isPlaying: function() {
            return this.runWaveSurfer("isPlaying");
          },
          load: function(e, t, a) {
            var n = [e, t, a];
            return this.runWaveSurfer("load", n);
          },
          loadBlob: function(e) {
            var t = [e];
            return this.runWaveSurfer("loadBlob", t);
          },
          on: function(e, t) {
            var a = [e, t];
            return this.runWaveSurfer("on", a);
          },
          un: function(e, t) {
            var a = [e, t];
            return this.runWaveSurfer("un", a);
          },
          unAll: function() {
            return this.runWaveSurfer("unAll");
          },
          pause: function() {
            return this.runWaveSurfer("pause");
          },
          play: function(e, t) {
            var a = [e, t];
            return this.runWaveSurfer("play", a);
          },
          playPause: function() {
            return this.runWaveSurfer("playPause");
          },
          seekAndCenter: function(e) {
            return this.runWaveSurfer("seekAndCenter", [e]);
          },
          seekTo: function(e) {
            return this.runWaveSurfer("seekTo", [e]);
          },
          setBackgroundColor: function(e) {
            return this.runWaveSurfer("setBackgroundColor", [e]);
          },
          setCursorColor: function(e) {
            return this.runWaveSurfer("setCursorColor", [e]);
          },
          setHeight: function(e) {
            return this.runWaveSurfer("setHeight", [e]);
          },
          setFilter: function(e) {
            return this.runWaveSurfer("setFilter", [e]);
          },
          setPlaybackRate: function(e) {
            return this.runWaveSurfer("setPlaybackRate", [e]);
          },
          setPlayEnd: function(e) {
            return this.runWaveSurfer("setPlayEnd", [e]);
          },
          setVolume: function(e) {
            return this.runWaveSurfer("setVolume", [e]);
          },
          setMute: function(e) {
            return this.runWaveSurfer("mute", [e]);
          },
          setProgressColor: function(e) {
            return this.runWaveSurfer("setProgressColor", [e]);
          },
          setWaveColor: function(e) {
            return this.runWaveSurfer("setWaveColor", [e]);
          },
          skip: function(e) {
            return this.runWaveSurfer("skip", [e]);
          },
          skipBackward: function() {
            return this.runWaveSurfer("skipBackward");
          },
          skipForward: function() {
            return this.runWaveSurfer("skipForward");
          },
          setSinkId: function(e) {
            return this.runWaveSurfer("setSinkId", [e]);
          },
          stop: function() {
            return this.runWaveSurfer("stop");
          },
          toggleMute: function() {
            return this.runWaveSurfer("toggleMute");
          },
          toggleInteraction: function() {
            return this.runWaveSurfer("toggleInteraction");
          },
          toggleScroll: function() {
            return this.runWaveSurfer("toggleScroll");
          },
          zoom: function(e) {
            return this.runWaveSurfer("zoom", [e]);
          }
        },
        mounted: function() {
          this.initWaveSurper();
        },
        beforeDestroy: function() {
          this.destroy();
        }
      },
      Ot = _t,
      Mt = Object(d["a"])(Ot, Ge, Ye, !1, null, "51621a17", null),
      Tt = Mt.exports,
      jt = {
        data: function() {
          return {
            title: "wavesurfer.vue>example>audio-element",
            desc: "How to load the audio.",
            snackbar: { show: !1, text: "" },
            template:
              '\n    <v-card class="mx-auto">\n      <v-card-text>\n        <v-file-input\n          accept="audio/*"\n          label="audio file"\n          @change="onFileChange"\n        />\n      </v-card-text>\n      <wave-surfer\n        ref="wavesurfer"\n        v-if="source"\n        :source="source"\n        :responsive="true"\n        @play="onPlay"\n        @pause="onPause"\n        @destroy="onDestroy"\n      />\n      <v-card-actions v-if="source">\n        <v-btn dark icon color="primary" @click="skipBackward">\n          <v-icon dark>mdi-skip-backward</v-icon>\n        </v-btn>\n        <v-spacer />\n        <v-btn dark icon color="primary" @click="playPause">\n          <v-icon dark>mdi-play-pause</v-icon>\n        </v-btn>\n        <v-btn dark icon color="primary" @click="play">\n          <v-icon dark>mdi-play</v-icon>\n        </v-btn>\n        <v-btn dark icon color="primary" @click="pause">\n          <v-icon dark>mdi-pause</v-icon>\n        </v-btn>\n        <v-spacer />\n        <v-btn dark icon color="primary" @click="skipForward">\n          <v-icon dark>mdi-skip-forward</v-icon>\n        </v-btn>\n      </v-card-actions>\n      <v-snackbar v-model="snackbar.show">\n        {{ snackbar.text }}\n      </v-snackbar>\n    </v-card>\n    ',
            code:
              '\n    import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";\n    export default {\n      data: () => ({\n        source: null,\n        snackbar: {\n          show: false,\n          text: ""\n        },\n      }),\n      components: { WaveSurfer },\n      methods: {\n        onFileChange: function(file) {\n          const fr = new FileReader();\n          fr.readAsDataURL(file);\n          fr.addEventListener("load", () => {\n            this.source = fr.result;\n          });\n        },\n        onPlay: function() {\n          this.snackbar.text = "on play";\n          this.snackbar.show = true;\n        },\n        onPause: function() {\n          this.snackbar.text = "on pause";\n          this.snackbar.show = true;\n        },\n        onDestroy: function() {\n          this.snackbar.text = "on destroy";\n          this.snackbar.show = true;\n        },\n        play: function() {\n          this.$refs.wavesurfer.play();\n        },\n        pause: function() {\n          if (this.$refs.wavesurfer) {\n            this.$refs.wavesurfer.pause();\n          }\n        },\n        playPause: function() {\n          if (this.$refs.wavesurfer) {\n            this.$refs.wavesurfer.playPause();\n          }\n        },\n        skipBackward: function() {\n          if (this.$refs.wavesurfer) {\n            this.$refs.wavesurfer.skipBackward();\n          }\n        },\n        skipForward: function() {\n          if (this.$refs.wavesurfer) {\n            this.$refs.wavesurfer.skipForward();\n          }\n        }\n      }\n    };\n    ',
            source: null
          };
        },
        components: { WExampleLayout: Ue, WaveSurfer: Tt },
        methods: {
          onFileChange: function(e) {
            var t = this;
            if (e) {
              var a = new FileReader();
              a.readAsDataURL(e),
                a.addEventListener("load", function() {
                  t.source = a.result;
                });
            } else this.source = null;
          },
          onPlay: function() {
            (this.snackbar.text = "on play"), (this.snackbar.show = !0);
          },
          onPause: function() {
            (this.snackbar.text = "on pause"), (this.snackbar.show = !0);
          },
          onDestroy: function() {
            (this.snackbar.text = "on destroy"), (this.snackbar.show = !0);
          },
          play: function() {
            this.$refs.wavesurfer && this.$refs.wavesurfer.play();
          },
          pause: function() {
            this.$refs.wavesurfer && this.$refs.wavesurfer.pause();
          },
          playPause: function() {
            this.$refs.wavesurfer && this.$refs.wavesurfer.playPause();
          },
          skipBackward: function() {
            this.$refs.wavesurfer && this.$refs.wavesurfer.skipBackward();
          },
          skipForward: function() {
            this.$refs.wavesurfer && this.$refs.wavesurfer.skipForward();
          }
        }
      },
      Lt = jt,
      $t = a("b0af"),
      Bt = a("99d9"),
      Dt = a("23a7"),
      Vt = a("2db4"),
      It = a("afd9"),
      Nt = a("71d9"),
      Ft = Object(d["a"])(Lt, We, Ae, !1, null, "401368ee", null),
      zt = Ft.exports;
    f()(Ft, {
      VAppBarNavIcon: v["a"],
      VBtn: m["a"],
      VCard: $t["a"],
      VCardActions: Bt["a"],
      VCardText: Bt["b"],
      VFileInput: Dt["a"],
      VIcon: g["a"],
      VSnackbar: Vt["a"],
      VSpacer: y["a"],
      VSystemBar: It["a"],
      VToolbar: Nt["a"],
      VToolbarTitle: k["a"]
    });
    var Ht = "example",
      qt = [
        {
          path: "/".concat(Ht, "/audio-element"),
          name: "".concat(Ht, "-audio-element"),
          text: "Audio-Element",
          component: zt
        }
      ],
      Ut = function() {
        var e = this,
          t = e.$createElement,
          a = e._self._c || t;
        return a(
          "v-container",
          { staticClass: "grey lighten-2 fill-height", attrs: { fluid: "" } },
          [
            a(
              "v-row",
              [
                a(
                  "v-col",
                  [
                    a("w-jumbotron", {
                      attrs: { heading: "wavesurfer.vue/example/home" }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            a(
              "v-row",
              [
                a(
                  "v-col",
                  [
                    a(
                      "v-card",
                      [
                        a(
                          "v-list",
                          e._l(e.routes, function(t, n) {
                            return a(
                              "v-list-group",
                              {
                                key: n,
                                attrs: { "prepend-icon": t.icon, value: !0 },
                                scopedSlots: e._u(
                                  [
                                    {
                                      key: "activator",
                                      fn: function() {
                                        return [
                                          a("v-list-item-title", [
                                            e._v(
                                              " " + e._s(n.toUpperCase()) + " "
                                            )
                                          ])
                                        ];
                                      },
                                      proxy: !0
                                    }
                                  ],
                                  null,
                                  !0
                                )
                              },
                              e._l(t.items, function(t) {
                                return a(
                                  "v-list-item",
                                  { key: t.name, attrs: { link: "" } },
                                  [
                                    a(
                                      "v-list-item-icon",
                                      [
                                        a("v-icon", [
                                          e._v(" " + e._s(t.icon) + " ")
                                        ])
                                      ],
                                      1
                                    ),
                                    a("v-list-item-title", {
                                      domProps: { textContent: e._s(t.text) }
                                    })
                                  ],
                                  1
                                );
                              }),
                              1
                            );
                          }),
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        );
      },
      Gt = [],
      Yt = {
        name: "Home",
        components: { WJumbotron: Q },
        computed: {
          routes: function() {
            var e,
              t = {
                main: { icon: "mdi-apps", items: [] },
                documents: { icon: "mdi-file-document", items: [] },
                examples: { icon: "mdi-xml", items: [] }
              },
              a = Object(E["a"])(this.$router.options.routes);
            try {
              for (a.s(); !(e = a.n()).done; ) {
                var n = e.value;
                n.name.match(/docs-/)
                  ? t.documents.items.push(n)
                  : n.name.match(/example-/)
                  ? t.examples.items.push(n)
                  : t.main.items.push(n);
              }
            } catch (r) {
              a.e(r);
            } finally {
              a.f();
            }
            return t;
          }
        }
      },
      Xt = Yt,
      Jt = a("34c3"),
      Zt = Object(d["a"])(Xt, Ut, Gt, !1, null, null, null),
      Kt = Zt.exports;
    f()(Zt, {
      VCard: $t["a"],
      VCol: ae["a"],
      VContainer: ne["a"],
      VIcon: g["a"],
      VList: W["a"],
      VListGroup: A["a"],
      VListItem: _["a"],
      VListItemIcon: Jt["a"],
      VListItemTitle: M["c"],
      VRow: re["a"]
    }),
      r["a"].use(z["a"]);
    var Qt = [
      { path: "/", name: "Home", text: "Home", component: Kt },
      {
        path: "/about",
        name: "About",
        text: "About",
        component: function() {
          return a.e("chunk-2d22d746").then(a.bind(null, "f820"));
        }
      }
    ];
    (Qt = Qt.concat(Re)), (Qt = Qt.concat(qt));
    var ea = new z["a"]({
        mode: "history",
        base: "/wavesurfer.vue/",
        routes: Qt
      }),
      ta = a("2f62"),
      aa = {
        namespaced: !0,
        state: function() {
          return { drawer: !1, search: "" };
        },
        mutations: {
          set_drawer: function(e, t) {
            e.drawer = t;
          },
          set_search: function(e, t) {
            e.search = t;
          }
        },
        actions: {}
      };
    r["a"].use(ta["a"]);
    var na = new ta["a"].Store({
        state: {
          app_name: "wavesurfer.vue",
          github: "https://github.com/qh73xe/wavesurfer.vue"
        },
        mutations: {},
        actions: {},
        modules: { app_bar: aa }
      }),
      ra = a("f309"),
      ia = {
        badge: "バッジ",
        close: "閉じる",
        dataIterator: {
          noResultsText: "検索結果が見つかりません。",
          loadingText: "項目をロード中です..."
        },
        dataTable: {
          itemsPerPageText: "1ページあたりの行数：",
          ariaLabel: {
            sortDescending: "降順の並び替え。",
            sortAscending: "昇順の並び替え。",
            sortNone: "ソートされていません。",
            activateNone: "ソートを削除するには有効にしてください。",
            activateDescending: "降順の並び替えのためには有効にしてください。",
            activateAscending: "昇順のソートのためには有効にしてください。"
          },
          sortBy: "ソート方式"
        },
        dataFooter: {
          itemsPerPageText: "1ページあたりの件数：",
          itemsPerPageAll: "すべて",
          nextPage: "次のページ",
          prevPage: "前のページ",
          firstPage: "一ページ目",
          lastPage: "最後のページ",
          pageText: "{0}-{1} 件目 / {2}件"
        },
        datePicker: {
          itemsSelected: "{0}日付選択",
          nextMonthAriaLabel: "来月",
          nextYearAriaLabel: "来年",
          prevMonthAriaLabel: "前月",
          prevYearAriaLabel: "前年"
        },
        noDataText: "データはありません。",
        carousel: {
          prev: "前のビジュアル",
          next: "次のビジュアル",
          ariaLabel: { delimiter: "Carousel slide {0} of {1}" }
        },
        calendar: { moreEvents: "さらに{0}" },
        fileInput: {
          counter: "{0} ファイル",
          counterSize: "{0} ファイル (合計 {1})"
        },
        timePicker: { am: "AM", pm: "PM" },
        pagination: {
          ariaLabel: {
            wrapper: "ページネーションナビゲーション",
            next: "次のページ",
            previous: "前のページ",
            page: "ページに移動 {0}",
            currentPage: "現在のページ、ページ {0}"
          }
        },
        document: {
          options: {
            desc:
              "以下に <wave-suefer /> コンポーネントが受け入れる props の一覧を示します.",
            headers: {
              option: "オプション",
              type: "型",
              default: "デフォルト",
              description: "説明"
            },
            options: {
              audioRate:
                "オーディオを再生する速度. 数値が小さいほど遅くなります.",
              audioContext:
                "初期化時に使用した独自の AudioContext または, null のままにします.",
              audioScriptProcessor:
                "初期化時に使用した ScriptProcessorNode または null を使用します.",
              autoCenter:
                "スクロールバーが表示されている場合, 波形を進行状況の中央に配置します.",
              backend:
                "`WebAudio`, `MediaElement` または `MediaElementWebAudio`. `MediaElement` は, サポートされていないブラウザーのフォールバックです.",
              backgroundColor: "波形コンテナの背景色を変更します.",
              barGap:
                "提供されない場合, 波形のバー間のオプションの間隔は, レガシー形式で計算されます",
              barHeight:
                "波形バーの高さ. 1 より大きい数は, 波形バーの高さを増やします.",
              barMinHeight:
                "波形バーを描画するための最小の高さ. デフォルトの動作では, ミュート時にはバーを描画しません.",
              barRadius: "バーを丸める半径.",
              barWidth: "指定すると, このように波形が描画されます: ▁ ▂ ▇ ▃ ▅ ▂",
              closeAudioContext:
                "`destroy` メソッドが呼び出されたときに, すべてのオーディオコンテキストを無効にします.",
              cursorColor: "再生ヘッドの位置を示すカーソルの塗りつぶし色.",
              cursorWidth: "ピクセル単位で測定されます.",
              drawingContextAttributes:
                "キャンバスの 2D 描画コンテキスト属性を指定します.",
              fillParent:
                "コンテナ全体を満たすか, minPxPerSec に従ってのみ描画するか.",
              forceDecode:
                "ズーム時に Web オーディオを使用してオーディオを強制的にデコードし, より詳細な波形を取得します.",
              height: "波形の高さ. ピクセル単位で測定されます.",
              hideScrollbar:
                "通常は表示されるときに水平スクロールバーを非表示にするかどうか.",
              interact:
                "初期化時にマウス操作を有効にするかどうか. このパラメータは後でいつでも切り替えることができます.",
              loopSelection:
                "(regins plugin で使用) 選択したリージョンのループを有効にします.",
              maxCanvasWidth:
                "小さなオーバーラップを除いた, ピクセル単位の単一キャンバスの最大幅 (2 * pixelRatio、次の偶数の整数に切り上げ). 波形がこの値よりも長い場合, 追加のキャンバスを使用して波形をレンダリングします.これは, ブラウザが単一のキャンバスに描画するには広すぎる可能性がある非常に大きな波形に役立ちます.このパラメーターは, MultiCanvas レンダラーにのみ適用されます.",
              mediaControls:
                "(バックエンドMediaElementで使用) これにより, メディア要素のネイティブコントロールが有効になります.",
              mediaType:
                "'audio' または 'video'. バックエンドが `MediaElement` の場合のみ使用されます.",
              minPxPerSec: "オーディオの 1 秒あたりの最小ピクセル数.",
              normalize: "true の場合, 1.0ではなく最大ピークで正規化します.",
              partialRender:
                "PeakCache を使用して, 波形のレンダリング速度を向上させます.",
              pixelRatio:
                "より速くレンダリングするためには 1 に設定してください",
              progressColor:
                "カーソルの後ろの波形部分の塗りつぶし色. `progressColor` と `waveColor` が同じ場合, 進行波はレンダリングされません.",
              removeMediaElementOnDestroy:
                "プレーヤー破棄時にメディア要素を DOM に保持するには, false に設定します. これは, loadMediaElement メソッドを介して既存のメディア要素を再利用する場合に役立ちます.",
              responsive:
                "true に設定すると, ウィンドウのサイズが変更されたときに, 波形のサイズが変更されます. これは、デフォルトで 100ms のタイムアウトでデバウンスされます. このパラメーターが数値の場合, そのタイムアウトを表します.",
              scrollParent:
                "長い波形でコンテナをスクロールするかどうか. そうでない場合, 波形はコンテナの幅に縮小されます ( fillParent を参照).",
              skipLength:
                "`skipForward()` および skipBackward() メソッドでスキップする秒数.",
              splitChannels:
                "オーディオのチャンネルごとに別々の波形でレンダリングします.",
              waveColor: "カーソルの後の波形の塗りつぶし色.",
              xhr:
                "XHR オプション. 例えば以下のような値になります: `{ cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]}`"
            }
          },
          events: {
            desc:
              "`<wave-surfer>` コンポーネントから様々なプレーヤーイベントを受け取ることができます. ",
            descs: {
              audioprocess:
                "オーディオの再生中, またはシーク時に継続的に発火します.",
              dblclick: "インスタンスがダブルクリックされた時に発火します.",
              destroy: "インスタンスが破棄された際に発火します.",
              error:
                "エラー発生時に発火します. コールバックは `error message` (string) を受け取ります.",
              finish: "音声再生が終了した場合に発火します.",
              interaction:
                "`waveform` とのインタラクションが存在する際に発火します.",
              loading:
                "フェッチまたはドラッグアンドドロップを使用してロードするときに継続的に発火します. コールバックはロードの進行状況をパーセント[0..100] (integer) で受け取ります.",
              mute:
                "ミュート変更時に発火します. コールバックは新しいミュート状態 (boolean) を受け取ります.",
              pause: "音声再生が停止した際に発火します.",
              play: "音声再生が開始した際に発火します.",
              ready:
                "オーディオが読み込まれ, デコードされて, 波形が描画されます. これは, MediaElement を使用しているときに波形が描画される前に発火します. waveform-ready を参照してください.",
              scroll:
                "スクロールバーが移動した際に発火します. コールバックは `ScrollEvent` オブジェクトを受け取ります.",
              seek:
                "シーク時に発火します. コールバックは 進行状況 [0..1] (float) を受け取ります.",
              volume:
                "ボリューム変更時に発火します. コールバックは新しいボリューム (integer) を受け取ります.",
              "waveform-ready":
                "`MediaElement` バックエンドを使用している場合, 波形が描画された後に発火します. `WebAudio` バックエンドを使用している場合には, `ready` を使用できます.",
              zoom:
                "ズーム時に発火します. コールバックは `minPxPerSec` (integer) を受け取ります."
            }
          }
        }
      },
      sa = {
        badge: "Badge",
        close: "Close",
        dataIterator: {
          noResultsText: "No matching records found",
          loadingText: "Loading items..."
        },
        dataTable: {
          itemsPerPageText: "Rows per page:",
          ariaLabel: {
            sortDescending: "Sorted descending.",
            sortAscending: "Sorted ascending.",
            sortNone: "Not sorted.",
            activateNone: "Activate to remove sorting.",
            activateDescending: "Activate to sort descending.",
            activateAscending: "Activate to sort ascending."
          },
          sortBy: "Sort by"
        },
        dataFooter: {
          itemsPerPageText: "Items per page:",
          itemsPerPageAll: "All",
          nextPage: "Next page",
          prevPage: "Previous page",
          firstPage: "First page",
          lastPage: "Last page",
          pageText: "{0}-{1} of {2}"
        },
        datePicker: {
          itemsSelected: "{0} selected",
          nextMonthAriaLabel: "Next month",
          nextYearAriaLabel: "Next year",
          prevMonthAriaLabel: "Previous month",
          prevYearAriaLabel: "Previous year"
        },
        noDataText: "No data available",
        carousel: {
          prev: "Previous visual",
          next: "Next visual",
          ariaLabel: { delimiter: "Carousel slide {0} of {1}" }
        },
        calendar: { moreEvents: "{0} more" },
        fileInput: {
          counter: "{0} files",
          counterSize: "{0} files ({1} in total)"
        },
        timePicker: { am: "AM", pm: "PM" },
        pagination: {
          ariaLabel: {
            wrapper: "Pagination Navigation",
            next: "Next page",
            previous: "Previous page",
            page: "Goto Page {0}",
            currentPage: "Current Page, Page {0}"
          }
        },
        document: {
          options: {
            desc:
              "This is the list of props you can pass to <wave-suefer /> to create an instance of the player.",
            headers: {
              option: "props",
              type: "type",
              default: "default",
              description: "description"
            },
            options: {
              audioRate:
                "Speed at which to play audio. Lower number is slower.",
              audioContext:
                "Use your own previously initialized AudioContext or leave blank.",
              audioScriptProcessor:
                "Use your own previously initialized ScriptProcessorNode or leave blank.",
              autoCenter:
                "If a scrollbar is present, center the waveform around the progress.",
              backend:
                "WebAudio, MediaElement or MediaElementWebAudio. MediaElement is a fallback for unsupported browsers.",
              backgroundColor:
                "Change background color of the waveform container.",
              barGap:
                "The optional spacing between bars of the wave, if not provided will be calculated in legacy format.",
              barHeight:
                "Height of the waveform bars. Higher number than 1 will increase the waveform bar heights.",
              barMinHeight:
                "Minimum height to draw a waveform bar. Default behavior is to not draw a bar during silence.",
              barRadius: "The radius that makes bars rounded.",
              barWidth:
                "If specified, the waveform will be drawn like this: ▁ ▂ ▇ ▃ ▅ ▂",
              closeAudioContext:
                "Close and nullify all audio contexts when the destroy method is called.",
              cursorColor:
                "The fill color of the cursor indicating the playhead position.",
              cursorWidth: "Measured in pixels.",
              drawingContextAttributes:
                "Specify canvas 2d drawing context attributes.",
              fillParent:
                "Whether to fill the entire container or draw only according to minPxPerSec.",
              forceDecode:
                "Force decoding of audio using web audio when zooming to get a more detailed waveform.",
              height: "The height of the waveform. Measured in pixels.",
              hideScrollbar:
                "Whether to hide the horizontal scrollbar when one would normally be shown.",
              interact:
                "Whether the mouse interaction will be enabled at initialization. You can switch this parameter at any time later on.",
              loopSelection:
                "(Use with regions plugin) Enable looping of selected regions.",
              maxCanvasWidth:
                "Maximum width of a single canvas in pixels, excluding a small overlap (2 * pixelRatio, rounded up to the next even integer). If the waveform is longer than this value, additional canvases will be used to render the waveform, which is useful for very large waveforms that may be too wide for browsers to draw on a single canvas. This parameter is only applicable to the MultiCanvas renderer.",
              mediaControls:
                "(Use with backend MediaElement) this enables the native controls for the media element.",
              mediaType:
                "'audio' or 'video'. Only used with backend MediaElement.",
              minPxPerSec: "Minimum number of pixels per second of audio.",
              normalize:
                "If true, normalize by the maximum peak instead of 1.0.",
              partialRender:
                "Use the PeakCache to improve rendering speed of large waveforms.",
              pixelRatio: "Can be set to 1 for faster rendering.",
              progressColor:
                "The fill color of the part of the waveform behind the cursor. When progressColor and waveColor are the same the progress wave is not rendered at all.",
              removeMediaElementOnDestroy:
                "Set to false to keep the media element in the DOM when the player is destroyed. This is useful when reusing an existing media element via the loadMediaElement method.",
              responsive:
                "If set to true resize the waveform, when the window is resized. This is debounced with a 100ms timeout by default. If this parameter is a number it represents that timeout.",
              scrollParent:
                "Whether to scroll the container with a lengthy waveform. Otherwise the waveform is shrunk to the container width (see fillParent).",
              skipLength:
                "Number of seconds to skip with the skipForward() and skipBackward() methods.",
              splitChannels:
                "Render with seperate waveforms for the channels of the audio.",
              waveColor: "The fill color of the waveform after the cursor.",
              xhr:
                "XHR options. For example: let xhr = { cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]};"
            }
          },
          events: {
            desc:
              "You can receive various player events from the `<wave-surfer>` component.",
            descs: {
              audioprocess:
                "Fires continuously as the audio plays. Also fires on seeking.",
              dblclick: "When instance is double-clicked.",
              destroy: "When instance is destroyed.",
              error:
                "Occurs on error. Callback will receive (string) error message.",
              finish: "When it finishes playing.",
              interaction: "When there's interaction with the waveform.",
              loading:
                "Fires continuously when loading using fetch or drag'n'drop. Callback will receive (integer) loading progress in percents [0..100].",
              mute:
                "On mute change. Callback will receive (boolean) new mute status.",
              pause: "When audio is paused.",
              play: "When playback starts.",
              ready:
                "When audio is loaded, decoded and the waveform drawn. This fires before the waveform is drawn when using MediaElement, see waveform-ready.",
              scroll:
                "When the scrollbar is moved. Callback will receive a ScrollEvent object.",
              seek:
                "On seeking. Callback will receive (float) progress [0..1].",
              volume:
                "On volume change. Callback will receive (integer) new volume.",
              "waveform-ready":
                "Fires after the waveform is drawn when using the MediaElement backend. If you're using the WebAudio backend, you can use ready.",
              zoom: "On zooming. Callback will receive (integer) minPxPerSec."
            }
          }
        }
      };
    r["a"].use(ra["a"]),
      r["a"].component("my-component", {
        methods: {
          changeLocale: function() {
            this.$vuetify.lang.current = "ja";
          }
        }
      });
    var oa = new ra["a"]({
        lang: { locales: { ja: ia, en: sa }, current: "ja" }
      }),
      la = a("d36c");
    (r["a"].config.productionTip = !1),
      new r["a"]({
        router: ea,
        store: na,
        vuetify: oa,
        render: function(e) {
          return e(N);
        }
      }).$mount("#app"),
      r["a"].use(la["a"]);
  },
  b05e: function(e, t, a) {}
});
//# sourceMappingURL=app.be8bb8b3.js.map
