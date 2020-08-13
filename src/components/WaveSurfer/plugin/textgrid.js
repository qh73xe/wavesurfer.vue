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
    this.wavesurfer.drawer.wrapper.removeEventListener(
      "scroll",
      this._onScroll
    );
    if (this.wrapper && this.wrapper.parentNode) {
      for (const key in this.tiers) {
        const canvas = this.tiers[key].canvas;
        canvas.removeEventListener("dblclick", canvas.onDblClick);
      }
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
    this.wrapper = this.container.appendChild(
      document.createElement("textgrid")
    );
  }

  /**
   * Render the textgrid (also updates the already rendered textgrid)
   *
   */
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
      this.updateCanvasPositioning(key);
      this.renderCanvas(key);
      this.renderLabel(key);
      i++;
    }
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
        "border-top": `solid 1px ${this.params.color}`,
        "border-bottom": `solid 1px ${this.params.color}`
      });

      // add canvas events
      const vm = this;
      this.tiers[key].onClick = function(e) {
        e.preventDefault();
        // seek to click point
        const progress = vm.event2progress(e);
        vm.wavesurfer.seekTo(progress);

        // fire event
        const time = vm.event2time(e);
        const payload = { key: key, time: time };
        vm.wavesurfer.fireEvent("textgrid-click", payload);

        // set curent item
        let canditates = vm.tiers[key].values.filter(x => {
          return x.time >= time;
        });
        canditates.sort((a, b) => a.time - b.time);
        const currentItem = canditates[0];
        if (currentItem) {
          vm.setCurrent(key, currentItem);
          vm.render();
        }
      };

      this.tiers[key].onDblClick = function(e) {
        e.preventDefault();
        const time = vm.event2time(e);
        const item = { key: key, time: time };
        vm.wavesurfer.fireEvent("textgrid-dblclick", item);
      };

      // dragging handlers.
      this.tiers[key].isDraging = false;
      this.tiers[key].dragingItemIdx = null;

      let timer;
      const draggingMousemove = function(e) {
        canvas.style.cursor = "grabbing";
        clearTimeout(timer);
        timer = setTimeout(function() {
          const idx = vm.tiers[key].dragingItemIdx;
          if (vm.tiers[key].values[idx]) {
            vm.tiers[key].values[idx].time = vm.event2time(e);
            vm.setCurrent(vm.tiers[key].values[idx]);
            vm.render();
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

      canvas.addEventListener("click", this.tiers[key].onClick, false);
      canvas.addEventListener("dblclick", this.tiers[key].onDblClick, false);
      canvas.addEventListener("mousemove", this.tiers[key].onMouseMove, false);

      // set a canvas in this.tiers
      this.tiers[key].canvas = canvas;

      // set lavel of a canvas
      const label = this.wrapper.appendChild(document.createElement("canvas"));
      label.classList.add("tier-labels");
      this.drawer.style(label, {
        position: "absolute",
        top: `${i * this.params.height}px`,
        zIndex: 4,
        width: "${this.params.fontSize + 4}px"
      });
      this.tiers[key].label = label;
    }
  }

  /**
   * Remove textgrid canvas
   *
   */
  removeCanvas(key) {
    const canvas = this.tiers[key].canvas;
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
  updateCanvasPositioning(key) {
    const canvas = this.tiers[key].canvas;
    // cache length for performance
    const canvasesLength = 1;
    // canvas width is the max element width, or if it is the last the
    // required width
    const canvasWidth =
      0 === canvasesLength - 1
        ? this.drawer.wrapper.scrollWidth -
          this.maxCanvasElementWidth * (canvasesLength - 1)
        : this.maxCanvasElementWidth;
    // set dimensions and style
    canvas.width = canvasWidth * this.pixelRatio;
    // on certain pixel ratios the canvas appears cut off at the bottom,
    // therefore leave 1px extra
    canvas.height = (this.params.height + 1) * this.pixelRatio;
    this.util.style(canvas, {
      width: `${canvasWidth}px`,
      height: `${this.params.height}px`,
      left: `${0 * this.maxCanvasElementWidth}px`
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
      if (this.current.key == key && this.current.item) {
        if (this.current.item.time == curSeconds) {
          this.setFillStyles(key, this.params.activeColor);
          const canvas = this.tiers[key].canvas;
          canvas
            .getContext("2d")
            .fillRect(prePixel, 0, curPixel - prePixel, canvas.height);
        }
        this.setFillStyles(key, this.params.color);
        this.setFillStyles(key, this.params.fontColor);
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
      if (this.current.key == key && this.current.item) {
        if (this.current.item.time == curSeconds) {
          this.setFillStyles(key, this.params.activeColor);
          this.fillRect(key, curPixel, 0, 3, Math.round(height / 2));
        } else {
          this.setFillStyles(key, this.params.color);
          this.fillRect(key, curPixel, 0, 1, Math.round(height / 2));
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
    if (item) {
      this.current.index = this.tiers[key].values.findIndex(
        x => x.time == this.current.item.time
      );
    }
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
  addTier(key, type) {
    if (key in this.tiers) {
      this.wavesurfer.fireEvent(
        "error",
        new Error(`Duplicate tier name (${key})`)
      );
    } else {
      const values =
        type == "interval"
          ? [{ text: "", time: this.wavesurfer.getDuration() }]
          : [];
      this.tiers[key] = {
        type: type,
        values: values
      };
      this.render();
      this.setCurrent(key, null);
      this.wavesurfer.fireEvent("textgrid-update", this.tiers);
    }
  }

  @log("textgrid.deleteTier", DEBUG)
  deleteTier(key) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      vm.removeCanvas(key);
      delete vm.tiers[key];
      vm.setCurrent(null, null);
      vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
      vm.render();
    });
  }

  @log("textgrid.updateTier", DEBUG)
  updateTier(key, obj) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      if ("name" in obj) {
        const type = "type" in obj ? obj.type : vm.tiers[key].type;
        const values = vm.tiers[key];
        vm.addTier(obj.name, type);
        vm.tiers[obj.name].values = values;
        vm.setCurrent(obj.name, values[0]);
        vm.wavesurfer.fireEvent("textgrid-current-update", vm.current);
        vm.deleteTier(key);
      } else if ("type" in obj) {
        vm.tiers[key].type = obj.type;
        vm.setCurrent(key, vm.tiers[key].values[0]);
      }
      vm.render();
      vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
    });
  }

  // TIER ITEM CONTROL FUNCTIONS
  @log("textgrid.addTierValue", DEBUG)
  addTierValue(key, obj) {
    const vm = this;
    this.saveKeyInTier(key, () => {
      vm.tiers[key].values.push(obj);
      vm.setCurrent(key, obj);
      vm.render();
      vm.wavesurfer.fireEvent("textgrid-update", this.tiers);
    });
  }

  @log("textgrid.setTierValue", true)
  setTierValue(key, idx, object) {
    const vm = this;
    this.saveKeyIdxInTier(key, idx, () => {
      vm.tiers[key].values[idx] = object;
      vm.setCurrent(key, vm.tiers[key].values[idx]);
      vm.render();
      vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
    });
  }

  @log("textgrid.deleteTierValue", DEBUG)
  deleteTierValue(key, idx) {
    const vm = this;
    this.saveKeyIdxInTier(key, idx, () => {
      vm.tiers[key].values.splice(idx, 1);
      vm.setCurrent(key, null);
      vm.render();
      vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
    });
  }

  // file io
  loadTextGrid(file) {
    const fr = new FileReader();
    const vm = this;
    fr.readAsText(file);
    fr.addEventListener("load", () => {
      vm.tiers = io.textgrid.load(fr.result);
      const keys = Object.keys(this.tiers);
      for (const key in this.tiers) {
        if (vm.tiers[key].type == "interval") {
          vm.tiers[key].values.push({
            text: "",
            time: vm.wavesurfer.getDuration()
          });
        }
      }
      vm.setCurrent(keys[0], this.tiers[keys[0]].values[0]);
      vm.wavesurfer.fireEvent("textgrid-current-update", vm.current);
      vm.render();
      vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
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
