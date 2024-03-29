import EventEmitter from "wavesurfer.js/dist/event-emitter.js";

export interface TierItem {
  time: number;
  text: string;
}
export interface IntervalItem extends TierItem {
  startTime: number;
  endTime: number;
}

export type TierEvents = {
  /** Before the region is removed */
  remove: [];
  /** When the region's parameters are being updated */
  update: [index: number, item: TierItem];
  /** When dragging or resizing is finished */
  "update-end": [index: number, item: TierItem];
  /** On mouse click */
  click: [event: MouseEvent, index: number];
  /** Double click */
  dblclick: [event: MouseEvent, index: number];
  /** Mouse over */
  over: [event: MouseEvent, index: number];
  /** Mouse leave */
  leave: [event: MouseEvent, index: number];
};


export type TierType = "interval" | "point";
export type TierUiOptions = {
  /** Tier 名を表示するか否か */
  showLabel?: boolean;
  /** Allow/dissallow dragging the region */
  drag?: boolean;
  /** Allow/dissallow resizing the region */
  resize?: boolean;
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
};
export interface TierParams extends TierUiOptions {
  /** The id of the region, any string */
  id: string;
  /** The name of the region, any string */
  name: string;
  /** Tier の種類 */
  type: TierType;
  /** アノテーション結果 */
  items: TierItem[];
  /** 音声の持続時間 */
  duration?: number | null;
  /** Top of the tier view in CSS pixels */
  top?: number;
}
type StyleOptions = Record<string, string>;

