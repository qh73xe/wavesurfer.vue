import EventEmitter from "wavesurfer.js/dist/event-emitter.js";

export type TierEvents = {
  /** Before the region is removed */
  remove: [];
  /** When the region's parameters are being updated */
  update: [];
  /** When dragging or resizing is finished */
  "update-end": [];
  /** On play */
  play: [];
  /** On mouse click */
  click: [event: MouseEvent, index: number];
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
  id: string;
  /** The name of the region, any string */
  name: string;
  /** Tier の種類 */
  type: TierType;
  /** Allow/dissallow dragging the region */
  drag?: boolean;
  /** Allow/dissallow resizing the region */
  resize?: boolean;
  /** Top of the tier view in CSS pixels */
  top?: number;
  /** Height of the tier view in CSS pixels */
  height?: number;
  /** ボーダーカラー */
  borderColor?: string;
  /** 境界の色 */
  tierBorderColor?: string;
  /** 境界の太さ */
  tierBorderWidth?: number;
  /** アクティブ時の文字色 */
  tierActiveColor?: string;
  /** アクティブ時の背景色 */
  tierActiveBackgroundColor?: string;
  /** アノテーション結果 */
  items: TierItem[];
  /** 音声の持続時間 */
  duration?: number | null;
};
type StyleOptions = Record<string, string>;

class BaseTier extends EventEmitter<TierEvents> {
  public wrapper: HTMLDivElement;
  public element?: HTMLDivElement;
  public id: string;
  public name: string;
  public type: TierType;
  public drag: boolean;
  public resize: boolean;
  public height: number;
  public top: number;
  public borderColor: string;
  public tierBorderColor: string;
  public tierBorderWidth: number;
  public tierActiveColor: string;
  public tierActiveBackgroundColor: string;
  public duration: number | null = null;
  public items: TierItem[] = [];
  public intervals: IntervalItem[] = [];
  public activeItem?: IntervalItem;

  utils = {
    style: (el: HTMLElement, styles: Record<string, string>) =>
      Object.assign(el.style, styles),
  };

