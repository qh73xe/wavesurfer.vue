import EventEmitter from "wavesurfer.js/dist/event-emitter.js";

export type TierEvents = {
  /** Before the region is removed */
  remove: [];
  /** When the region's parameters are being updated */
  update: [];
  /** On play */
  play: [];
  /** On mouse click */
  click: [event: MouseEvent];
  /** Double click */
  dblclick: [event: MouseEvent];
  /** Mouse over */
  over: [event: MouseEvent];
  /** Mouse leave */
  leave: [event: MouseEvent];
};

export interface TierItem {
  time: number;
  text: string;
}
export interface IntervalItem extends TierItem {
  startTime: number;
  endTime: number;
}

export type TierType = "interval" | "point";
export type TierParams = {
  /** The id of the region, any string */
  id?: string;
  /** The name of the region, any string */
  name: string;
  /** Tier の種類 */
  type: TierType;
  /** Allow/dissallow dragging the region */
  drag?: boolean;
  /** Top of the tier view in CSS pixels */
  top?: number;
  /** Height of the tier view in CSS pixels */
  height?: number;
  /** ボーダーカラー */
  borderColor?: string;
  /** アノテーション結果 */
  items: TierItem[];
  /** 音声の持続時間 */
  duration?: number | null;
};

class BaseTier extends EventEmitter<TierEvents> {
  public wrapper: HTMLDivElement;
  public element?: HTMLDivElement;
  public id: string;
  public name: string;
  public type: TierType;
  public drag: boolean;
  public height: number;
  public top: number;
  public borderColor: string;
  public duration: number | null = null;
  public items: TierItem[] = [];
  public intervals: IntervalItem[] = [];

  utils = {
    style: (el: HTMLElement, styles: Record<string, string>) =>
      Object.assign(el.style, styles),
  };

  constructor(wrapper: HTMLDivElement, params: TierParams) {
    super();
    this.wrapper = wrapper;
    this.id = params.id || `tier-${Math.random().toString(32).slice(2)}`;
    this.name = params.name;
    this.type = params.type;
    this.drag = params.drag ?? true;
    this.height = params.height || 64;
    this.top = params.top || 0;
    this.borderColor = params.borderColor || "black";
    this.duration = params.duration || null;
    if (params.items) {
      this.setCleanItems(params.items);
    }
    this.items = params.items;
    this.createElement();
    this.renderTier();
    this.initMouseEvents();
  }

  /** items を時間毎にオーダリングし IntervalItem を設定 */
  setCleanItems(items: TierItem[]) {
    this.items = items;
    this.items.sort((a, b) => a.time - b.time);
    this.intervals = this.items.map((x, i) => {
      const next = this.items[i + 1];
      return {
        ...x,
        startTime: x.time,
        endTime: next ? next.time : this.duration || 0,
      };
    });
    if (this.intervals[0].startTime !== 0) {
      this.intervals.unshift({
        time: 0,
        startTime: 0,
        endTime: this.intervals[0].startTime,
        text: "",
      });
    }
  }

  /** 層を表現する Canvas を生成 */
  createElement() {
    const canvas = document.createElement("div");
    if (this.wrapper) {
      canvas.setAttribute("id", this.id);
      this.utils.style(canvas, {
        position: "absolute",
        display: "flex",
        "flex-direction": "row",
        left: "0px",
        top: `${this.top}px`,
        width: "100%",
        "border-bottom": `${this.borderColor} 1px solid`,
        "z-index": "4",
      });
      this.wrapper.appendChild(canvas);
    }
    this.element = canvas;
  }

  renderTier() {
    if (this.type === "interval") {
      this.renderIntervals();
    } else {
      this.renderPoints();
    }
  }

  calsWidth(time: number) {
    if (this.element && this.duration) {
      const width = this.element.offsetWidth;
      return (width * time) / this.duration;
    }
    return 0;
  }

  renderIntervals() {
    this.intervals.forEach((x) => {
      const text = document.createTextNode(x.text);
      const width = this.calsWidth(x.endTime - x.startTime);
      const itemEl = document.createElement("div");
      itemEl.setAttribute("part", "textgrid-interval");
      this.utils.style(itemEl, {
        // interval の基本設定
        width: `${width}px`,
        height: `${this.height}px`,
        "border": `${this.borderColor} 1px solid`,
        // テキストのセンタリング
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        // テキストのはみ出し防止
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
      });
      itemEl.appendChild(text);
      if (this.element) this.element.appendChild(itemEl);
    });
  }

  renderPoints() {
    this.intervals.forEach((x) => {
      const text = document.createTextNode(x.text);
      const width = this.calsWidth(x.endTime - x.startTime);
      const itemEl = document.createElement("div");
      itemEl.setAttribute("part", "textgrid-interval");
      this.utils.style(itemEl, {
        // interval の基本設定
        width: `${width}px`,
        height: `${this.height}px`,
        "border-top": `${this.borderColor} 1px solid`,
        "border-bottom": `${this.borderColor} 1px solid`,
        "border-right": `${this.borderColor} 1px solid`,
        // テキストのセンタリング
        "box-sizing": "border-box",
        padding: "3px",
        display: "flex",
        "align-items": "center",
        "justify-content": "start",
        // テキストのはみ出し防止
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
      });
      itemEl.appendChild(text);
      if (this.element) this.element.appendChild(itemEl);
    });
  }

  destroy() {
    this.unAll();
    if (this.element) this.element.remove();
  }

  private initMouseEvents() {
    const { element } = this;
    if (!element) return;
    element.addEventListener("click", (e) => this.emit("click", e));
    element.addEventListener("mouseenter", (e) => this.emit("over", e));
    element.addEventListener("mouseleave", (e) => this.emit("leave", e));
    element.addEventListener("dblclick", (e) => this.emit("dblclick", e));
  }
}

export default BaseTier;
export type Tier = InstanceType<typeof BaseTier>;
