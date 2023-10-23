import BasePlugin, { type BasePluginEvents } from "wavesurfer.js/dist/base-plugin.js";
import BaseTier, { Tier, TierItem, TierType } from "./tier";

export interface TierOptions {
  name: string;
  type: TierType;
  items: TierItem[];
}
export type TextGrid = Record<string, TierOptions>;

export type TextGridPluginOptions = {
  /** Selector of element or element in which to render */
  container?: string | HTMLElement;
  /** Height of the spectrogram view in CSS pixels */
  height?: number;
  /** ボーダーカラー */
  borderColor?: string;
  /** レンダー対象のデータ形式 */
  tg?: TextGrid;
};

interface TierClickEvent {
  name: string;
  relativeX: number;
  time: number;
}
export type TextGridPluginEvents = BasePluginEvents & {
  ready: [];
  "tier-click": [event: TierClickEvent];
};

class TextGridPlugin extends BasePlugin<
  TextGridPluginEvents,
  TextGridPluginOptions
> {
  container?: HTMLElement;
  wrapper?: HTMLDivElement;
  height: number = 64;
  borderColor: string = "black";
  tiers: Record<string, Tier> = {};
  tg: TextGrid | null = null;
  utils = {
    style: (
      el: HTMLElement,
      styles: Record<string, string>,
    ) => Object.assign(el.style, styles),
  };

  static create(options?: TextGridPluginOptions) {
    return new TextGridPlugin(options || {});
  }

  constructor(options: TextGridPluginOptions) {
    super(options);
    this.height = options.height || this.height;
    this.borderColor = options.borderColor || this.borderColor;
    if (typeof options.container === "string") {
      const newContainer = document.querySelector(
        options.container,
      );
      if (newContainer) {
        this.container = newContainer as HTMLElement;
      }
    } else {
      this.container = options.container;
    }
    if (options.tg) this.tg = options.tg;
  }

  onInit() {
    if (!this.wavesurfer) {
      throw Error("WaveSurfer is not initialized");
    }
    this.createWrapper();
    if (this.wavesurfer && this.wrapper) {
      this.container = this.container || this.wavesurfer.getWrapper();
      this.container.appendChild(this.wrapper);
    }
    this.subscriptions.push(
      this.wavesurfer.on("ready", () => this.redraw()),
    );
  }

  destroy() {
    this.unAll();
    Object.values(this.tiers).forEach((x) => {
      x.destroy();
    });
    if (this.wrapper) {
      this.wrapper.remove();
    }
    super.destroy();
  }

  createWrapper() {
    this.wrapper = document.createElement("div");
    this.utils.style(this.wrapper, {
      display: "block",
      position: "relative",
      borderBottom: `${this.borderColor} 1px solid`,
      userSelect: "none",
    });
  }

  handleTierClick(
    vm: TextGridPlugin,
    name: string,
    event: MouseEvent,
  ) {
    event.preventDefault();
    if (vm.wavesurfer) {
      const offsetX = event.offsetX || 0;
      const width = vm.wavesurfer.getWrapper().offsetWidth || 0;
      const relativeX = offsetX / width || 0;
      const time = vm.wavesurfer.getDuration() * relativeX;
      vm.emit("tier-click", { name, relativeX, time });
    }
  }

  redraw() {
    if (this.tg) {
      Object.entries(this.tg).forEach(([pk, x]) => {
        this.createCanvas(pk, x.name, x.type, x.items);
      });
    }
  }

  createCanvas(
    id: string,
    name: string,
    type: TierType,
    items: TierItem[],
  ) {
    const { height, borderColor, wrapper } = this;
    if (wrapper) {
      const duration = this.wavesurfer?.getDuration();
      const canvasSize = Object.keys(this.tiers).length;
      const top = height * canvasSize;
      this.tiers[name] = new BaseTier(wrapper, {
        name,
        id,
        type,
        top,
        height,
        borderColor,
        items,
        duration,
      });
      this.tiers[name].on("click", (e) => this.handleTierClick(this, name, e)),
        this.utils.style(wrapper, { height: (canvasSize + 1) * this.height + "px" });
    }
  }
}

export default TextGridPlugin;
