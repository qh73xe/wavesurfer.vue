import io from "@/io/index.js";
import { distance } from "../util";
import { log } from "@/decorators.js";
const DEBUG = false;
/**
 * @typedef {Object} TextgridPluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where the textgrid should be drawn. This is the only required parameter.
 * @property {string} color='#000' The colour of the notches
 * @property {string} activeColor='#c0c0c0' The colour of the notches
 * @property {string} fontColor='#000' The colour of the labels next to the notches
 * @property {?number} zoomDebounce A debounce timeout to increase rendering
 * performance for large files
 * @property {string} fontFamily='Arial'
 * @property {number} fontSize=10 Font size of labels in pixels
 * @property {?boolean} deferInit Set to true to manually call `initPlugin('textgrid')`
 */

/**
 * Adds a textgrid to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import TextgridPlugin from 'wavesurfer.textgrid.js';
 *
 * // commonjs
 * var TextgridPlugin = require('wavesurfer.textgrid.js');
 *
 * // if you are using <script> tags
 * var TextgridPlugin = window.WaveSurfer.textgrid;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     TextgridPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
export default class TextgridPlugin {
  /**
   * Textgrid plugin definition factory
   *
   * This function must be used to create a plugin definition which can be
   * used by wavesurfer to correctly instantiate the plugin.
   *
   * @param  {TextgridPluginParams} params parameters use to initialise the plugin
   * @return {PluginDefinition} an object representing the plugin
   */
  @log("textgrid.create", DEBUG)
  static create(params) {
    return {
      name: "textgrid",
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: TextgridPlugin
    };
  }

  // event handlers
  _onScroll = () => {
    if (this.wrapper && this.drawer.wrapper) {
      this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
    }
  };

  _onSeek = progress => {
    const time = progress * this.wavesurfer.getDuration();
    this.currentTime = time;
    this.setCursorTime();
  };

  _onAudioProcess = time => {
    this.currentTime = time;
    this.setCursorTime();
  };

  /**
   * @returns {void}
   */
  _onRedraw = () => this.render();
  _onReady = () => {
    const ws = this.wavesurfer;
    this.drawer = ws.drawer;
    this.pixelRatio = ws.drawer.params.pixelRatio;
    this.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
    this.maxCanvasElementWidth =
      ws.drawer.maxCanvasElementWidth ||
      Math.round(this.maxCanvasWidth / this.pixelRatio);

    // add listeners
    ws.drawer.wrapper.addEventListener("scroll", this._onScroll);
    ws.on("redraw", this._onRedraw);
    ws.on("zoom", this._onZoom);
    ws.on("seek", this._onSeek);
    ws.backend.on("audioprocess", this._onAudioProcess);
    this.render();
  };

  /**
   * Creates an instance of TextgridPlugin.
   *
   * You probably want to use TextgridPlugin.create()
   *
   * @param {TextgridPluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  constructor(params, ws) {
    this.container =
      "string" == typeof params.container
        ? document.querySelector(params.container)
        : params.container;

    if (!this.container) {
      throw new Error("No container for wavesurfer textgrid");
    }

    this.wavesurfer = ws;
    this.util = ws.util;
    this.params = Object.assign(
      {},
      {
        activeColor: "#FF6D00",
        color: "#000",
        fontColor: "#000",
        fontFamily: "Arial",
        fontSize: 15,
        height: 50,
        maxHeight: null,
        playingOffset: 1,
        tiers: {},
        zoomDebounce: false
      },
      params
    );
    this.wrapper = null;
    this.drawer = null;
    this.pixelRatio = null;
    this.maxCanvasWidth = null;
    this.maxCanvasElementWidth = null;
    this.tiers = this.params.tiers;
    this.current = {
      key: null,
      item: null,
      index: null
    };
    /**
     * This event handler has to be in the constructor function because it
     * relies on the debounce function which is only available after
     * instantiation
     *
     * Use a debounced function if `params.zoomDebounce` is defined
     *
     * @returns {void}
     */
    this._onZoom = this.params.zoomDebounce
      ? this.wavesurfer.util.debounce(
          () => this.render(),
          this.params.zoomDebounce
        )
      : () => this.render();
  }

  /**
   * Initialisation function used by the plugin API
   */
  init() {
    // Check if ws is ready
    if (this.wavesurfer.isReady) {
      this._onReady();
    } else {
      this.wavesurfer.once("ready", this._onReady);
    }
  }

  /**
   * Destroy function used by the plugin API
   */
  destroy() {
    this.unAll();
    this.wavesurfer.un("redraw", this._onRedraw);
    this.wavesurfer.un("zoom", this._onZoom);
    this.wavesurfer.un("ready", this._onReady);
    this.wavesurfer.un("seek", this._onSeek);
    this.wavesurfer.drawer.un("audioprocess", this._onAudioProcess);
    this.wavesurfer.drawer.wrapper.removeEventListener(
      "scroll",
      this._onScroll
    );

    if (this.wrapper && this.wrapper.parentNode) {
      for (const key in this.tiers) {
        this.removeCanvas(key);
      }
      this.cursorEl.parentElement.removeChild(this.cursorEl);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  /**
   * Create a textgrid element to wrap the canvas drawn by this plugin
   *
   */
  createWrapper() {
    this.container.innerHTML = "";
    this.currentTime = this.wavesurfer.getCurrentTime() || 0;
    this.wrapper = this.container.appendChild(
      document.createElement("textgrid")
    );
    // cursor 用のキャンバスを作成
    const cursorEl = (this.cursorEl = document.createElement("div"));
    cursorEl.classList.add("textgrid-cursor");
    const cursorWidth = this.wavesurfer.params.cursorWidth || 1;
    this.drawer.style(cursorEl, {
      left: 0,
      position: "absolute",
      zIndex: 3,
      width: `${cursorWidth}px`,
      borderLeft: `${cursorWidth}px dashed ${this.wavesurfer.params.cursorColor}`
    });
    this.wrapper.appendChild(cursorEl);
  }

  @log("textgrid.setCursorTime", DEBUG)
  setCursorTime() {
    if (this.cursorEl) {
      // 非ズーム 時には WS の minPxPerSec は上手く機能していない
      const minPxPerSec =
        this.wavesurfer.drawer.width / this.wavesurfer.getDuration();
      const _left = Math.round(this.currentTime * minPxPerSec);
      const left = _left ? `${_left}px` : this.cursorEl.style.left;
      this.cursorEl.style.height = this.wrapper.style.height;
      this.cursorEl.style.left = left;
    }
  }

  /**
   * Render the textgrid (also updates the already rendered textgrid)
   *
   */
  @log("textgrid.render", DEBUG)
  render() {
    this.wsParams = this.wavesurfer.params;
    if (!this.wrapper) {
      this.createWrapper();
    }
    // ラッパーのスタイルを調整
    this.util.style(this.wrapper, {
      display: "block",
      position: "relative",
      userSelect: "none",
      webkitUserSelect: "none",
      height: `${this.params.height * Object.keys(this.tiers).length}px`
    });

    if (this.wsParams.fillParent || this.wsParams.scrollParent) {
      this.util.style(this.wrapper, {
        width: "100%"
      });
      if (this.params.maxHeight !== null) {
        this.setMaxHeight(this.params.maxHeight);
      } else {
        this.wrapper.style.overflow = "hidden";
      }
    }
    // maxHeight 指定時にスタイルを変更
    if (this.params.maxHeight !== null) {
      this.setMaxHeight(this.params.maxHeight);
    }

    let i = 0;
    for (const key in this.tiers) {
      this.updateCanvas(key, i);
      this.updateCanvasPositioning(key, i);
      this.renderCanvas(key);
      this.renderLabel(key);
      i++;
    }
    this.currentTime = this.wavesurfer.getCurrentTime();
    this.setCursorTime();
  }

  /**
   * Add new textgrid canvas
   *
   */
  addCanvas(key, i) {
    if (this.tiers[key].canvas == undefined) {
      const canvas = this.wrapper.appendChild(document.createElement("canvas"));
      this.util.style(canvas, {
        position: "absolute",
        zIndex: 3,
        top: `${i * this.params.height}px`,
        left: `${0 * this.maxCanvasElementWidth}px`,
        "border-top": `solid 1px ${this.params.color}`,
        "border-bottom": `solid 1px ${this.params.color}`
      });

      // add canvas events
      const vm = this;

      // クリックイベントの取得
      this.tiers[key].onClick = function(e) {
        e.preventDefault();
        // seek to click point
        const progress = vm.event2progress(e);
        vm.wavesurfer.seekTo(progress);
        // fire event
        const time = vm.event2time(e);
        const payload = {
          key: key,
          time: time,
          detail: e.detail,
          shift: e.shiftKey,
          ctrl: e.ctrlKey,
          alt: e.altKey,
          meta: e.metaKey
        };
        vm.wavesurfer.fireEvent("textgrid-click", payload);

        if (e.detail === 1) {
          // set curent item
          let canditates = vm.tiers[key].values.filter(x => {
            return x.time >= time;
          });
          canditates.sort((a, b) => a.time - b.time);
          const currentItem = canditates[0];
          if (currentItem) {
            vm.setCurrent(key, currentItem);
          }
        }
      };

      this.tiers[key].onDblClick = function(e) {
        e.preventDefault();
        const time = vm.event2time(e);
        const item = { key: key, time: time };
        vm.wavesurfer.fireEvent("textgrid-dblclick", item);
      };

      // マウスイベントの取得
      this.tiers[key].isDraging = false;
      this.tiers[key].dragingItemIdx = null;

      let timer;
      const draggingMousemove = function(e) {
        canvas.style.cursor = "grabbing";
        clearTimeout(timer);
        timer = setTimeout(function() {
          const idx = vm.tiers[key].dragingItemIdx;
          if (vm.tiers[key].values[idx]) {
            const item = {
              time: vm.event2time(e),
              text: vm.tiers[key].values[idx].text
            };
            vm.setTierValue(key, idx, item, false);
          }
        }, 50);
      };
      const draggingMousedown = function() {
        vm.tiers[key].isDraging = true;
        canvas.style.cursor = "grabbing";
        canvas.addEventListener("mousemove", draggingMousemove);
      };
      const draggingMouseup = function() {
        vm.tiers[key].isDraging = false;
        vm.tiers[key].dragingItemIdx = null;
        canvas.style.cursor = "grab";
        canvas.removeEventListener("mousedown", draggingMousedown);
        canvas.removeEventListener("mousemove", draggingMousemove);
        canvas.removeEventListener("mouseup", draggingMouseup);
        vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
      };

      // default mousemove
      this.tiers[key].onMouseMove = function(e) {
        e.preventDefault();
        const duration = vm.wavesurfer.backend.getDuration();
        const pixelsPerSecond = canvas.width / duration;
        const relX = "offsetX" in e ? e.offsetX : e.layerX;

        if (!vm.tiers[key].isDraging) {
          vm.tiers[key].dragingItemIdx = vm.tiers[key].values.findIndex(x => {
            return distance(relX, x.time * pixelsPerSecond) < 1;
          });
        }

        if (vm.tiers[key].dragingItemIdx > -1) {
          canvas.style.cursor = "grab";
          canvas.addEventListener("mousedown", draggingMousedown, false);
          canvas.addEventListener("mouseup", draggingMouseup, false);
        } else {
          if (!vm.tiers[key].isDraging) {
            canvas.style.cursor = "default";
            vm.tiers[key].dragingItemIdx = null;
          }
        }
      };

      // キーボードイベントの取得
      this.tiers[key].onKeydown = function(e) {
        e.preventDefault();
        const payload = {
          keycode: e.which,
          shift: e.shiftKey,
          ctrl: e.ctrlKey,
          alt: e.altKey,
          meta: e.metaKey,
          current: vm.current
        };
        vm.wavesurfer.fireEvent("textgrid-keydown", payload);
      };

      this.tiers[key].onKeyup = function(e) {
        e.preventDefault();
        const payload = {
          keycode: e.which,
          shift: e.shiftKey,
          ctrl: e.ctrlKey,
          alt: e.altKey,
          meta: e.metaKey,
          current: vm.current
        };
        vm.wavesurfer.fireEvent("textgrid-keyup", payload);
      };

      canvas.setAttribute("tabindex", 0);
      canvas.addEventListener("click", this.tiers[key].onClick, false);
      canvas.addEventListener("dblclick", this.tiers[key].onDblClick, false);
      canvas.addEventListener("mousemove", this.tiers[key].onMouseMove, false);
      canvas.addEventListener("keyup", this.tiers[key].onKeyup, false);
      canvas.addEventListener("keydown", this.tiers[key].onKeydown, false);

      // set a canvas in this.tiers
      this.tiers[key].canvas = canvas;

      // set lavel of a canvas
      const label = this.wrapper.appendChild(document.createElement("canvas"));
      label.classList.add("tier-labels");
      this.drawer.style(label, {
        position: "absolute",
        zIndex: 4,
        top: `${i * this.params.height}px`,
        width: "${this.params.fontSize + 4}px"
      });
      this.tiers[key].label = label;
    } else {
      const label = this.tiers[key].label;
      this.drawer.style(label, {
        position: "absolute",
        zIndex: 4,
        top: `${i * this.params.height}px`,
        width: "${this.params.fontSize + 4}px"
      });
    }
  }

  /**
   * Remove textgrid canvas
   *
   */
  removeCanvas(key) {
    const canvas = this.tiers[key].canvas;
    canvas.removeEventListener("click", canvas.onClick);
    canvas.removeEventListener("dblclick", canvas.onDblClick);
    canvas.removeEventListener("mousemove", canvas.onMouseMove);
    canvas.removeEventListener("keyup", canvas.onKeyup);
    canvas.removeEventListener("keydown", canvas.onKeydown);

    const label = this.tiers[key].label;
    label.parentElement.removeChild(label);
    canvas.parentElement.removeChild(canvas);
  }

  updateCanvas(key, i) {
    // if (this.params.tiers[key].canvas != undefined) {
    //   this.removeCanvas();
    // }
    this.addCanvas(key, i);
  }

  /**
   * Update the dimensions and positioning style for all the textgrid canvas
   */
  updateCanvasPositioning(key, i) {
    const canvas = this.tiers[key].canvas;
    canvas.width = this.wavesurfer.drawer.width;
    canvas.height = (this.params.height + 1) * this.pixelRatio;
    this.util.style(canvas, {
      top: `${i * this.params.height}px`,
      left: `${0 * this.maxCanvasElementWidth}px`,
      width: `${this.wavesurfer.drawer.width}px`,
      height: `${this.params.height}px`
    });
  }

  /**
   * Render the textgrid labels and notches
   *
   */
  renderCanvas(key) {
    const duration = this.wavesurfer.backend.getDuration();
    if (duration <= 0) {
      return;
    }
    const width =
      this.wsParams.fillParent && !this.wsParams.scrollParent
        ? this.drawer.getWidth()
        : this.drawer.wrapper.scrollWidth * this.wsParams.pixelRatio;
    const pixelsPerSecond = width / duration;

    // build an array of position data with index, second and pixel data,
    // this is then used multiple times below
    const values = this.tiers[key].values;
    values.sort((a, b) => a.time - b.time);

    const positioning = [];
    let i = 0;
    for (const x of values) {
      const curPixel = pixelsPerSecond * x.time;
      const preSec = i == 0 ? 0 : values[i - 1].time;
      const prePixel = i == 0 ? 0 : pixelsPerSecond * preSec;
      positioning.push([x.time, curPixel, prePixel, x.text]);
      i++;
    }

    // iterate over each position
    if (this.tiers[key].type == "interval") {
      this.renderIntervalTier(key, positioning);
    } else if (this.tiers[key].type == "point") {
      this.renderPointTier(key, positioning);
    } else {
      this.wavesurfer.fireEvent(
        "error",
        new Error("tier.type is 'interval' or 'point'")
      );
    }
  }

  renderIntervalTier(key, positioning) {
    const height = this.params.height * this.pixelRatio;
    this.fillRect(key, 0, 0, 1, height);
    const renderPositions = cb => {
      positioning.forEach(pos => {
        cb(pos[0], pos[1], pos[2], pos[3]);
      });
    };

    // render labels
    renderPositions((curSeconds, curPixel, prePixel, text) => {
      // 現在クリック時の表示箇所を強調
      if (this.current.key == key && this.current.index !== null) {
        const record = this.tiers[key].values[this.current.index];
        if (record) {
          if (record.time == curSeconds) {
            this.setFillStyles(key, this.params.activeColor);
            const canvas = this.tiers[key].canvas;
            canvas
              .getContext("2d")
              .fillRect(prePixel, 0, curPixel - prePixel, canvas.height);
          }
          this.setFillStyles(key, this.params.color);
          this.setFillStyles(key, this.params.fontColor);
        }
      }
      this.fillRect(key, curPixel, 0, 1, height);

      // 文字表示が可能な場合文字を表示
      if (text) {
        let fontSize = this.params.fontSize * this.wsParams.pixelRatio;
        const textLength = this.getStrLength(text);
        const pixels = curPixel - prePixel;
        const textPiexels = fontSize * textLength;
        if (pixels < textPiexels) {
          fontSize = Math.round(pixels / textLength);
          this.setFonts(key, `${fontSize}px ${this.params.fontFamily}`);
        }
        this.setFonts(key, `${fontSize}px ${this.params.fontFamily}`);
        this.fillText(
          key,
          text,
          Math.round((prePixel + curPixel) / 2) - fontSize * textLength * 0.25,
          height + fontSize / 2
        );
      }
    });
  }

  renderPointTier(key, positioning) {
    const height = this.params.height * this.pixelRatio;
    const renderPositions = cb => {
      positioning.forEach(pos => {
        cb(pos[0], pos[1], pos[2], pos[3]);
      });
    };
    // render labels
    renderPositions((curSeconds, curPixel, prePixel, text) => {
      // 現在クリック時の表示箇所を強調
      if (this.current.key == key && this.current.index !== null) {
        const record = this.tiers[key].values[this.current.index];
        if (record) {
          if (record.time == curSeconds) {
            this.setFillStyles(key, this.params.activeColor);
            this.fillRect(key, curPixel, 0, 3, Math.round(height / 2));
          } else {
            this.setFillStyles(key, this.params.color);
            this.fillRect(key, curPixel, 0, 1, Math.round(height / 2));
          }
        }
      } else {
        this.setFillStyles(key, this.params.color);
        this.fillRect(key, curPixel, 0, 1, Math.round(height / 2));
      }
      // 文字表示が可能な場合文字を表示
      if (text) {
        const textLength = this.getStrLength(text);
        let fontSize = this.params.fontSize * this.wsParams.pixelRatio;
        this.setFonts(key, `${fontSize}px ${this.params.fontFamily}`);
        this.fillText(
          key,
          text,
          Math.round(curPixel - (fontSize * textLength) / 4),
          Math.round(height * 2 - fontSize)
        );
      }
    });
  }

  renderLabel(key) {
    const bgWidth = this.params.fontSize;
    const bgFill = `rgba(${[0, 0, 0, 0.5]})`;

    const label = this.tiers[key].label;
    const ctx = label.getContext("2d");
    label.height = this.tiers[key].canvas.height;
    label.width = bgWidth;
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, label.width, label.height);
    ctx.fill();

    const textColor = "#fff";
    const fontSize = 15;
    const fontType = "Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px ${fontType}`;
    ctx.fillStyle = textColor;
    for (const i in key) {
      const str = key[i];
      ctx.fillText(str, fontSize / 2, i * fontSize + 10);
    }
  }

  /**
   * Set the canvas fill style
   *
   * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle Fill style to
   * use
   */
  setFillStyles(key, fillStyle) {
    const canvas = this.tiers[key].canvas;
    canvas.getContext("2d").fillStyle = fillStyle;
  }

  /**
   * Set the canvas font
   *
   * @param {DOMString} font Font to use
   */
  setFonts(key, font) {
    const canvas = this.tiers[key].canvas;
    canvas.getContext("2d").font = font;
  }

  /**
   * Draw a rectangle on the canvas
   *
   * (it figures out the offset for each canvas)
   *
   * @param {number} x X-position
   * @param {number} y Y-position
   * @param {number} width Width
   * @param {number} height Height
   */
  fillRect(key, x, y, width, height) {
    const canvas = this.tiers[key].canvas;
    const leftOffset = 0;
    const intersection = {
      x1: Math.max(x, 0),
      y1: y,
      x2: Math.min(x + width, canvas.width),
      y2: y + height
    };

    if (intersection.x1 < intersection.x2) {
      canvas
        .getContext("2d")
        .fillRect(
          intersection.x1 - leftOffset,
          intersection.y1,
          intersection.x2 - intersection.x1,
          intersection.y2 - intersection.y1
        );
    }
  }
  /**
   * Fill a given text on the canvas
   *
   * @param {string} text Text to render
   * @param {number} x X-position
   * @param {number} y Y-position
   */
  fillText(key, text, x, y) {
    let textWidth;
    let xOffset = 0;
    const canvas = this.tiers[key].canvas;
    const context = canvas.getContext("2d");
    const canvasWidth = context.canvas.width;
    if (xOffset > x + textWidth) {
      return;
    }
    if (xOffset + canvasWidth > x) {
      textWidth = context.measureText(text).width;
      context.fillText(text, x, y / 2);
    }
    xOffset += canvasWidth;
  }
  setCurrent(key, item) {
    this.current.key = key;
    this.current.item = item;
    this.current.index = this.tiers[key].values.findIndex(
      x => x.time == this.current.item.time
    );
    this.render();
    this.wavesurfer.fireEvent("textgrid-current-update", this.current);
  }

  /**
   * 全角半角を考慮して文字列のカウントを行う
   *
   * @param {string} str String for counting.
   */
  getStrLength(str) {
    let count = 0;
    for (var i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      if (
        (chr >= 0x00 && chr < 0x81) ||
        chr === 0xf8f0 ||
        (chr >= 0xff61 && chr < 0xffa0) ||
        (chr >= 0xf8f1 && chr < 0xf8f4)
      ) {
        count += 1; //半角文字の場合は1を加算
      } else {
        //それ以外の文字の場合は2を加算
        count += 2;
      }
    }
    return count;
  }
  event2progress(e) {
    const relX = "offsetX" in e ? e.offsetX : e.layerX;
    const width =
      this.wsParams.fillParent && !this.wsParams.scrollParent
        ? this.drawer.getWidth()
        : this.drawer.wrapper.scrollWidth * this.wsParams.pixelRatio;
    return relX / width;
  }
  event2time(e) {
    const duration = this.wavesurfer.backend.getDuration();
    const progress = this.event2progress(e);
    return progress * duration;
  }
  setMaxHeight(maxHeight) {
    this.wrapper.style.overflow = "hidden";
    this.wrapper.style.overflowY = "scroll";
    this.wrapper.style.maxHeight = maxHeight;
  }

  // DECORATOR FUNCTIONS
  saveKeyInTier(key, fn) {
    if (key in this.tiers) {
      fn();
    } else {
      this.wavesurfer.fireEvent("error", new Error("${key} is not in tiers"));
    }
  }
  saveKeyIdxInTier(key, idx, fn) {
    if (key in this.tiers) {
      let item = null;
      try {
        item = this.tiers[key].values[idx];
      } catch (e) {
        this.wavesurfer.fireEvent("error", e);
      } finally {
        if (item != null) {
          fn();
        }
      }
    } else {
      this.wavesurfer.fireEvent("error", new Error("${idx} is not in ${key}"));
    }
  }

  // PLAY
  @log("textgrid.play", DEBUG)
  play(key, idx) {
    const vm = this;
    this.saveKeyIdxInTier(key, idx, () => {
      const duration = vm.wavesurfer.getDuration();
      let startTime = null;
      let endTime = null;
      const item = vm.tiers[key].values[idx];
      if (vm.tiers[key].type == "point") {
        startTime = Math.max(item.time - vm.params.playingOffset, 0);
        endTime = Math.min(item.time + vm.params.playingOffset, duration);
      } else {
        if (idx == 0) {
          startTime = 0;
        } else {
          startTime = vm.tiers[key].values[idx - 1].time;
        }
        endTime = item.time;
      }
      vm.wavesurfer.play(startTime, endTime);
    });
  }

  // TIER CONTROL FUNCTIONS
  @log("textgrid.addTier", DEBUG)
  addTier(key, type, parent) {
    if (key == "" || key == null || key == undefined) {
      this.wavesurfer.fireEvent("error", new Error(`No tier name`));
      return;
    }
    if (key in this.tiers) {
      this.wavesurfer.fireEvent(
        "error",
        new Error(`Duplicate tier name (${key})`)
      );
      return;
    }

    const values =
      type == "interval"
        ? [{ text: "", time: this.wavesurfer.getDuration() }]
        : [];
    if (type == "interval" || type == "point") {
      this.tiers[key] = {
        type: type,
        values: values,
        parent: parent || null
      };
      this.render();
      this.wavesurfer.fireEvent("tier-add", this.tiers);
    }
  }

  @log("textgrid.deleteTier", DEBUG)
  deleteTier(key) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      // 子要素の参照を変更
      for (const ckey in vm.tiers) {
        if (key == vm.tiers[ckey].parent) {
          vm.tiers[ckey].parent = null;
        }
      }

      vm.removeCanvas(key);
      delete vm.tiers[key];
      vm.render();
      vm.wavesurfer.fireEvent("tier-delete", vm.tiers);
    });
  }

  @log("textgrid.updateTier", DEBUG)
  updateTier(key, obj) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      const ref = vm.tiers[key];
      if (obj.name) {
        if (key != obj.name) {
          // 名前チェック
          if (obj.name == "" || obj.name == null || obj.name == undefined) {
            this.wavesurfer.fireEvent("error", new Error(`No tier name`));
            return;
          }
          if (obj.name in this.tiers) {
            this.wavesurfer.fireEvent(
              "error",
              new Error(`Duplicate tier name (${key})`)
            );
            return;
          }

          // 新規アイテムの作成
          vm.tiers[obj.name] = {
            values: ref.values || [],
            type: "type" in obj ? obj.type : ref.type,
            parent: "parent" in obj ? obj.parent : ref.parent
          };

          // 子要素の参照を変更
          for (const ckey in vm.tiers) {
            if (key == vm.tiers[ckey].parent) {
              vm.tiers[ckey].parent = obj.name;
            }
          }

          // 元データの削除
          vm.removeCanvas(key);
          delete vm.tiers[key];
        }
      } else {
        vm.tiers[key].type = "type" in obj ? obj.type : ref.type;
        vm.tiers[key].parent = "parent" in obj ? obj.parent : ref.parent;
      }
      vm.render();
      vm.wavesurfer.fireEvent("tier-update", vm.tiers);
    });
  }

  // TIER CONTROL FUNCTIONS
  @log("textgrid.copyTier", DEBUG)
  copyTier(ref, key, type, parent, withText = true) {
    if (key == "" || key == null || key == undefined) {
      this.wavesurfer.fireEvent("error", new Error(`No tier name`));
      return;
    }

    if (key in this.tiers) {
      this.wavesurfer.fireEvent(
        "error",
        new Error(`Duplicate tier name (${key})`)
      );
      return;
    }

    const base = this.tiers[ref];
    const values = base.values.map(x => {
      return {
        time: x.time,
        text: withText ? x.text : ""
      };
    });

    if (type == "interval" || type == "point") {
      this.tiers[key] = {
        type: type,
        values: values,
        parent: parent || null
      };
      this.render();
      this.wavesurfer.fireEvent("tier-add", this.tiers);
    }
  }

  getParents(pkey) {
    const parents = [];
    let p = pkey;
    while (p !== null) {
      parents.push(p);
      p = this.tiers[p].parent;
    }
    return parents;
  }

  hasChildren(key) {
    const children = [];
    for (const ckey in this.tiers) {
      if (key == this.tiers[ckey].parent) {
        children.push(ckey);
      }
    }
    return children.length == 0 ? false : true;
  }

  // TIER ITEM CONTROL FUNCTIONS
  @log("textgrid.addTierValue", DEBUG)
  addTierValue(key, obj, fireEvent = true, render = true) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      const idx = vm.tiers[key].values.findIndex(x => {
        return x.time == obj.time;
      });

      if (idx == -1) {
        const item = {
          time: obj.time || null,
          text: obj.text || ""
        };
        vm.tiers[key].values.push(item);

        // 親が追加された場合子も追加する
        for (const ckey in vm.tiers) {
          if (key == vm.tiers[ckey].parent) {
            const ci = vm.tiers[ckey].values.findIndex(x => {
              return x.time == item.time;
            });
            if (ci == -1) vm.addTierValue(ckey, item, false, false);
          }
        }
        if (render) vm.render();
        if (fireEvent) {
          vm.setCurrent(key, item);
          vm.wavesurfer.fireEvent("textgrid-update", this.tiers);
        }
      }
    });
  }

  @log("textgrid.setTierValue", DEBUG)
  setTierValue(key, idx, object, fireEvent = true, render = true) {
    const vm = this;
    this.saveKeyIdxInTier(key, idx, () => {
      const record = vm.tiers[key].values[idx];
      const isParent = vm.hasChildren(key);
      const isChild = vm.tiers[key].parent !== null;

      // 時刻情報を移動する場合親子関係を考慮する
      if (record.time != object.time) {
        if (isParent) {
          // 親である場合, 子に向けて再帰呼出を行う
          for (const ckey in vm.tiers) {
            if (key == vm.tiers[ckey].parent) {
              const record = vm.tiers[key].values[idx];
              const ci = vm.tiers[ckey].values.findIndex(x => {
                return x.time == record.time;
              });
              if (ci != -1) {
                vm.setTierValue(ckey, ci, object, false, false);
              }
            }
          }
        } else if (isChild) {
          // 子要素が動いた場合, 親の同時刻を移動する
          const ps = vm.getParents(vm.tiers[key].parent);
          for (const p of ps) {
            const pi = vm.tiers[p].values.findIndex(x => {
              return x.time == record.time;
            });
            if (pi != -1) vm.tiers[p].values[pi].time = object.time;
          }
          vm.tiers[key].values[idx].time = object.time;
        } else {
          vm.tiers[key].values[idx].time = object.time;
        }
      } else {
        vm.tiers[key].values[idx] = object;
      }
      if (render) vm.render();
      if (fireEvent) vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
    });
  }

  @log("textgrid.deleteTierValue", DEBUG)
  deleteTierValue(key, idx, render = true, fireEvent = true) {
    const vm = this;
    this.saveKeyIdxInTier(key, idx, () => {
      const record = vm.tiers[key].values[idx];
      const isParent = vm.hasChildren(key);
      const isChild = vm.tiers[key].parent !== null;

      if (isParent) {
        // 親である場合, 子に向けて再帰呼出を行う
        for (const ckey in vm.tiers) {
          if (key == vm.tiers[ckey].parent) {
            const ci = vm.tiers[ckey].values.findIndex(x => {
              return x.time == record.time;
            });
            if (ci != -1) vm.deleteTierValue(ckey, ci, false, false);
          }
        }
      } else if (isChild) {
        // 自身が純粋な子の場合, 実処理を行う
        // その際には親操作を実施する
        const ps = vm.getParents(vm.tiers[key].parent);
        for (const p of ps) {
          const pi = vm.tiers[p].values.findIndex(x => {
            return x.time == record.time;
          });
          if (pi != -1) vm.tiers[p].values.splice(pi, 1);
        }
        vm.tiers[key].values.splice(idx, 1);
      } else {
        vm.tiers[key].values.splice(idx, 1);
      }

      if (render) vm.render();
      if (fireEvent) vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
    });
  }

  // file io
  loadObj(obj, fireEvent = true) {
    // TIER の初期化
    this.tiers = {};

    // 選択状態の初期化
    this.current = {
      key: null,
      item: null,
      index: null
    };

    // Tier の作成
    for (const key in obj) {
      const tier = obj[key];
      if (tier.type) {
        if (tier.type == "interval" || tier.type == "point") {
          const values = [];
          if (tier.values.length > 0) {
            for (const i in tier.values || []) {
              const v = tier.values[i];
              const time = v.time;
              if (typeof time === "number" && Number.isFinite(time)) {
                values.push({ time: time, text: v.text || "" });
              }

              if (i == tier.values.length - 1) {
                if (tier.type == "interval") {
                  if (v.time !== this.wavesurfer.getDuration()) {
                    values.push({
                      text: "",
                      time: this.wavesurfer.getDuration()
                    });
                  }
                }
              }
            }
          } else {
            if (tier.type == "interval") {
              values.push({
                text: "",
                time: this.wavesurfer.getDuration()
              });
            }
          }

          this.tiers[key] = {
            type: tier.type,
            values: values,
            parent: tier.parent || null
          };
        }
      }
    }

    // カーサー時刻を調整
    this.currentTime = this.wavesurfer.getCurrentTime();
    this.setCursorTime();

    this.render();
    if (fireEvent) this.wavesurfer.fireEvent("textgrid-update", this.tiers);
  }

  loadJson(file, fireEvent = true) {
    const vm = this;
    const fr = new FileReader();
    fr.readAsText(file);
    fr.addEventListener("load", () => {
      const obj = JSON.parse(fr.result);
      vm.loadObj(obj, fireEvent);
    });
  }

  loadTextGrid(file, fireEvent = true) {
    const fr = new FileReader();
    const vm = this;
    fr.readAsText(file);
    fr.addEventListener("load", () => {
      vm.loadObj(io.textgrid.load(fr.result), fireEvent);
    });
  }
  dumpTextGrid() {
    const duration = this.wavesurfer.backend.getDuration();
    const tiers = this.tiers;
    const content = io.textgrid.dump(duration, tiers);
    return content;
  }
  downloadTextGrid(filename) {
    const content = this.dumpTextGrid();
    const blob = new Blob([content], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.dataset.downloadurl = [
      "text/plain",
      downloadLink.download,
      downloadLink.href
    ].join(":");
    downloadLink.click();
  }
}
