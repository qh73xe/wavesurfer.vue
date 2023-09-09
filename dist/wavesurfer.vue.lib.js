import { defineComponent as O, ref as D, computed as _, watch as k, onMounted as z, openBlock as N, createElementBlock as $, renderSlot as G, createElementVNode as X } from "vue";
var j = globalThis && globalThis.__awaiter || function(d, t, e, i) {
  function n(r) {
    return r instanceof e ? r : new e(function(o) {
      o(r);
    });
  }
  return new (e || (e = Promise))(function(r, o) {
    function a(s) {
      try {
        h(i.next(s));
      } catch (l) {
        o(l);
      }
    }
    function c(s) {
      try {
        h(i.throw(s));
      } catch (l) {
        o(l);
      }
    }
    function h(s) {
      s.done ? r(s.value) : n(s.value).then(a, c);
    }
    h((i = i.apply(d, t || [])).next());
  });
};
function q(d, t) {
  return j(this, void 0, void 0, function* () {
    const e = new AudioContext({ sampleRate: t });
    return e.decodeAudioData(d).finally(() => e.close());
  });
}
function F(d) {
  const t = d[0];
  if (t.some((e) => e > 1 || e < -1)) {
    const e = t.length;
    let i = 0;
    for (let n = 0; n < e; n++) {
      const r = Math.abs(t[n]);
      r > i && (i = r);
    }
    for (const n of d)
      for (let r = 0; r < e; r++)
        n[r] /= i;
  }
  return d;
}
function V(d, t) {
  return typeof d[0] == "number" && (d = [d]), F(d), {
    duration: t,
    length: d[0].length,
    sampleRate: d[0].length / t,
    numberOfChannels: d.length,
    getChannelData: (e) => d == null ? void 0 : d[e],
    copyFromChannel: AudioBuffer.prototype.copyFromChannel,
    copyToChannel: AudioBuffer.prototype.copyToChannel
  };
}
const H = {
  decode: q,
  createBuffer: V
};
var B = globalThis && globalThis.__awaiter || function(d, t, e, i) {
  function n(r) {
    return r instanceof e ? r : new e(function(o) {
      o(r);
    });
  }
  return new (e || (e = Promise))(function(r, o) {
    function a(s) {
      try {
        h(i.next(s));
      } catch (l) {
        o(l);
      }
    }
    function c(s) {
      try {
        h(i.throw(s));
      } catch (l) {
        o(l);
      }
    }
    function h(s) {
      s.done ? r(s.value) : n(s.value).then(a, c);
    }
    h((i = i.apply(d, t || [])).next());
  });
};
function I(d, t, e) {
  var i, n;
  return B(this, void 0, void 0, function* () {
    const r = yield fetch(d, e);
    {
      const o = (i = r.clone().body) === null || i === void 0 ? void 0 : i.getReader(), a = Number((n = r.headers) === null || n === void 0 ? void 0 : n.get("Content-Length"));
      let c = 0;
      const h = (s, l) => B(this, void 0, void 0, function* () {
        if (s)
          return;
        c += (l == null ? void 0 : l.length) || 0;
        const u = Math.round(c / a * 100);
        return t(u), o == null ? void 0 : o.read().then(({ done: f, value: p }) => h(f, p));
      });
      o == null || o.read().then(({ done: s, value: l }) => h(s, l));
    }
    return r.blob();
  });
}
const U = {
  fetchBlob: I
};
class P {
  constructor() {
    this.listeners = {};
  }
  /** Subscribe to an event. Returns an unsubscribe function. */
  on(t, e) {
    return this.listeners[t] || (this.listeners[t] = /* @__PURE__ */ new Set()), this.listeners[t].add(e), () => this.un(t, e);
  }
  /** Subscribe to an event only once */
  once(t, e) {
    const i = this.on(t, e), n = this.on(t, () => {
      i(), n();
    });
    return i;
  }
  /** Unsubscribe from an event */
  un(t, e) {
    this.listeners[t] && (e ? this.listeners[t].delete(e) : delete this.listeners[t]);
  }
  /** Clear all events */
  unAll() {
    this.listeners = {};
  }
  /** Emit an event */
  emit(t, ...e) {
    this.listeners[t] && this.listeners[t].forEach((i) => i(...e));
  }
}
class Y extends P {
  constructor(t) {
    super(), t.media ? this.media = t.media : this.media = document.createElement("audio"), t.mediaControls && (this.media.controls = !0), t.autoplay && (this.media.autoplay = !0), t.playbackRate != null && this.onceMediaEvent("canplay", () => {
      t.playbackRate != null && (this.media.playbackRate = t.playbackRate);
    });
  }
  onMediaEvent(t, e, i) {
    return this.media.addEventListener(t, e, i), () => this.media.removeEventListener(t, e);
  }
  onceMediaEvent(t, e) {
    return this.onMediaEvent(t, e, { once: !0 });
  }
  getSrc() {
    return this.media.currentSrc || this.media.src || "";
  }
  revokeSrc() {
    const t = this.getSrc();
    t.startsWith("blob:") && URL.revokeObjectURL(t);
  }
  setSrc(t, e) {
    if (this.getSrc() === t)
      return;
    this.revokeSrc();
    const n = e instanceof Blob ? URL.createObjectURL(e) : t;
    this.media.src = n, this.media.load();
  }
  destroy() {
    this.media.pause(), this.revokeSrc(), this.media.src = "", this.media.load();
  }
  /** Start playing the audio */
  play() {
    return this.media.play();
  }
  /** Pause the audio */
  pause() {
    this.media.pause();
  }
  /** Check if the audio is playing */
  isPlaying() {
    return this.media.currentTime > 0 && !this.media.paused && !this.media.ended;
  }
  /** Jumpt to a specific time in the audio (in seconds) */
  setTime(t) {
    this.media.currentTime = t;
  }
  /** Get the duration of the audio in seconds */
  getDuration() {
    return this.media.duration;
  }
  /** Get the current audio position in seconds */
  getCurrentTime() {
    return this.media.currentTime;
  }
  /** Get the audio volume */
  getVolume() {
    return this.media.volume;
  }
  /** Set the audio volume */
  setVolume(t) {
    this.media.volume = t;
  }
  /** Get the audio muted state */
  getMuted() {
    return this.media.muted;
  }
  /** Mute or unmute the audio */
  setMuted(t) {
    this.media.muted = t;
  }
  /** Get the playback speed */
  getPlaybackRate() {
    return this.media.playbackRate;
  }
  /** Set the playback speed, pass an optional false to NOT preserve the pitch */
  setPlaybackRate(t, e) {
    e != null && (this.media.preservesPitch = e), this.media.playbackRate = t;
  }
  /** Get the HTML media element */
  getMediaElement() {
    return this.media;
  }
  /** Set a sink id to change the audio output device */
  setSinkId(t) {
    return this.media.setSinkId(t);
  }
}
function J(d, t, e, i, n = 5) {
  let r = () => {
  };
  if (!d)
    return r;
  const o = (a) => {
    if (a.button === 2)
      return;
    a.preventDefault(), a.stopPropagation();
    let c = a.clientX, h = a.clientY, s = !1;
    const l = (p) => {
      p.preventDefault(), p.stopPropagation();
      const m = p.clientX, b = p.clientY;
      if (s || Math.abs(m - c) >= n || Math.abs(b - h) >= n) {
        const { left: C, top: y } = d.getBoundingClientRect();
        s || (s = !0, e == null || e(c - C, h - y)), t(m - c, b - h, m - C, b - y), c = m, h = b;
      }
    }, u = (p) => {
      s && (p.preventDefault(), p.stopPropagation());
    }, f = () => {
      s && (i == null || i()), r();
    };
    document.addEventListener("pointermove", l), document.addEventListener("pointerup", f), document.addEventListener("pointerleave", f), document.addEventListener("click", u, !0), r = () => {
      document.removeEventListener("pointermove", l), document.removeEventListener("pointerup", f), document.removeEventListener("pointerleave", f), setTimeout(() => {
        document.removeEventListener("click", u, !0);
      }, 10);
    };
  };
  return d.addEventListener("pointerdown", o), () => {
    r(), d.removeEventListener("pointerdown", o);
  };
}
class W extends P {
  constructor(t, e) {
    super(), this.timeouts = [], this.isScrolling = !1, this.audioData = null, this.resizeObserver = null, this.isDragging = !1, this.options = t;
    let i;
    if (typeof t.container == "string" ? i = document.querySelector(t.container) : t.container instanceof HTMLElement && (i = t.container), !i)
      throw new Error("Container not found");
    this.parent = i;
    const [n, r] = this.initHtml();
    i.appendChild(n), this.container = n, this.scrollContainer = r.querySelector(".scroll"), this.wrapper = r.querySelector(".wrapper"), this.canvasWrapper = r.querySelector(".canvases"), this.progressWrapper = r.querySelector(".progress"), this.cursor = r.querySelector(".cursor"), e && r.appendChild(e), this.initEvents();
  }
  initEvents() {
    this.wrapper.addEventListener("click", (e) => {
      const i = this.wrapper.getBoundingClientRect(), r = (e.clientX - i.left) / i.width;
      this.emit("click", r);
    }), this.options.dragToSeek && this.initDrag(), this.scrollContainer.addEventListener("scroll", () => {
      const { scrollLeft: e, scrollWidth: i, clientWidth: n } = this.scrollContainer, r = e / i, o = (e + n) / i;
      this.emit("scroll", r, o);
    });
    const t = this.createDelay(100);
    this.resizeObserver = new ResizeObserver(() => {
      t(() => this.reRender());
    }), this.resizeObserver.observe(this.scrollContainer);
  }
  initDrag() {
    J(
      this.wrapper,
      // On drag
      (t, e, i) => {
        this.emit("drag", Math.max(0, Math.min(1, i / this.wrapper.clientWidth)));
      },
      // On start drag
      () => this.isDragging = !0,
      // On end drag
      () => this.isDragging = !1
    );
  }
  getHeight() {
    return this.options.height == null ? 128 : isNaN(Number(this.options.height)) ? this.options.height === "auto" && this.parent.clientHeight || 128 : Number(this.options.height);
  }
  initHtml() {
    const t = document.createElement("div"), e = t.attachShadow({ mode: "open" });
    return e.innerHTML = `
      <style>
        :host {
          user-select: none;
        }
        :host audio {
          display: block;
          width: 100%;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          position: relative;
          touch-action: none;
        }
        :host .noScrollbar {
          scrollbar-color: transparent;
          scrollbar-width: none;
        }
        :host .noScrollbar::-webkit-scrollbar {
          display: none;
          -webkit-appearance: none;
        }
        :host .wrapper {
          position: relative;
          overflow: visible;
          z-index: 2;
        }
        :host .canvases {
          min-height: ${this.getHeight()}px;
        }
        :host .canvases > div {
          position: relative;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          image-rendering: pixelated;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
        }
        :host .progress > div {
          position: relative;
        }
        :host .cursor {
          pointer-events: none;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 2px;
        }
      </style>

      <div class="scroll" part="scroll">
        <div class="wrapper">
          <div class="canvases"></div>
          <div class="progress" part="progress"></div>
          <div class="cursor" part="cursor"></div>
        </div>
      </div>
    `, [t, e];
  }
  setOptions(t) {
    this.options = t, this.reRender();
  }
  getWrapper() {
    return this.wrapper;
  }
  getScroll() {
    return this.scrollContainer.scrollLeft;
  }
  destroy() {
    var t;
    this.container.remove(), (t = this.resizeObserver) === null || t === void 0 || t.disconnect();
  }
  createDelay(t = 10) {
    const e = {};
    return this.timeouts.push(e), (i) => {
      e.timeout && clearTimeout(e.timeout), e.timeout = setTimeout(i, t);
    };
  }
  // Convert array of color values to linear gradient
  convertColorValues(t) {
    if (!Array.isArray(t))
      return t || "";
    if (t.length < 2)
      return t[0] || "";
    const e = document.createElement("canvas"), n = e.getContext("2d").createLinearGradient(0, 0, 0, e.height), r = 1 / (t.length - 1);
    return t.forEach((o, a) => {
      const c = a * r;
      n.addColorStop(c, o);
    }), n;
  }
  renderBarWaveform(t, e, i, n) {
    const r = t[0], o = t[1] || t[0], a = r.length, { width: c, height: h } = i.canvas, s = h / 2, l = window.devicePixelRatio || 1, u = e.barWidth ? e.barWidth * l : 1, f = e.barGap ? e.barGap * l : e.barWidth ? u / 2 : 0, p = e.barRadius || 0, m = c / (u + f) / a, b = p && "roundRect" in i ? "roundRect" : "rect";
    i.beginPath();
    let C = 0, y = 0, S = 0;
    for (let w = 0; w <= a; w++) {
      const g = Math.round(w * m);
      if (g > C) {
        const L = Math.round(y * s * n), A = Math.round(S * s * n), x = L + A || 1;
        let T = s - L;
        e.barAlign === "top" ? T = 0 : e.barAlign === "bottom" && (T = h - x), i[b](C * (u + f), T, u, x, p), C = g, y = 0, S = 0;
      }
      const v = Math.abs(r[w] || 0), M = Math.abs(o[w] || 0);
      v > y && (y = v), M > S && (S = M);
    }
    i.fill(), i.closePath();
  }
  renderLineWaveform(t, e, i, n) {
    const r = (o) => {
      const a = t[o] || t[0], c = a.length, { height: h } = i.canvas, s = h / 2, l = i.canvas.width / c;
      i.moveTo(0, s);
      let u = 0, f = 0;
      for (let p = 0; p <= c; p++) {
        const m = Math.round(p * l);
        if (m > u) {
          const C = Math.round(f * s * n) || 1, y = s + C * (o === 0 ? -1 : 1);
          i.lineTo(u, y), u = m, f = 0;
        }
        const b = Math.abs(a[p] || 0);
        b > f && (f = b);
      }
      i.lineTo(u, s);
    };
    i.beginPath(), r(0), r(1), i.fill(), i.closePath();
  }
  renderWaveform(t, e, i) {
    if (i.fillStyle = this.convertColorValues(e.waveColor), e.renderFunction) {
      e.renderFunction(t, i);
      return;
    }
    let n = e.barHeight || 1;
    if (e.normalize) {
      const r = Array.from(t[0]).reduce((o, a) => Math.max(o, Math.abs(a)), 0);
      n = r ? 1 / r : 1;
    }
    if (e.barWidth || e.barGap || e.barAlign) {
      this.renderBarWaveform(t, e, i, n);
      return;
    }
    this.renderLineWaveform(t, e, i, n);
  }
  renderSingleCanvas(t, e, i, n, r, o, a, c) {
    const h = window.devicePixelRatio || 1, s = document.createElement("canvas"), l = t[0].length;
    s.width = Math.round(i * (o - r) / l), s.height = n * h, s.style.width = `${Math.floor(s.width / h)}px`, s.style.height = `${n}px`, s.style.left = `${Math.floor(r * i / h / l)}px`, a.appendChild(s);
    const u = s.getContext("2d");
    this.renderWaveform(t.map((m) => m.slice(r, o)), e, u);
    const f = s.cloneNode();
    c.appendChild(f);
    const p = f.getContext("2d");
    s.width > 0 && s.height > 0 && p.drawImage(s, 0, 0), p.globalCompositeOperation = "source-in", p.fillStyle = this.convertColorValues(e.progressColor), p.fillRect(0, 0, s.width, s.height);
  }
  renderChannel(t, e, i) {
    const n = document.createElement("div"), r = this.getHeight();
    n.style.height = `${r}px`, this.canvasWrapper.style.minHeight = `${r}px`, this.canvasWrapper.appendChild(n);
    const o = n.cloneNode();
    this.progressWrapper.appendChild(o);
    const { scrollLeft: a, scrollWidth: c, clientWidth: h } = this.scrollContainer, s = t[0].length, l = s / c;
    let u = Math.min(W.MAX_CANVAS_WIDTH, h);
    if (e.barWidth || e.barGap) {
      const g = e.barWidth || 0.5, v = e.barGap || g / 2, M = g + v;
      u % M !== 0 && (u = Math.floor(u / M) * M);
    }
    const f = Math.floor(Math.abs(a) * l), p = Math.floor(f + u * l), m = p - f, b = (g, v) => {
      this.renderSingleCanvas(t, e, i, r, Math.max(0, g), Math.min(v, s), n, o);
    }, C = this.createDelay(), y = this.createDelay(), S = (g, v) => {
      b(g, v), g > 0 && C(() => {
        S(g - m, v - m);
      });
    }, w = (g, v) => {
      b(g, v), v < s && y(() => {
        w(g + m, v + m);
      });
    };
    S(f, p), p < s && w(p, p + m);
  }
  render(t) {
    this.timeouts.forEach((a) => a.timeout && clearTimeout(a.timeout)), this.timeouts = [], this.canvasWrapper.innerHTML = "", this.progressWrapper.innerHTML = "", this.wrapper.style.width = "";
    const e = window.devicePixelRatio || 1, i = this.scrollContainer.clientWidth, n = Math.ceil(t.duration * (this.options.minPxPerSec || 0));
    this.isScrolling = n > i;
    const r = this.options.fillParent && !this.isScrolling, o = (r ? i : n) * e;
    if (this.wrapper.style.width = r ? "100%" : `${n}px`, this.scrollContainer.style.overflowX = this.isScrolling ? "auto" : "hidden", this.scrollContainer.classList.toggle("noScrollbar", !!this.options.hideScrollbar), this.cursor.style.backgroundColor = `${this.options.cursorColor || this.options.progressColor}`, this.cursor.style.width = `${this.options.cursorWidth}px`, this.options.splitChannels)
      for (let a = 0; a < t.numberOfChannels; a++) {
        const c = Object.assign(Object.assign({}, this.options), this.options.splitChannels[a]);
        this.renderChannel([t.getChannelData(a)], c, o);
      }
    else {
      const a = [t.getChannelData(0)];
      t.numberOfChannels > 1 && a.push(t.getChannelData(1)), this.renderChannel(a, this.options, o);
    }
    this.audioData = t, this.emit("render");
  }
  reRender() {
    if (!this.audioData)
      return;
    const t = this.progressWrapper.clientWidth;
    this.render(this.audioData);
    const e = this.progressWrapper.clientWidth;
    this.scrollContainer.scrollLeft += e - t;
  }
  zoom(t) {
    this.options.minPxPerSec = t, this.reRender();
  }
  scrollIntoView(t, e = !1) {
    const { clientWidth: i, scrollLeft: n, scrollWidth: r } = this.scrollContainer, o = r * t, a = i / 2, c = e && this.options.autoCenter && !this.isDragging ? a : i;
    if (o > n + c || o < n)
      if (this.options.autoCenter && !this.isDragging) {
        const h = a / 20;
        o - (n + a) >= h && o < n + i ? this.scrollContainer.scrollLeft += h : this.scrollContainer.scrollLeft = o - a;
      } else
        this.isDragging ? this.scrollContainer.scrollLeft = o < n ? o - 10 : o - i + 10 : this.scrollContainer.scrollLeft = o;
    {
      const { scrollLeft: h } = this.scrollContainer, s = h / r, l = (h + i) / r;
      this.emit("scroll", s, l);
    }
  }
  renderProgress(t, e) {
    isNaN(t) || (this.progressWrapper.style.width = `${t * 100}%`, this.cursor.style.left = `${t * 100}%`, this.cursor.style.marginLeft = Math.round(t * 100) === 100 ? `-${this.options.cursorWidth}px` : "", this.isScrolling && this.options.autoScroll && this.scrollIntoView(t, e));
  }
}
W.MAX_CANVAS_WIDTH = 4e3;
class K extends P {
  constructor() {
    super(...arguments), this.unsubscribe = () => {
    };
  }
  start() {
    this.unsubscribe = this.on("tick", () => {
      requestAnimationFrame(() => {
        this.emit("tick");
      });
    }), this.emit("tick");
  }
  stop() {
    this.unsubscribe();
  }
  destroy() {
    this.unsubscribe();
  }
}
var E = globalThis && globalThis.__awaiter || function(d, t, e, i) {
  function n(r) {
    return r instanceof e ? r : new e(function(o) {
      o(r);
    });
  }
  return new (e || (e = Promise))(function(r, o) {
    function a(s) {
      try {
        h(i.next(s));
      } catch (l) {
        o(l);
      }
    }
    function c(s) {
      try {
        h(i.throw(s));
      } catch (l) {
        o(l);
      }
    }
    function h(s) {
      s.done ? r(s.value) : n(s.value).then(a, c);
    }
    h((i = i.apply(d, t || [])).next());
  });
};
const Q = {
  waveColor: "#999",
  progressColor: "#555",
  cursorWidth: 1,
  minPxPerSec: 0,
  fillParent: !0,
  interact: !0,
  dragToSeek: !1,
  autoScroll: !0,
  autoCenter: !0,
  sampleRate: 8e3
};
class R extends Y {
  /** Create a new WaveSurfer instance */
  static create(t) {
    return new R(t);
  }
  /** Create a new WaveSurfer instance */
  constructor(t) {
    var e, i;
    super({
      media: t.media,
      mediaControls: t.mediaControls,
      autoplay: t.autoplay,
      playbackRate: t.audioRate
    }), this.plugins = [], this.decodedData = null, this.subscriptions = [], this.options = Object.assign({}, Q, t), this.timer = new K();
    const n = t.media ? void 0 : this.getMediaElement();
    this.renderer = new W(this.options, n), this.initPlayerEvents(), this.initRendererEvents(), this.initTimerEvents(), this.initPlugins();
    const r = this.options.url || ((e = this.options.media) === null || e === void 0 ? void 0 : e.currentSrc) || ((i = this.options.media) === null || i === void 0 ? void 0 : i.src);
    r && this.load(r, this.options.peaks, this.options.duration);
  }
  initTimerEvents() {
    this.subscriptions.push(this.timer.on("tick", () => {
      const t = this.getCurrentTime();
      this.renderer.renderProgress(t / this.getDuration(), !0), this.emit("timeupdate", t), this.emit("audioprocess", t);
    }));
  }
  initPlayerEvents() {
    this.subscriptions.push(this.onMediaEvent("timeupdate", () => {
      const t = this.getCurrentTime();
      this.renderer.renderProgress(t / this.getDuration(), this.isPlaying()), this.emit("timeupdate", t);
    }), this.onMediaEvent("play", () => {
      this.emit("play"), this.timer.start();
    }), this.onMediaEvent("pause", () => {
      this.emit("pause"), this.timer.stop();
    }), this.onMediaEvent("emptied", () => {
      this.timer.stop();
    }), this.onMediaEvent("ended", () => {
      this.emit("finish");
    }), this.onMediaEvent("seeking", () => {
      this.emit("seeking", this.getCurrentTime());
    }));
  }
  initRendererEvents() {
    this.subscriptions.push(
      // Seek on click
      this.renderer.on("click", (t) => {
        this.options.interact && (this.seekTo(t), this.emit("interaction", t * this.getDuration()), this.emit("click", t));
      }),
      // Scroll
      this.renderer.on("scroll", (t, e) => {
        const i = this.getDuration();
        this.emit("scroll", t * i, e * i);
      }),
      // Redraw
      this.renderer.on("render", () => {
        this.emit("redraw");
      })
    );
    {
      let t;
      this.subscriptions.push(this.renderer.on("drag", (e) => {
        this.options.interact && (this.renderer.renderProgress(e), clearTimeout(t), t = setTimeout(() => {
          this.seekTo(e);
        }, this.isPlaying() ? 0 : 200), this.emit("interaction", e * this.getDuration()), this.emit("drag", e));
      }));
    }
  }
  initPlugins() {
    var t;
    !((t = this.options.plugins) === null || t === void 0) && t.length && this.options.plugins.forEach((e) => {
      this.registerPlugin(e);
    });
  }
  /** Set new wavesurfer options and re-render it */
  setOptions(t) {
    this.options = Object.assign({}, this.options, t), this.renderer.setOptions(this.options), t.audioRate && this.setPlaybackRate(t.audioRate), t.mediaControls != null && (this.getMediaElement().controls = t.mediaControls);
  }
  /** Register a wavesurfer.js plugin */
  registerPlugin(t) {
    return t.init(this), this.plugins.push(t), this.subscriptions.push(t.once("destroy", () => {
      this.plugins = this.plugins.filter((e) => e !== t);
    })), t;
  }
  /** For plugins only: get the waveform wrapper div */
  getWrapper() {
    return this.renderer.getWrapper();
  }
  /** Get the current scroll position in pixels */
  getScroll() {
    return this.renderer.getScroll();
  }
  /** Get all registered plugins */
  getActivePlugins() {
    return this.plugins;
  }
  loadAudio(t, e, i, n) {
    return E(this, void 0, void 0, function* () {
      if (this.emit("load", t), this.isPlaying() && this.pause(), this.decodedData = null, !e && !i) {
        const r = (o) => this.emit("loading", o);
        e = yield U.fetchBlob(t, r, this.options.fetchParams);
      }
      if (this.setSrc(t, e), i)
        n = (yield Promise.resolve(n || this.getDuration())) || (yield new Promise((r) => {
          this.onceMediaEvent("loadedmetadata", () => r(this.getDuration()));
        })) || (yield Promise.resolve(0)), this.decodedData = H.createBuffer(i, n);
      else if (e) {
        const r = yield e.arrayBuffer();
        this.decodedData = yield H.decode(r, this.options.sampleRate);
      }
      this.emit("decode", this.getDuration()), this.decodedData && this.renderer.render(this.decodedData), this.emit("ready", this.getDuration());
    });
  }
  /** Load an audio file by URL, with optional pre-decoded audio data */
  load(t, e, i) {
    return E(this, void 0, void 0, function* () {
      yield this.loadAudio(t, void 0, e, i);
    });
  }
  /** Load an audio blob */
  loadBlob(t, e, i) {
    return E(this, void 0, void 0, function* () {
      yield this.loadAudio("blob", t, e, i);
    });
  }
  /** Zoom the waveform by a given pixels-per-second factor */
  zoom(t) {
    if (!this.decodedData)
      throw new Error("No audio loaded");
    this.renderer.zoom(t), this.emit("zoom", t);
  }
  /** Get the decoded audio data */
  getDecodedData() {
    return this.decodedData;
  }
  /** Get decoded peaks */
  exportPeaks({ channels: t = 1, maxLength: e = 8e3, precision: i = 1e4 } = {}) {
    if (!this.decodedData)
      throw new Error("The audio has not been decoded yet");
    const n = Math.min(t, this.decodedData.numberOfChannels), r = [];
    for (let o = 0; o < n; o++) {
      const a = this.decodedData.getChannelData(o), c = Math.min(a.length, e), h = a.length / c, s = [];
      for (let l = 0; l < c; l++) {
        const u = Math.round(l * h), f = a[u];
        s.push(Math.round(f * i) / i);
      }
      r.push(s);
    }
    return r;
  }
  /** Get the duration of the audio in seconds */
  getDuration() {
    let t = super.getDuration() || 0;
    return (t === 0 || t === 1 / 0) && this.decodedData && (t = this.decodedData.duration), t;
  }
  /** Toggle if the waveform should react to clicks */
  toggleInteraction(t) {
    this.options.interact = t;
  }
  /** Seek to a percentage of audio as [0..1] (0 = beginning, 1 = end) */
  seekTo(t) {
    const e = this.getDuration() * t;
    this.setTime(e);
  }
  /** Play or pause the audio */
  playPause() {
    return E(this, void 0, void 0, function* () {
      return this.isPlaying() ? this.pause() : this.play();
    });
  }
  /** Stop the audio and go to the beginning */
  stop() {
    this.pause(), this.setTime(0);
  }
  /** Skip N or -N seconds from the current position */
  skip(t) {
    this.setTime(this.getCurrentTime() + t);
  }
  /** Empty the waveform by loading a tiny silent audio */
  empty() {
    this.load("", [[0]], 1e-3);
  }
  /** Unmount wavesurfer */
  destroy() {
    this.emit("destroy"), this.plugins.forEach((t) => t.destroy()), this.subscriptions.forEach((t) => t()), this.timer.destroy(), this.renderer.destroy(), super.destroy();
  }
}
const Z = { class: "ws" }, tt = /* @__PURE__ */ O({
  __name: "WaveSurfer",
  props: {
    source: {
      type: [String, HTMLMediaElement],
      default: ""
    },
    /** The height of the waveform in pixels, or "auto" to fill the container height */
    height: { type: Number, default: -1 },
    /** The color of the waveform */
    waveColor: { type: String, default: "#999" },
    /** The color of the progress mask */
    progressColor: { type: String, default: "#555" },
    /** The color of the playpack cursor */
    cursorColor: { type: String, default: "#333" },
    /** The cursor width */
    cursorWidth: { type: Number, default: 1 },
    /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth: { type: Number, default: 0 },
    /** Spacing between bars in pixels */
    barGap: { type: Number, default: 0 },
    /** Rounded borders for bars */
    barRadius: { type: Number, default: 0 },
    /** A vertical scaling factor for the waveform */
    barHeight: { type: Number, default: 1 },
    /** Vertical bar alignment */
    barAlign: {
      validator: (d) => d === void 0 || typeof d == "string" && (d === "top" || d === "bottom" || d === "center"),
      default: void 0
    },
    /** Minimum pixels per second of audio (i.e. the zoom level) */
    minPxPerSec: { type: Number, default: 50 },
    /** Stretch the waveform to fill the container, true by default */
    fillParent: { type: Boolean, default: !0 },
    /** Pre-computed audio duration in seconds */
    duration: {
      validator: (d) => typeof d == "number" || d === void 0,
      default: void 0
    },
    /** Whether to show default audio element controls */
    mediaControls: { type: Boolean, default: !1 },
    /** Play the audio on load */
    autoplay: { type: Boolean, default: !1 },
    /** Pass false to disable clicks on the waveform */
    interact: { type: Boolean, default: !0 },
    /** Allow to drag the cursor to seek to a new position */
    dragToSeek: { type: Boolean, default: !0 },
    /** Hide the scrollbar */
    hideScrollbar: { type: Boolean, default: !1 },
    /** Audio rate, i.e. the playback speed */
    audioRate: { type: Number, default: 1 },
    /** Automatically scroll the container to keep the current position in viewport */
    autoScroll: { type: Boolean, default: !1 },
    /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
    autoCenter: { type: Boolean, default: !0 },
    /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
    sampleRate: { type: Number, default: 8e3 },
    /** Stretch the waveform to the full height */
    normalize: { type: Boolean, default: !1 }
  },
  setup(d) {
    const t = d, e = D(null), i = D(), n = _(() => {
      if (t.source instanceof HTMLMediaElement)
        return t.source;
    }), r = _(() => ({
      container: i.value || "",
      height: t.height === -1 ? "auto" : t.height,
      waveColor: t.waveColor,
      progressColor: t.progressColor,
      cursorColor: t.cursorColor,
      cursorWidth: t.cursorWidth,
      barWidth: t.barWidth,
      barGap: t.barGap === 0 ? void 0 : t.barGap,
      barRadius: t.barRadius,
      barHeight: t.barHeight,
      barAlign: t.barAlign === "center" ? void 0 : t.barAlign,
      minPxPerSec: t.minPxPerSec,
      fillParent: t.fillParent,
      duration: t.duration,
      mediaControls: t.mediaControls,
      autoplay: t.autoplay,
      interact: t.interact,
      dragToSeek: t.dragToSeek,
      hideScrollbar: t.hideScrollbar,
      audioRate: t.audioRate,
      autoScroll: t.autoScroll,
      autoCenter: t.autoCenter,
      sampleRate: t.sampleRate,
      normalize: t.normalize,
      media: n.value
    })), o = () => {
      e.value && e.value.destroy();
      try {
        e.value = R.create(r.value);
      } catch {
        e.value = null;
      }
    }, a = async (s, l, u) => {
      e.value && await e.value.load(s, l, u);
    }, c = (s) => {
      e.value && e.value.setOptions(s);
    }, h = async () => {
      n.value && await a(n.value.currentSrc);
    };
    return k(r, (s, l) => {
      s.media && l.media === void 0 ? o() : c(s);
    }), k(t, async (s) => {
      const { source: l } = s;
      l && !(l instanceof HTMLMediaElement) && await a(l);
    }), k(n, (s, l) => {
      const u = "loadeddata";
      l && l.removeEventListener(u, h, !1), s && s.addEventListener(u, h, !1);
    }), z(async () => {
      o(), t.source && !(t.source instanceof HTMLMediaElement) && await a(t.source);
    }), (s, l) => (N(), $("div", Z, [
      G(s.$slots, "default"),
      X("div", {
        ref_key: "waveform",
        ref: i,
        tabindex: "2"
      }, null, 512)
    ]));
  }
}), it = {
  install(d) {
    d.component("WaveSurfer", tt);
  }
};
export {
  it as default
};
