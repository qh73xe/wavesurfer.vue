/* eslint-enable complexity, no-redeclare, no-var, one-var */
import { log } from "@/decorators.js";
import FFT from "./fft";
const DEBUG = false;

/**
 * @typedef {Object} SpectrogramPluginParams
 * @property {string|HTMLElement} container Selector of element or element in
 * which to render
 * @property {number} fftSamples=512 Number of samples to fetch to FFT. Must be
 * a power of 2.
 * @property {boolean} labels Set to true to display frequency labels.
 * @property {number} noverlap Size of the overlapping window. Must be <
 * fftSamples. Auto deduced from canvas size by default.
 * @property {string} windowFunc='hann' The window function to be used. One of
 * these: `'bartlett'`, `'bartlettHann'`, `'blackman'`, `'cosine'`, `'gauss'`,
 * `'hamming'`, `'hann'`, `'lanczoz'`, `'rectangular'`, `'triangular'`
 * @property {?number} alpha Some window functions have this extra value.
 * (Between 0 and 1)
 * @property {number} pixelRatio=wavesurfer.params.pixelRatio to control the
 * size of the spectrogram in relation with its canvas. 1 = Draw on the whole
 * canvas. 2 = Draw on a quarter (1/2 the length and 1/2 the width)
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('spectrogram')`
 * @property {?number[][]} colorMap A 256 long array of 4-element arrays.
 * Each entry should contain a float between 0 and 1 and specify
 * r, g, b, and alpha.
 */

