import BasePlugin, { type BasePluginEvents } from 'wavesurfer.js/dist/base-plugin.js'


export interface Item {
  time: number;
  text: string;
}
export type TierType = "interval" | "point";
export interface Tier {
  name: string;
  type: TierType;
  items: Item[];
}
export type TextGrid = Record<string, Tier>


export type TextGridPluginOptions = {
  /** Selector of element or element in which to render */
  container?: string | HTMLElement;
  tg?: TextGrid;
}
export type TextGridPluginEvents = BasePluginEvents & {
  ready: []
  click: [relativeX: number]
}


class TextGridPlugin extends BasePlugin<TextGridPluginEvents, TextGridPluginOptions> {
  container?: HTMLElement;
  wrapper?: HTMLDivElement;
  canvas: Record<string, HTMLCanvasElement> = {};
  tg: TextGrid | null = null;
  utils = { style: (el: HTMLElement, styles: Record<string, string>) => Object.assign(el.style, styles) }

  static create(options?: TextGridPluginOptions) {
    return new TextGridPlugin(options || {})
  }


  constructor(options: TextGridPluginOptions) {
    super(options)
    if (typeof options.container === 'string') {
      const newContainer = document.querySelector(options.container);
      if (newContainer) this.container = newContainer as HTMLElement;
    } else {
      this.container = options.container;
    }
    this.createWrapper()
    if (options.tg) this.tg = options.tg;
    if (this.tg) {
      Object.keys(this.tg).forEach((name) => {this.createCanvas(name)})
    }
  }

  createWrapper() {
    this.wrapper = document.createElement('div')
    this.utils.style(this.wrapper, {
      display: 'block',
      position: 'relative',
      userSelect: 'none',
    })
  }

  createCanvas(name: string) {
    const canvas = document.createElement('canvas');
    if (this.wrapper) {
      this.wrapper.appendChild(canvas);
      this.utils.style(canvas, {
        id: `tier-{name}`,
        class: "tier",
        position: 'absolute',
        left: "0px",
        top: "0px",
        width: '100%',
        height: '100%',
        zIndex: "4",
      });
      this.canvas[name] = canvas;
    }
  }
}

export default TextGridPlugin
