// デバックロガー
import { perf, log } from "@/decorators.js";
const DEBUG = false;

/**
 * @typedef {Object} PointlinePluginParams.
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with.
 * @property {!string|HTMLElement} container CSS selector or HTML element where the pointline should be drawn. This is the only required parameter.
 * @property {?number} zoomDebounce A debounce timeout to increase rendering performance for large files
 * @property {?number} duration Length of the track in seconds. Overrides
 * getDuration() for setting length of pointline labels in primary color
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('pointline')`
 */

/**
 * Adds a pointline to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import PointlinePlugin from 'wavesurfer.pointline.js';
 *
 * // commonjs
 * var PointlinePlugin = require('wavesurfer.pointline.js');
 *
 * // if you are using <script> tags
 * var PointlinePlugin = window.WaveSurfer.pointline;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     PointlinePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
export default class PointlinePlugin {
  /**
   * Pointline plugin definition factory
   *
   * This function must be used to create a plugin definition which can be
   * used by wavesurfer to correctly instantiate the plugin.
   *
   * @param  {PointlinePluginParams} params parameters use to initialise the plugin
   * @return {PluginDefinition} an object representing the plugin
   */
  @log("pointline.create", DEBUG)
  static create(params) {
    return {
      name: "pointline",
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: PointlinePlugin
    };
  }

  // event handlers
  /** @private */
  _onScroll = () => {
    if (this.wrapper && this.drawer.wrapper) {
      this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
    }
  };

  /**
   * @private
   * @returns {void}
   */
  _onRedraw = () => this.render();

  /** @private */
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
   * @private
   * @param {object} e Click event
   */
  _onWrapperClick = e => {
    e.preventDefault();
    const relX = "offsetX" in e ? e.offsetX : e.layerX;
    this.fireEvent("click", relX / this.wrapper.scrollWidth || 0);
  };

  /**
   * Creates an instance of PointlinePlugin.
   *
   * You probably want to use PointlinePlugin.create()
   *
   * @param {PointlinePluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  constructor(params, ws) {
    /** @private */
    perf("pointline.constructor", () => {
      this.container =
        "string" == typeof params.container
          ? document.querySelector(params.container)
          : params.container;

      if (!this.container) {
        throw new Error("No container for wavesurfer pointline");
      }
      /** @private */
      this.wavesurfer = ws;
      /** @private */
      this.util = ws.util;
      /** @private */
      this.params = Object.assign(
        {},
        {
          height: 100,
          pointWidth: 3,
          duration: null,
          zoomDebounce: false
        },
        params
      );

      /** @private */
      if (this.params.points.length > 0) {
        this.params.points = this.params.points.map(x => {
          if (x.id === undefined) {
            x.id = this.genUuid();
          }
          return x;
        });
      }

      /** @private */
      this.canvases = [];
      /** @private */
      this.wrapper = null;
      /** @private */
      this.drawer = null;
      /** @private */
      this.pixelRatio = null;
      /** @private */
      this.maxCanvasWidth = null;
      /** @private */
      this.maxCanvasElementWidth = null;
      /**
       * This event handler has to be in the constructor function because it
       * relies on the debounce function which is only available after
       * instantiation
       *
       * Use a debounced function if `params.zoomDebounce` is defined
       *
       * @private
       * @returns {void}
       */
      this._onZoom = this.params.zoomDebounce
        ? this.wavesurfer.util.debounce(
            () => this.render(),
            this.params.zoomDebounce
          )
        : () => this.render();
    });
  }

  /**
   * Initialisation function used by the plugin API
   */
  @log("pointline.init", DEBUG)
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
  @log("pointline.destroy", DEBUG)
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
      this.wrapper.removeEventListener("click", this._onWrapperClick);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  /**
   * Create a pointline element to wrap the canvases drawn by this plugin
   *
   * @private
   */
  @log("pointline.createWrapper", DEBUG)
  createWrapper() {
    const wsParams = this.wavesurfer.params;
    this.container.innerHTML = "";
    this.wrapper = this.container.appendChild(
      document.createElement("pointline")
    );
    this.util.style(this.wrapper, {
      display: "block",
      position: "relative",
      userSelect: "none",
      webkitUserSelect: "none",
      height: `${this.params.height}px`
    });

    if (wsParams.fillParent || wsParams.scrollParent) {
      this.util.style(this.wrapper, {
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden"
      });
    }

    this.wrapper.addEventListener("click", this._onWrapperClick);
  }

  /**
   * Render the pointline (also updates the already rendered pointline)
   *
   * @private
   */
  @log("pointline.render", DEBUG)
  render() {
    if (!this.wrapper) {
      this.createWrapper();
    }
    this.updateCanvases();
    this.updateCanvasesPositioning();
    this.renderCanvases();
  }

  @log("pointline.genUuid", DEBUG)
  genUuid() {
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join("");
  }

  @log("pointline.addPoint", DEBUG)
  addPoint(obj) {
    const point = {
      id: this.genUuid(),
      time: obj.time,
      value: obj.value,
      color: obj.color,
      size: obj.size
    };
    this.params.points.push(point);
    this.render();
    this.fireEvent("addPoint", point);
  }

  @log("pointline.updatePoint", DEBUG)
  updatePoint(id, point) {
    const idx = this.params.points.findIndex(x => x.id == id);
    if (idx > -1) {
      point.id = this.params.points[idx].id;
      this.params.points[idx] = point;
      this.render();
      this.fireEvent("updatePoint", point);
    }
  }

  @log("pointline.deletePoint", DEBUG)
  deletePoint(id) {
    const idx = this.params.points.findIndex(x => x.id == id);
    if (idx > -1) {
      const point = this.params.points[idx];
      this.params.points.splice(idx, 1);
      this.render();
      this.fireEvent("deletePoint", point);
    }
  }

  /**
   * Add new pointline canvas
   *
   * @private
   */
  @log("pointline.addCanvas", DEBUG)
  addCanvas() {
    const canvas = this.wrapper.appendChild(document.createElement("canvas"));
    this.canvases.push(canvas);
    this.util.style(canvas, {
      position: "absolute",
      zIndex: 4
    });
  }

  /**
   * Remove pointline canvas
   *
   * @private
   */
  @log("pointline.removeCanvas", DEBUG)
  removeCanvas() {
    const canvas = this.canvases.pop();
    canvas.parentElement.removeChild(canvas);
  }

  /**
   * Make sure the correct of pointline canvas elements exist and are cached in
   * this.canvases
   *
   * @private
   */
  @log("pointline.updateCanvases", DEBUG)
  updateCanvases() {
    const totalWidth = Math.round(this.drawer.wrapper.scrollWidth);
    const requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);
    while (this.canvases.length < requiredCanvases) {
      this.addCanvas();
    }
    while (this.canvases.length > requiredCanvases) {
      this.removeCanvas();
    }
  }

  /**
   * Update the dimensions and positioning style for all the pointline canvases
   *
   * @private
   */
  @log("pointline.updateCanvasesPositioning", DEBUG)
  updateCanvasesPositioning() {
    // cache length for performance
    const canvasesLength = this.canvases.length;
    this.canvases.forEach((canvas, i) => {
      // canvas width is the max element width, or if it is the last the
      // required width
      const canvasWidth =
        i === canvasesLength - 1
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
        left: `${i * this.maxCanvasElementWidth}px`
      });
    });
  }

  /**
   * Render the pointline labels and notches
   *
   * @private
   */
  @log("pointline.renderCanvases", DEBUG)
  renderCanvases() {
    const duration =
      this.wavesurfer.pointline.params.duration ||
      this.wavesurfer.backend.getDuration();
    if (duration <= 0) {
      return;
    }
    const wsParams = this.wavesurfer.params;
    const width =
      wsParams.fillParent && !wsParams.scrollParent
        ? this.drawer.getWidth()
        : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
    const pixelsPerSecond = width / duration;

    // build an array of position data with index, second and pixel data,
    // this is then used multiple times below

    // points の正規化
    const vm = this;
    const positioning = [];
    const minVal = Math.min.apply(
      null,
      vm.params.points.map(x => {
        return x.value;
      })
    );
    const tmps = this.params.points.map(function(x) {
      const color = "color" in x ? x.color : "#000";
      const size = "size" in x ? Number(x.size) : vm.params.pointWidth;
      return {
        time: x.time,
        value: x.value - minVal,
        color: color,
        size: size
      };
    });
    const maxVal = Math.max.apply(
      null,
      tmps.map(x => x.value)
    );
    const points = tmps.map(function(x) {
      const value = x.value == 0 ? x.value : x.value / maxVal;
      return { time: x.time, value: value, color: x.color, size: x.size };
    });
    for (const x of points) {
      const curSeconds = x.time;
      const curPixel = pixelsPerSecond * x.time;
      positioning.push([curSeconds, curPixel, x.value, x.color, x.size]);
    }
    // iterate over each position
    const renderPositions = cb => {
      positioning.forEach(pos => {
        cb(pos[0], pos[1], pos[2], pos[3], pos[4]);
      });
    };
    // render primary labels
    renderPositions((curSeconds, curPixel, val, color, size) => {
      this.setFillStyles(color);
      this.fillRect(curPixel, val, size);
    });
  }

  /**
   * Set the canvas fill style
   *
   * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle Fill style to
   * use
   * @private
   */
  @log("pointline.setFillStyles", DEBUG)
  setFillStyles(fillStyle) {
    this.canvases.forEach(canvas => {
      canvas.getContext("2d").fillStyle = fillStyle;
    });
  }

  /**
   * Draw a rectangle on the canvases
   *
   * (it figures out the offset for each canvas)
   *
   * @param {number} x X-position
   * @param {number} y Y-position
   * @param {number} width Width
   * @param {number} height Height
   * @private
   */
  @log("pointline.fillRect", DEBUG)
  fillRect(x, y, width) {
    this.canvases.forEach((canvas, i) => {
      const leftOffset = i * this.maxCanvasWidth;
      const intersection = {
        x1: Math.max(x, i * this.maxCanvasWidth),
        x2: Math.min(x + width, i * this.maxCanvasWidth + canvas.width)
      };
      if (intersection.x1 < intersection.x2) {
        const val = y * canvas.height;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(
          intersection.x1 - leftOffset,
          canvas.height - val,
          width,
          (0 * Math.PI) / 180,
          (360 * Math.PI) / 180,
          false
        );
        ctx.fill();
      }
    });
  }

  /**
   * Turn the time into a suitable label for the time.
   *
   * @param {number} seconds Seconds to format
   * @param {number} pxPerSec Pixels per second
   * @returns {number} Time
   */
  @log("pointline.defaultFormatTimeCallback", DEBUG)
  defaultFormatTimeCallback(seconds) {
    if (seconds / 60 > 1) {
      // calculate minutes and seconds from seconds count
      const minutes = parseInt(seconds / 60, 10);
      seconds = parseInt(seconds % 60, 10);
      // fill up seconds with zeroes
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return `${minutes}:${seconds}`;
    }
    return Math.round(seconds * 1000) / 1000;
  }

  /**
   * Return how many seconds should be between each notch
   *
   * @param {number} pxPerSec Pixels per second
   * @returns {number} Time
   */
  @log("pointline.defaultTimeInterval", DEBUG)
  defaultTimeInterval(pxPerSec) {
    if (pxPerSec >= 25) {
      return 1;
    } else if (pxPerSec * 5 >= 25) {
      return 5;
    } else if (pxPerSec * 15 >= 25) {
      return 15;
    }
    return Math.ceil(0.5 / pxPerSec) * 60;
  }

  /**
   * Return the cadence of notches that get labels in the primary color.
   *
   * @param {number} pxPerSec Pixels per second
   * @returns {number} Cadence
   */
  @log("pointline.defaultPrimaryLabelInterval", DEBUG)
  defaultPrimaryLabelInterval(pxPerSec) {
    if (pxPerSec >= 25) {
      return 10;
    } else if (pxPerSec * 5 >= 25) {
      return 6;
    } else if (pxPerSec * 15 >= 25) {
      return 4;
    }
    return 4;
  }
}