/**
 * Render a spectrogram visualisation of the audio.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import SpectrogramPlugin from 'wavesurfer.spectrogram.js';
 *
 * // commonjs
 * var SpectrogramPlugin = require('wavesurfer.spectrogram.js');
 *
 * // if you are using <script> tags
 * var SpectrogramPlugin = window.WaveSurfer.spectrogram;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     SpectrogramPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
export default class SpectrogramPlugin {
  /**
   * Spectrogram plugin definition factory
   *
   * This function must be used to create a plugin definition which can be
   * used by wavesurfer to correctly instantiate the plugin.
   *
   * @param  {SpectrogramPluginParams} params Parameters used to initialise the plugin
   * @return {PluginDefinition} An object representing the plugin.
   */
  @log("spectrogram.create", DEBUG)
  static create(params) {
    return {
      name: "spectrogram",
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      staticProps: {
        FFT: FFT
      },
      instance: SpectrogramPlugin
    };
  }

  constructor(params, ws) {
    this.params = params;
    this.wavesurfer = ws;
    this.util = ws.util;
    this.frequencies = [];

    this.frequenciesDataUrl = params.frequenciesDataUrl;
    this._onRender = () => {
      this.render();
    };
    this._onWrapperScroll = e => {
      this._wrapperScrollHandler(e);
    };
    this._onWrapperClick = e => {
      this._wrapperClickHandler(e, ws);
    };
    this._onReady = () => {
      const drawer = (this.drawer = ws.drawer);
      this.container =
        "string" == typeof params.container
          ? document.querySelector(params.container)
          : params.container;

      if (!this.container) {
        throw Error("No container for WaveSurfer spectrogram");
      }
      if (params.colorMap) {
        if (params.colorMap.length < 256) {
          throw new Error("Colormap must contain 256 elements");
        }
        for (let i = 0; i < params.colorMap.length; i++) {
          const cmEntry = params.colorMap[i];
          if (cmEntry.length !== 4) {
            throw new Error("ColorMap entries must contain 4 values");
          }
        }
        this.colorMap = params.colorMap;
      } else {
        this.colorMap = [];
        for (let i = 0; i < 256; i++) {
          const val = (255 - i) / 256;
          this.colorMap.push([val, val, val, 1]);
        }
      }
      this.width = drawer.width;
      this.pixelRatio = this.params.pixelRatio || ws.params.pixelRatio;
      this.fftSamples = this.params.fftSamples || ws.params.fftSamples || 512;
      this.height = this.fftSamples / 2;
      this.canvasHeight = this.params.canvasHeight || this.height;
      this.noverlap = params.noverlap;
      this.windowFunc = params.windowFunc;
      this.alpha = params.alpha;
      this.currentTime = ws.getCurrentTime() || 0;

      this.createWrapper();
      this.createCanvas();
      this.render();
      drawer.wrapper.addEventListener("scroll", this._onWrapperScroll);
      ws.on("redraw", this._onRender);
      ws.backend.on("audioprocess", time => {
        this.currentTime = time;
        this.setCursorTime();
      });
      ws.on("seek", progress => {
        const time = progress * this.wavesurfer.getDuration();
        this.currentTime = time;
        this.setCursorTime();
      });
    };
  }

  @log("spectrogram.init", DEBUG)
  init() {
    // Check if wavesurfer is ready
    if (this.wavesurfer.isReady) {
      this._onReady();
    } else {
      this.wavesurfer.once("ready", this._onReady);
    }
  }

  @log("spectrogram.destroy", DEBUG)
  destroy() {
    this.unAll();
    this.wavesurfer.un("ready", this._onReady);
    this.wavesurfer.un("redraw", this._onRender);
    this.drawer &&
      this.drawer.wrapper.removeEventListener("scroll", this._onScroll);
    this.wavesurfer = null;
    this.util = null;
    this.params = null;
    if (this.wrapper) {
      this.wrapper.removeEventListener("click", this._onWrapperClick);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  @log("spectrogram.createWrapper", DEBUG)
  createWrapper() {
    const prevSpectrogram = this.container.querySelector("spectrogram");
    if (prevSpectrogram) {
      this.container.removeChild(prevSpectrogram);
    }
    const wsParams = this.wavesurfer.params;
    this.wrapper = document.createElement("spectrogram");

    const canvasHeight = this.canvasHeight || this.height / this.pixelRatio;
    // if labels are active
    if (this.params.labels) {
      const labelsEl = (this.labelsEl = document.createElement("canvas"));
      labelsEl.classList.add("spec-labels");
      this.drawer.style(labelsEl, {
        left: 0,
        position: "absolute",
        zIndex: 4,
        height: `${canvasHeight}px`,
        width: `${55 / this.pixelRatio}px`
      });
      this.wrapper.appendChild(labelsEl);
    }

    // cursor 用のキャンバスを作成
    const cursorEl = (this.cursorEl = document.createElement("div"));
    cursorEl.classList.add("spec-cursor");
    const cursorWidth = this.wavesurfer.params.cursorWidth || 1;
    this.drawer.style(cursorEl, {
      left: 0,
      position: "absolute",
      zIndex: 3,
      height: `${canvasHeight}px`,
      width: `${cursorWidth}px`,
      borderLeft: `${cursorWidth}px dashed ${this.wavesurfer.params.cursorColor}`
    });
    this.wrapper.appendChild(cursorEl);

    // キャンバス全体設定
    this.drawer.style(this.wrapper, {
      display: "block",
      position: "relative",
      userSelect: "none",
      webkitUserSelect: "none",
      height: `${canvasHeight}px`
    });

    if (wsParams.fillParent || wsParams.scrollParent) {
      this.drawer.style(this.wrapper, {
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden"
      });
    }
    this.container.appendChild(this.wrapper);
    this.wrapper.addEventListener("click", this._onWrapperClick);
  }

  @log("spectrogram._wrapperClickHandler", DEBUG)
  _wrapperClickHandler(event, ws) {
    event.preventDefault();
    const relX = "offsetX" in event ? event.offsetX : event.layerX;
    const progress = relX / this.width || 0;
    ws.seekTo(progress);
    this.fireEvent("click", progress);
  }

  @log("spectrogram._wrapperScrollHandler", DEBUG)
  _wrapperScrollHandler(e) {
    if (this.wrapper) {
      this.wrapper.scrollLeft = e.target.scrollLeft;
    }
  }

  @log("spectrogram.createCanvas", DEBUG)
  createCanvas() {
    const canvas = (this.canvas = this.wrapper.appendChild(
      document.createElement("canvas")
    ));
    this.canvas = canvas;
    this.spectrCc = canvas.getContext("2d");

    this.util.style(canvas, {
      position: "absolute",
      zIndex: 2
    });
  }

  @log("spectrogram.render", DEBUG)
  render() {
    this.updateCanvasStyle();
    this.wavesurfer.fireEvent("spectrogram-render-start");
    if (this.frequenciesDataUrl) {
      this.loadFrequenciesData(this.frequenciesDataUrl);
    } else {
      const vm = this;
      setTimeout(() => {
        vm.getFrequencies(vm.drawSpectrogram);
      }, 0);
    }
    this.setCursorTime();

    if (this.params.labels) {
      const freqFontSize = this.params.freqFontSize || 12;
      const unitFontSize = this.params.unitFontSize || 10;
      this.loadLabels(
        "rgba(68,68,68,0.5)",
        `${freqFontSize}px`,
        `${unitFontSize}px`,
        "",
        "#fff",
        "#f7f7f7",
        "center",
        "#specLabels"
      );
    }
  }

  @log("spectrogram.updateCanvasStyle", DEBUG)
  updateCanvasStyle() {
    this.width = this.drawer.width;
    const width = Math.round(this.width / this.pixelRatio) + "px";
    this.canvas.width = this.width;
    this.canvas.height = this.canvasHeight || this.height;
    this.canvas.style.width = width;
  }

  @log("spectrogram.drawerSpectrogram", DEBUG)
  async drawSpectrogram(frequenciesData, vm) {
    const height = vm.height;
    const widthFactor = vm.wavesurfer.params.minPxPerSec / 100;
    const pixels = vm.resample(frequenciesData);
    const freqRate = vm.params.freqRate || 1;
    let heightFactor = 4;
    if (vm.buffer) {
      if (vm.buffer.numberOfChannels) {
        heightFactor = 4 / vm.buffer.numberOfChannels;
      }
    }

    let i;
    let j;
    vm.spectrCc.clearRect(0, 0, vm.width, height);
    for (i = 0; i < pixels.length; i++) {
      for (j = 0; j < Math.round(pixels[i].length * freqRate); j++) {
        const colorMap = vm.colorMap[pixels[i][j]];
        vm.spectrCc.fillStyle = `rgba(${colorMap[0] * 256}, ${colorMap[1] *
          256}, ${colorMap[2] * 256}, ${colorMap[3]})`;
        vm.spectrCc.fillRect(
          Math.round(i * widthFactor),
          Math.round(height - j * (heightFactor / freqRate)),
          Math.round(widthFactor),
          Math.round(heightFactor / freqRate)
        );
      }
    }
    vm.wavesurfer.fireEvent("spectrogram-render-end");
  }

  @log("spectrogram.getFrequencies", DEBUG)
  async getFrequencies(callback) {
    const fftSamples = this.fftSamples;
    const buffer = (this.buffer = this.wavesurfer.backend.buffer);
    if (!buffer) {
      this.fireEvent("error", "Web Audio buffer is not available");
      return;
    }
    let targetChannel = 0;
    let channelOne;
    let sampleRate;
    if (buffer) {
      if (buffer.numberOfChannels != null) {
        if (buffer.numberOfChannels > 1) {
          targetChannel = this.params.targetChannel || 0;
        }
      }
      channelOne = buffer.getChannelData(targetChannel);
      sampleRate = buffer.sampleRate;
    }
    this.frequencies = [];
    let noverlap = this.noverlap;
    if (!noverlap) {
      const uniqueSamplesPerPx = buffer.length / this.canvas.width;
      noverlap = Math.max(0, Math.round(fftSamples - uniqueSamplesPerPx));
    }

    const fft = new FFT(fftSamples, sampleRate, this.windowFunc, this.alpha);
    let currentOffset = 0;

    while (currentOffset + fftSamples < channelOne.length) {
      const segment = channelOne.slice(
        currentOffset,
        currentOffset + fftSamples
      );
      const spectrum = await fft.async_calculateSpectrum(segment);
      const array = spectrum.slice(0, Math.round(fftSamples / 2)).map(x => {
        return Math.max(-255, Math.log10(x) * 45);
      });
      this.frequencies.push(array);
      currentOffset += fftSamples - noverlap;
    }
    callback(this.frequencies, this);
  }

  loadFrequenciesData(url) {
    const request = this.util.fetchFile({ url: url });
    request.on("success", data => this.drawSpectrogram(JSON.parse(data), this));
    request.on("error", e => this.fireEvent("error", e));
    return request;
  }

  freqType(freq) {
    return freq >= 1000 ? (freq / 1000).toFixed(1) : Math.round(freq);
  }

  unitType(freq) {
    return freq >= 1000 ? "KHz" : "Hz";
  }

  @log("spectrogram.loadLabels", DEBUG)
  loadLabels(
    bgFill,
    fontSizeFreq,
    fontSizeUnit,
    fontType,
    textColorFreq,
    textColorUnit,
    textAlign
  ) {
    bgFill = bgFill || "rgba(68,68,68,0)";
    fontSizeFreq = fontSizeFreq || "12px";
    fontSizeUnit = fontSizeUnit || "10px";
    fontType = fontType || "Helvetica";
    textColorFreq = textColorFreq || "#fff";
    textColorUnit = textColorUnit || "#fff";
    textAlign = textAlign || "center";
    const freqRate = this.params.freqRate || 1;
    let heightFactor = 4;
    if (this.buffer) {
      if (this.buffer.numberOfChannels) {
        heightFactor = 2 / this.buffer.numberOfChannels;
      }
    }
    const bgWidth = 55;
    const getMaxY = 512;
    const labelIndex = 5 * (getMaxY / (256 * freqRate));
    const freqStart = 0;
    const step =
      (this.wavesurfer.backend.ac.sampleRate / 2 - freqStart) / labelIndex;
    // prepare canvas element for labels
    const ctx = this.labelsEl.getContext("2d");
    this.labelsEl.height = this.height;
    this.labelsEl.width = bgWidth;

    // fill background
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, bgWidth, getMaxY);
    ctx.fill();
    let i;

    // render labels
    for (i = 0; i <= labelIndex; i++) {
      ctx.textAlign = textAlign;
      ctx.textBaseline = "middle";

      const freq = freqStart + step * i;
      const label = this.freqType(freq / (2 * heightFactor));
      const units = this.unitType(freq);
      const yLabelOffset = 2;

      const x = 16;
      let y;
      if (i == 0) {
        y = getMaxY + i - 10;
        // unit label
        ctx.fillStyle = textColorUnit;
        ctx.font = fontSizeUnit + " " + fontType;
        ctx.fillText(units, x + 24, y);
        // freq label
        ctx.fillStyle = textColorFreq;
        ctx.font = fontSizeFreq + " " + fontType;
        ctx.fillText(label, x, y);
      } else {
        y = getMaxY - i * 50 + yLabelOffset;
        // unit label
        ctx.fillStyle = textColorUnit;
        ctx.font = fontSizeUnit + " " + fontType;
        ctx.fillText(units, x + 24, y);
        // freq label
        ctx.fillStyle = textColorFreq;
        ctx.font = fontSizeFreq + " " + fontType;
        ctx.fillText(label, x, y);
      }
    }
  }
  @log("spectrogram.resample", DEBUG)
  resample(oldMatrix) {
    const widthFactor = this.wavesurfer.params.minPxPerSec / 100;
    const columnsNumber = this.width / widthFactor;
    const newMatrix = [];

    const oldPiece = 1 / oldMatrix.length;
    const newPiece = 1 / columnsNumber;
    let i;

    for (i = 0; i < columnsNumber; i++) {
      const column = new Array(oldMatrix[0].length);
      let j;

      for (j = 0; j < oldMatrix.length; j++) {
        const oldStart = j * oldPiece;
        const oldEnd = oldStart + oldPiece;
        const newStart = i * newPiece;
        const newEnd = newStart + newPiece;

        const overlap =
          oldEnd <= newStart || newEnd <= oldStart
            ? 0
            : Math.min(Math.max(oldEnd, newStart), Math.max(newEnd, oldStart)) -
              Math.max(Math.min(oldEnd, newStart), Math.min(newEnd, oldStart));
        let k;
        /* eslint-disable max-depth */
        if (overlap > 0) {
          for (k = 0; k < oldMatrix[0].length; k++) {
            if (column[k] == null) {
              column[k] = 0;
            }
            column[k] += (overlap / newPiece) * oldMatrix[j][k];
          }
        }
        /* eslint-enable max-depth */
      }

      const intColumn = new Uint8Array(oldMatrix[0].length);
      let m;

      for (m = 0; m < oldMatrix[0].length; m++) {
        intColumn[m] = column[m];
      }

      newMatrix.push(intColumn);
    }

    return newMatrix;
  }
  @log("spectrogram.setCursorTime", DEBUG)
  setCursorTime() {
    if (this.cursorEl) {
      const duration = this.wavesurfer.getDuration();
      const width = this.canvas.width;
      const _left = (this.currentTime * width) / duration;
      const left = _left ? `${_left}px` : this.cursorEl.style.left;
      this.cursorEl.style.left = left;
    }
  }
}