  constructor(wrapper: HTMLDivElement, params: TierParams) {
    super();
    this.wrapper = wrapper;
    this.id = params.id || `${Math.random().toString(32).slice(2)}`;
    this.name = params.name;
    this.type = params.type;
    this.drag = params.drag ?? true;
    this.resize = params.resize ?? true;
    this.height = params.height || 64;
    this.top = params.top || 0;
    this.borderColor = params.borderColor || "black";
    this.tierBorderColor = params.tierBorderColor || "#1A237E";
    this.tierBorderWidth = params.tierBorderWidth || 4;
    this.tierActiveColor = params.tierActiveColor || "#E65100";
    this.tierActiveBackgroundColor = params.tierActiveBackgroundColor ||
      "#FFEB3B";
    this.duration = params.duration || null;
    if (params.items) this.setCleanItems(params.items);
    this.renderElement();
    this.renderTier();
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

  /** 層を表現する Div 要素を生成 */
  renderElement() {
    const canvas = document.createElement("div");
    if (this.wrapper) {
      canvas.setAttribute("id", `tier-${this.id}`);
      this.utils.style(canvas, {
        position: "absolute",
        display: "flex",
        "flex-direction": "row",
        left: "0px",
        top: `${this.top}px`,
        width: "100%",
        "border-top": this.top === 0 ? `${this.borderColor} 1px solid` : "none",
        "border-bottom": `${this.borderColor} 1px solid`,
        "z-index": "4",
      });
      this.wrapper.appendChild(canvas);
    }
    this.element = canvas;
  }

  /** 転記情報を表現する Div 要素を生成 */
  renderTier() {
    if (this.type === "interval") {
      this.renderIntervals();
    } else {
      this.renderPoints();
    }
  }

  private calsWidth(time: number) {
    if (this.element && this.duration) {
      const width = this.element.offsetWidth;
      return (width * time) / this.duration;
    }
    return 0;
  }

  private createFrame(item: IntervalItem, sx?: StyleOptions): HTMLDivElement {
    const itemEl = document.createElement("div");
    const width = this.calsWidth(item.endTime - item.startTime);
    this.utils.style(itemEl, {
      display: "flex",
      width: `${width}px`,
      height: `${this.height}px`,
      ...sx,
    });
    itemEl.setAttribute("part", `tier-${this.id}`);
    return itemEl;
  }

  private createHandle(sx?: StyleOptions) {
    const handleStyle = {
      width: `${this.tierBorderWidth}px`,
      height: "100%",
      "background-color": this.tierBorderColor,
      "cursor": "ew-resize",
      ...sx,
    };
    const handleEl = document.createElement("div");
    this.utils.style(handleEl, handleStyle);
    return handleEl;
  }

  private createTextEl(text: string, sx?: StyleOptions) {
    const textEl = document.createElement("div");
    this.utils.style(textEl, {
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      "align-items": "center",
      "justify-content": "center",
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
      ...sx,
    });
    textEl.appendChild(document.createTextNode(text));
    return textEl;
  }

  private renderIntervals() {
    this.intervals.forEach((x, i) => {
      const frameEl = this.createFrame(x);
      frameEl.setAttribute("id", `tier-${this.id}-${i}`);
      this.initMouseEvents(frameEl, i);

      const borderWidth = this.tierBorderWidth / 2;
      if (x.startTime !== 0) {
        const leftHandle = this.createHandle({ width: `${borderWidth}px` });
        leftHandle.setAttribute("data-resize", "left");
        frameEl.appendChild(leftHandle);
      }
      const textEl = this.createTextEl(x.text);
      textEl.setAttribute("data-resize", "main");
      frameEl.appendChild(textEl);

      const rightHandle = this.createHandle({ width: `${borderWidth}px` });
      rightHandle.setAttribute("data-resize", "right");
      frameEl.appendChild(rightHandle);

      if (this.element) this.element.appendChild(frameEl);
    });
  }

  private renderPoints() {
    this.intervals.forEach((x, i) => {
      const frameEl = this.createFrame(x, { "flex-direction": "column" });
      frameEl.setAttribute("id", `tier-${this.id}-${i}`);
      this.initMouseEvents(frameEl, i);
      if (x.text) {
        const topHandle = this.createHandle({ height: "30%" });
        topHandle.setAttribute("data-resize", "top");
        frameEl.appendChild(topHandle);

        const textEl = this.createTextEl(x.text, { "justify-content": "flex-start" });
        textEl.setAttribute("data-resize", "main");
        frameEl.appendChild(textEl);

        const bottomHandle = this.createHandle({ height: "30%" });
        bottomHandle.setAttribute("data-resize", "bottom");
        frameEl.appendChild(bottomHandle);
      }
      if (this.element) this.element.appendChild(frameEl);
    });
  }

  destroy() {
    this.unAll();
    if (this.element) this.element.remove();
  }

  setActiveItem(index: number) {
    this.activeItem = this.intervals[index];
    if (this.element) {
      const pk = `tier-${this.id}-${index}`;
      const children = this.element.childNodes;
      children.forEach((x) => {
        if (x instanceof HTMLDivElement) {
          if (x.getAttribute("id") === pk) {
            x.style.color = this.tierActiveColor;
            if (this.type === "interval") {
              x.style.backgroundColor = this.tierActiveBackgroundColor;
            } else {
              console.log(x)
            }
          } else {
            x.style.color = "black";
            if (this.type === "interval") {
              x.style.backgroundColor = "transparent";
            }
          }
        }
      });
    }
  }

  private initMouseEvents(element: HTMLDivElement, index: number) {
    element.addEventListener("click", (e: MouseEvent) => {
      if (this.drag) this.setActiveItem(index);
      this.emit("click", e, index);
    });
    element.addEventListener("mouseenter", (e) => this.emit("over", e));
    element.addEventListener("mouseleave", (e) => this.emit("leave", e));
    element.addEventListener("dblclick", (e) => this.emit("dblclick", e));
  }
}

export default BaseTier;
export type Tier = InstanceType<typeof BaseTier>;
