import BasePlugin, { type BasePluginEvents } from "wavesurfer.js/dist/base-plugin.js";
import BaseTier, { Tier, TierItem, TierType, TierUiOptions, HEIGHT, BORDERCOLOR } from "./tier";

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
  data?: TextGrid;
}

export interface ItemEventProps {
  vm: TextGridPlugin;
  tierID: string;
  index: number;
}

export interface ItemMouseEventProps extends ItemEventProps {
  event: MouseEvent;
}

export interface TierEvent {
  tierID: string;
  item: TierItem;
}

export interface TierUpdateEvent extends TierEvent{
  index: number;
}

export interface TierMouseEvent extends TierEvent{
  relativeX: number;
}

export type TextGridPluginEvents = BasePluginEvents & {
  ready: [];
  "tier-remove": [tierID: string];
  "tier-update": [event: TierUpdateEvent];
  "tier-update-end": [event: TierUpdateEvent];
  "tier-click": [event: TierMouseEvent];
  "tier-dblclick": [event: TierMouseEvent];
  "tier-mouseenter": [event: MouseEvent, index: number];
  "tier-mouseleave": [event: MouseEvent, index: number];
};

class TextGridPlugin extends BasePlugin<
  TextGridPluginEvents,
  TextGridPluginOptions
> {
  container?: HTMLElement;
  wrapper?: HTMLDivElement;
  options: TextGridPluginOptions;
  tiers: Record<string, Tier> = {};
  data: TextGrid | null = null;
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
    if (options.data) this.data = options.data;
  }

  onInit() {
    if (!this.wavesurfer) {
      throw Error("WaveSurfer is not initialized");
    }
    // 表示領域の作成及び WS 表示領域への追加
    this.container = this.container || this.wavesurfer.getWrapper();
    this.wrapper = this.createWrapper();
    this.container.appendChild(this.wrapper);

    // WS イベントの監視
    this.subscriptions.push(
      this.wavesurfer.once("ready", () => this.redraw()),
      this.wavesurfer.on("zoom", () => this.redraw()),
      this.wavesurfer.on("destroy", () => this.destroy()),
    );
    this.emit("ready");
  }

  public setData(data: TextGrid) {
    if (data) this.data = data;
    this.redraw();
  }

  destroy() {
    Object.values(this.tiers).forEach((x) => {
      x.destroy();
    });
    if (this.wrapper) {
      this.wrapper.remove();
    }
    this.unAll();
    super.destroy();
  }

  private createWrapper(): HTMLDivElement {
    const borderColor = this.options.borderColor || BORDERCOLOR;
    const wrapper = document.createElement("div");
    this.utils.style(wrapper, {
      display: "block",
      position: "relative",
      borderBottom: `${borderColor} 1px solid`,
      userSelect: "none",
    });
    return wrapper;
  }

  private redraw() {
    if (this.data) {
      if (this.tiers) {
        Object.values(this.tiers).forEach((x) => {
          x.destroy();
        });
        this.tiers = {};
      }
      Object.entries(this.data).forEach(([pk, x]) => {
        this.createCanvas(pk, x.name, x.type, x.items);
      });
    }
  }

  private getTierEvent(tierID: string, index: number) {
    const item = this.tiers[tierID].intervals[index];
    return {tierID, item}
  }

  private getTierMouseEvent( tierID: string, event: MouseEvent, index: number) {
    if (this.wavesurfer) {
      const offsetX = event.offsetX || 0;
      const width = this.wavesurfer.getWrapper().offsetWidth || 0;
      const relativeX = offsetX / width || 0;
      const tierEvent = this.getTierEvent(tierID, index)
      return {...tierEvent, relativeX}
    }
    return null
  }

  private onItemClick(args: ItemMouseEventProps) {
    const { vm, tierID, event, index } = args;
    if (vm.wavesurfer) {
      const tierEvent = vm.getTierMouseEvent(tierID, event, index);
      if (tierEvent) vm.emit("tier-click", tierEvent);
      if (this.options.drag) {
        /** クリックした TIER 以外はアクティブ状態を戻す */
        Object.keys(this.tiers).forEach((key) => {
          if (key !== tierID) this.tiers[key].clearActiveItem();
        })
      }
    }
  }

  private onItemDblClick(args: ItemMouseEventProps) {
    const { vm, tierID, event, index } = args;
    if (vm.wavesurfer) {
      const tierEvent = vm.getTierMouseEvent(tierID, event, index);
      if (tierEvent) vm.emit("tier-dblclick", tierEvent);
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
      this.tiers[id].on("remove", () => this.emit("tier-remove", id));
      this.tiers[id].on("click", (e, index) => this.onItemClick(
        {vm: this, tierID: id, event: e, index}
      ));
      this.tiers[id].on("dblclick", (e, index) => this.onItemDblClick(
        {vm: this, tierID: id, event: e, index}
      ));
      this.tiers[id].on(
        "update",
        (index, item) => this.emit("tier-update", {tierID: id, index, item})
      );
      this.tiers[id].on(
        "update-end", 
        (index, item) => this.emit("tier-update-end", {tierID: id, index, item})
      );
      this.tiers[id].on("over", (e, index) => this.emit("tier-mouseenter", e, index));
      this.tiers[id].on("leave", (e, index) => this.emit("tier-mouseleave", e, index));
      this.utils.style(wrapper, { height: (canvasSize + 1) * height + "px" });
    }
  }
}

export default TextGridPlugin;
