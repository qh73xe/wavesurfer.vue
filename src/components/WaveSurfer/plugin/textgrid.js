/**
 * @typedef {Object} TextgridPluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where the textgrid should be drawn. This is the only required parameter.
 * @property {string} color='#c0c0c0' The colour of the notches
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
   * @param {object} e Click event
   */
  _onWrapperClick = e => {
    e.preventDefault();
    const relX = "offsetX" in e ? e.offsetX : e.layerX;
    this.fireEvent("click", relX / this.wrapper.scrollWidth || 0);
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
        height: 50,
        color: "#c0c0c0",
        fontColor: "#000",
        fontFamily: "Arial",
        fontSize: 15,
        zoomDebounce: false,
        tiers: {
          IPU: {
            type: "interval",
            values: [
              { time: 1, text: "test:interval:1" },
              { time: 1.1, text: "test:interval:2" },
              { time: 2, text: "test:interval:3" }
            ]
          },
          point: {
            type: "point",
            values: [
              { time: 2, text: "p1" },
              { time: 3.1, text: "p2" },
              { time: 4, text: "p3" }
            ]
          }
        }
      },
      params
    );

    this.wrapper = null;
    this.drawer = null;
    this.pixelRatio = null;
    this.maxCanvasWidth = null;
    this.maxCanvasElementWidth = null;
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
      this.wrapper.removeEventListener("click", this._onWrapperClick);
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
    this.wrapper.addEventListener("click", this._onWrapperClick);
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
      height: `${this.params.height * Object.keys(this.params.tiers).length}px`
    });
    if (this.wsParams.fillParent || this.wsParams.scrollParent) {
      this.util.style(this.wrapper, {
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden"
      });
    }
    let i = 0;
    for (const key in this.params.tiers) {
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
    if (this.params.tiers[key].canvas == undefined) {
      const canvas = this.wrapper.appendChild(document.createElement("canvas"));
      this.util.style(canvas, {
        position: "absolute",
        zIndex: 3,
        top: `${i * this.params.height}px`,
        "border-top": `solid 1px ${this.params.color}`,
        "border-bottom": `solid 1px ${this.params.color}`
      });
      this.params.tiers[key].canvas = canvas;

      const label = this.wrapper.appendChild(document.createElement("canvas"));
      label.classList.add("tier-labels");
      this.drawer.style(label, {
        position: "absolute",
        top: `${i * this.params.height}px`,
        zIndex: 4,
        width: "${this.params.fontSize + 4}px"
      });
      this.params.tiers[key].label = label;
    }
  }

  /**
   * Remove textgrid canvas
   *
   */
  removeCanvas(key) {
    const canvas = this.params.tiers[key].canvas;
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
    const canvas = this.params.tiers[key].canvas;
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

    const wsParams = this.wavesurfer.params;
    const width =
      wsParams.fillParent && !wsParams.scrollParent
        ? this.drawer.getWidth()
        : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
    const height = this.params.height * this.pixelRatio;
    const pixelsPerSecond = width / duration;

    // build an array of position data with index, second and pixel data,
    // this is then used multiple times below
    const values = this.params.tiers[key].values;
    values.sort((a, b) => {
      a.time - b.time;
    });

    const positioning = [];
    let i = 0;
    for (const x of values) {
      const curPixel = pixelsPerSecond * x.time;
      const prePixel = i == 0 ? 0 : pixelsPerSecond * values[i - 1].time;
      positioning.push([x.time, curPixel, prePixel, x.text]);
      i++;
    }

    // iterate over each position
    const renderPositions = cb => {
      positioning.forEach(pos => {
        cb(pos[0], pos[1], pos[2], pos[3]);
      });
    };

    // render labels
    this.setFillStyles(key, this.params.color);
    this.setFillStyles(key, this.params.fontColor);
    this.fillRect(key, 0, 0, 1, height);
    renderPositions((curSeconds, curPixel, prePixel, text) => {
      this.fillRect(key, curPixel, 0, 1, height);

      // 文字表示が可能な場合文字を表示
      if (text) {
        let fontSize = this.params.fontSize * wsParams.pixelRatio;
        const pixels = curPixel - prePixel;
        const textPiexels = fontSize * text.length;
        if (pixels < textPiexels) {
          fontSize = Math.round(pixels / text.length);
          this.setFonts(key, `${fontSize}px ${this.params.fontFamily}`);
        }

        this.setFonts(key, `${fontSize}px ${this.params.fontFamily}`);
        this.fillText(
          key,
          text,
          Math.round((prePixel + curPixel) / 2) - fontSize * text.length * 0.25,
          height + fontSize / 2
        );
      }
    });
  }
  renderLabel(key) {
    const bgWidth = this.params.fontSize;
    const bgFill = `rgba(${[0, 0, 0, 0.5]})`;

    const label = this.params.tiers[key].label;
    const ctx = label.getContext("2d");
    label.height = this.params.tiers[key].canvas.height;
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
    const canvas = this.params.tiers[key].canvas;
    canvas.getContext("2d").fillStyle = fillStyle;
  }

  /**
   * Set the canvas font
   *
   * @param {DOMString} font Font to use
   */
  setFonts(key, font) {
    const canvas = this.params.tiers[key].canvas;
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
    const canvas = this.params.tiers[key].canvas;
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
    const canvas = this.params.tiers[key].canvas;
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
}
