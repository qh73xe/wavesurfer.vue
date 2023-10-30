import BasePlugin, { type BasePluginEvents } from "wavesurfer.js/dist/base-plugin.js";
import BaseTier, { Tier, TierItem, TierType, TierUiOptions, IntervalItem, HEIGHT, BORDERCOLOR } from "./tier";

export interface TierOptions {
  name: string;
  type: TierType;
  items: TierItem[];
}
export type TextGrid = Record<string, TierOptions>;

export interface TextGridPluginOptions extends TierUiOptions {
  /** Selector of element or element in which to render */
  container?: string | HTMLElement;
  /** レンダー対象のデータ形式 */
  textGrid?: TextGrid;
}

interface TierClickEvent {
  tierID: string;
  relativeX: number;
  item: IntervalItem;
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
  options: TextGridPluginOptions;
  tiers: Record<string, Tier> = {};
  textGrid: TextGrid | null = null;
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
    this.options = {
      height: options.height || HEIGHT,
      ...options,
    };
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
    if (options.textGrid) this.textGrid = options.textGrid;
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
    const borderColor = this.options.borderColor || BORDERCOLOR;
    this.wrapper = document.createElement("div");
    this.utils.style(this.wrapper, {
      display: "block",
      position: "relative",
      borderBottom: `${borderColor} 1px solid`,
      userSelect: "none",
    });
  }

  handleTierClick(
    vm: TextGridPlugin,
    tierID: string,
    event: MouseEvent,
    index: number,
  ) {
    event.preventDefault();
    if (vm.wavesurfer) {
      const item = vm.tiers[tierID].intervals[index];
      const offsetX = event.offsetX || 0;
      const width = vm.wavesurfer.getWrapper().offsetWidth || 0;
      const relativeX = offsetX / width || 0;
      vm.emit("tier-click", { tierID, relativeX, item });
      if (this.options.drag) {
        /** クリックした TIER 以外はアクティブ状態を戻す */
        Object.keys(this.tiers).forEach((key) => {
          if (key !== tierID) this.tiers[key].clearActiveItem();
        })
      }
    }
  }

  redraw() {
    if (this.textGrid) {
      Object.entries(this.textGrid).forEach(([pk, x]) => {
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
    const { options, wrapper } = this;
    const height = options.height || HEIGHT;
    const uiOption = {
      ...options,
      height,
    } as TierUiOptions;
    if (wrapper) {
      const duration = this.wavesurfer?.getDuration();
      const canvasSize = Object.keys(this.tiers).length;
      const top = height * canvasSize;
      this.tiers[id] = new BaseTier(wrapper, {
        ...uiOption,
        id,
        name,
        type,
        top,
        items,
        duration,
      });
      this.tiers[id].on("click", (e, index) => this.handleTierClick(this, id, e, index));
      this.utils.style(wrapper, { height: (canvasSize + 1) * height + "px" });
    }
  }
}

export default TextGridPlugin;