export const HEIGHT = 64;
export const BORDERCOLOR = "black";
class BaseTier extends EventEmitter<TierEvents> {
  public wrapper: HTMLDivElement;
  public element?: HTMLDivElement;
  public id: string;
  public name: string;
  public type: TierType;
  public showLabel: boolean;
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
  private moveing: boolean = false;

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
    this.showLabel = params.showLabel === false ? false : true;
    this.drag = params.drag === false ? false : true;
    this.resize = params.resize === false ? false : true;
    this.height = params.height || HEIGHT;
    this.top = params.top || 0;
    this.borderColor = params.borderColor || BORDERCOLOR;
    this.tierBorderColor = params.tierBorderColor || "#1A237E";
    this.tierBorderWidth = params.tierBorderWidth || 4;
    this.tierActiveColor = params.tierActiveColor || "#E65100";
    this.tierActiveBackgroundColor = params.tierActiveBackgroundColor ||
      "#FFEB3B";
    this.duration = params.duration || null;
    if (params.items) this.cleanItems(params.items);
    this.renderElement();
    this.renderTier();
  }

  /** items を時間毎にオーダリングし IntervalItem を設定 */
  private cleanItems(items: TierItem[]) {
    /** item を時間毎に並び替える */
    this.items = items;
    this.items.sort((a, b) => a.time - b.time);

    /** item.time を開始時間とし, 次の時間もしくは duration を endTime とする */
    this.intervals = this.items.map((x, i) => {
      const next = this.items[i + 1];
      return {
        ...x,
        startTime: x.time,
        endTime: next ? next.time : this.duration || 0,
      };
    });
    /** 最初が 0 でない場合に挿入する */
    if (this.intervals.length === 0) {
      this.intervals.unshift({
        time: 0,
        startTime: 0,
        endTime: this.duration || 0,
        text: "",
      });
    } else if (this.intervals[0].startTime !== 0) {
      this.intervals.unshift({
        time: 0,
        startTime: 0,
        endTime: this.intervals[0].startTime,
        text: "",
      });
    }
  }

  /** 層を表現する Div 要素を生成 */
  private renderElement() {
    const canvas = document.createElement("div");
    if (this.wrapper) {
      canvas.setAttribute("id", `tier-${this.id}`);
      this.utils.style(canvas, {
        zIndex: "5",
        position: "reletive",
        display: "flex",
        "flex-direction": "row",
        left: "0px",
        top: `${this.top}px`,
        width: "100%",
        "border-top": this.top === 0 ? `${this.borderColor} 1px solid` : "none",
        "border-bottom": `${this.borderColor} 1px solid`,
      });
      this.wrapper.appendChild(canvas);
    }
    this.initCanvasMouseEvents(canvas);
    this.element = canvas;
  }

  /** 転記情報を表現する Div 要素を生成 */
  private renderTier() {
    if (this.showLabel) {
      this.renderLabel();
    }
    if (this.type === "interval") {
      this.renderIntervals();
    } else {
      this.renderPoints();
    }
  }

  private clearTier() {
    if (this.element) {
      Array.from(this.element.children).forEach((el) => {
        this.element?.removeChild(el);
      });
    }
  }

  /** ラベル名を表現する Div 要素を生成 */
  private renderLabel() {
    if (this.element) {
      const itemEl = document.createElement("div");
      this.utils.style(itemEl, {
        left: "0px",
        height: `${this.height}px`,
        position: "absolute",
        overflow: "hidden",
        display: "flex",
        "align-items": "center",
        backgroundColor: this.tierBorderColor,
        color: "white",
        zIndex: "15",
      });
      const textEl = document.createElement("div");
      this.utils.style(textEl, { "writing-mode": "vertical-lr" });
      textEl.appendChild(document.createTextNode(this.name));
      itemEl.appendChild(textEl);
      itemEl.setAttribute("id", `tier-label-${this.id}`);
      this.element.appendChild(itemEl);
    }
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
        leftHandle.addEventListener("mousedown", (e: MouseEvent) => {
          this.handleMouseDown(e, i - 1)
        });
        frameEl.appendChild(leftHandle);
      }
      const textEl = this.createTextEl(x.text);
      textEl.setAttribute("data-resize", "main");
      frameEl.appendChild(textEl);

      const rightHandle = this.createHandle({ width: `${borderWidth}px` });
      rightHandle.setAttribute("data-resize", "right");
      // 最終要素以外は編集用のイベントを設定
      if (i + 1 !== this.intervals.length) {
        rightHandle.addEventListener("mousedown", (e: MouseEvent) => {
          this.handleMouseDown(e, i)
        });
      }
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
        topHandle.setAttribute("id", `tier-${this.id}-top-handle-${i}`);
        topHandle.addEventListener("mousedown", (e: MouseEvent) => {
          this.handleMouseDown(e, i - 1)
        });
        frameEl.appendChild(topHandle);

        const textEl = this.createTextEl(x.text, { "justify-content": "flex-start" });
        textEl.setAttribute("data-resize", "main");
        textEl.addEventListener("mousedown", (e: MouseEvent) => {
          this.handleMouseDown(e, i - 1)
        });
        frameEl.appendChild(textEl);

        const bottomHandle = this.createHandle({ height: "30%" });
        bottomHandle.setAttribute("data-resize", "bottom");
        bottomHandle.setAttribute("id", `tier-${this.id}-bottom-handle-${i}`);
        bottomHandle.addEventListener("mousedown", (e: MouseEvent) => {
          this.handleMouseDown(e, i - 1)
        });
        frameEl.appendChild(bottomHandle);
      }
      if (this.element) this.element.appendChild(frameEl);
    });
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
      zIndex: "10",
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

  destroy() {
    if (this.element) {
      this.emit("remove")
      this.element.remove();
    }
    this.unAll();
  }

  private renderActiveItem(div: HTMLDivElement, index: number) {
    div.style.color = this.tierActiveColor;
    if (this.type === "interval") {
      div.style.backgroundColor = this.tierActiveBackgroundColor;
      div.style.zIndex = "10";
    } else {
      Array.from(div.children).forEach((el) => {
        if (!(el instanceof HTMLDivElement)) return;
        if (el.id.includes(`handle-${index}`)) {
          el.style.backgroundColor = this.tierActiveColor;
        }
      });
    }
  }
  private renderDisableItem(div: HTMLDivElement) {
    div.style.color = "black";
    if (this.type === "interval") {
      div.style.backgroundColor = "transparent";
    } else {
      Array.from(div.children).forEach((el) => {
        if (!(el instanceof HTMLDivElement)) return;
        if (el.id.includes("handle")) {
          el.style.backgroundColor = this.tierBorderColor;
        }
      });
    }
  }
  setMoving(moveing: boolean) {
    if (this.element) {
      this.moveing = moveing;
      if (moveing) {
        this.utils.style(this.element, { "cursor": "ew-resize" })
      } else {
        this.utils.style(this.element, { "cursor": "default" })
        if (this.activeItem) {
          const index = this.items.findIndex((x) =>
            x.time === this.activeItem?.endTime
          );
          if (index !== -1) {
            const item = this.items[index];
            this.emit("update-end", index, item);
          }
        }
      }
    }

  }
  setActiveItem(index: number) {
    this.activeItem = this.intervals[index];
    if (this.element) {
      const pk = `tier-${this.id}-${index}`;
      const children = this.element.childNodes;
      children.forEach((x) => {
        if (x instanceof HTMLDivElement) {
          if (x.id !== `tier-label-${this.id}`) {
            if (x.getAttribute("id") === pk) {
              this.renderActiveItem(x, index);
            } else {
              this.renderDisableItem(x);
            }
          }
        }
      });
    }
  }

  clearActiveItem() {
    this.activeItem = undefined;
    if (this.element) {
      const children = this.element.childNodes;
      children.forEach((x) => {
        if (x instanceof HTMLDivElement) {
          if (x.id !== `tier-label-${this.id}`) {
            this.renderDisableItem(x);
          }
        }
      });
    }
  }

  // Interval の更新及び再レンダリング
  private updateTier(index: number, newTime: number) {
    const newItems = this.items.map((
      x,
      i,
    ) => (i === index ? { ...x, time: newTime } : x));
    this.cleanItems(newItems);
    this.items = newItems;
    this.clearTier();
    this.renderTier();
    this.emit("update", index, newItems[index]);
  }

  /** Tier クリック時のイベントハンドラ */
  private handleClick(e: MouseEvent, index: number) {
    if (this.drag) {
      this.setActiveItem(index);
      if (this.moveing) this.setMoving(false);
    }
    e.stopPropagation();
    this.emit("click", e, index);
  }

  /** 境界時刻のマウス操作変更 */
  private handleMouseMove(e: MouseEvent) {
    // レンダー済みの場合のみドラッグ処理を実行
    if (this.element && this.duration) {
      const offsetX = e.clientX - this.element.getBoundingClientRect().left
      // アクティブなインターバルが存在しドラッグ中である場合のみ処理を実行
      if (this.moveing && this.activeItem) {
        const currentIdx = this.items.findIndex((x) =>
          x.time === this.activeItem?.endTime
        );
        if (e.clientX >= 0 && currentIdx >= -1) {
          // 移動先の時刻を計算
          const reletiveX = offsetX / this.element.clientWidth;
          const newTime = reletiveX * this.duration;
          const minTime = currentIdx === 0 ? 0 : this.items[currentIdx - 1].time;
          const maxTime = currentIdx + 1 === this.items.length ? this.duration : this.items[currentIdx + 1].time;
          if (newTime > minTime && newTime < maxTime) {
            this.updateTier(currentIdx, newTime);
            // アクティブなアイテムを再設定
            const activeIdx = this.intervals.findIndex((x) =>
              x.endTime === newTime
            );
            this.setActiveItem(activeIdx);
          }
        }
      }
      e.stopPropagation();
    }
  }
  /** ハンドルのマウス操作開始 */
  private handleMouseDown(e: MouseEvent, index: number) {
    if (this.drag) {
      this.setActiveItem(index);
      this.setMoving(true);
      if (this.element) {
        this.utils.style(this.element, { "cursor": "ew-resize" })
      }
    }
    e.stopPropagation();
  }
  /** ハンドルのマウス操作停止 */
  private handleMouseUp(e: MouseEvent) {
    if (this.drag) {
      this.setMoving(false);
    }
    e.stopPropagation();
  }


  private initMouseEvents(element: HTMLDivElement, index: number) {
    element.addEventListener("click", (e: MouseEvent) => {
      this.handleClick(e, index);
    });
    element.addEventListener("dblclick", (e) => this.emit("dblclick", e, index));
    element.addEventListener("mouseenter", (e) => this.emit("over", e, index));
    element.addEventListener("mouseleave", (e) => this.emit("leave", e, index));
  }

  private initCanvasMouseEvents(element: HTMLDivElement) {
    element.addEventListener("mousemove", (e: MouseEvent) => {
      this.handleMouseMove(e);
    });
    element.addEventListener("mouseup", (e: MouseEvent) => {
      this.handleMouseUp(e);
    });
  }
}

export default BaseTier;
export type Tier = InstanceType<typeof BaseTier>;
