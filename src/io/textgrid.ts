import type { TierItem } from "../components/plugins/textgrid/tier"
import type { TextGrid } from "../components/plugins/textgrid/"


/** Point Tier を Text 化します */
export const dumpPointTier = (values: TierItem[]): string[] => {
  return values.map((value, i) => {
    const { text, time } = value;
    const idx = i + 1;
    if (time) {
      return [
        `        points [${idx}]:`,
        `            number = ${time} `,
        `            mark = "${text}" `,
      ]
    }
    return [];
  }).flat();
};


/** Interval Tier を Text 化します */
export const dumpIntervalTier = function(values: TierItem[], duration: number): string[] {
  const valuesNum = values.length - 1; 
  return values.map((value, i) => {
    const { time } = value;
    const idx = i + 1;
    const text = i === 0 ? "" : values[i - 1].text;
    const xmin = i === 0 ? 0 : values[i - 1].time;
    const xmax = i === valuesNum ? duration : value.time;
    if (time) {
      return [
        `        intervals [${idx}]:`,
        `            xmin = ${xmin} `,
        `            xmax = ${xmax} `,
        `            text = "${text}" `
      ];
    }
    return [];
  }).flat();
};

export const dumpTextGrid = (tg: TextGrid, duration: number) => {
  let lines = [
    'File type = "ooTextFile"',
    'Object class = "TextGrid"',
    "",
    "xmin = 0 ",
    `xmax = ${duration} `,
    "tiers? <exists> ",
    `size = ${Object.keys(tg).length} `,
    "item []: "
  ];
  let i = 1;
  for (const key in tg) {
    const tier = tg[key];
    const { type, items } = tier;
    lines.push(`    item [${i}]:`);
    if (type == "interval") {
      lines.push('        class = "IntervalTier" ');
    } else {
      lines.push('        class = "TextTier" ');
    }
    lines.push(`        name = "${key}" `);
    lines.push(`        xmin = 0 `);
    lines.push(`        xmax = ${duration} `);
    if (type == "point") {
      lines.push(`        points: size = ${items.length} `);
      lines = lines.concat(dumpPointTier(items));
    } else if (type == "interval") {
      if (items[items.length - 1].time < duration) {
        items.push({ text: "", time: duration });
      }
      lines.push(`        intervals: size = ${items.length} `);
      lines = lines.concat(dumpIntervalTier(items, duration));
    }
    i++;
  }
  return lines.join("\n");
};
