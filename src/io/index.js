const dumpPointTier = function(values) {
  const lines = [];
  for (const i in values) {
    lines.push(`        points [${i + 1}]:`);
    lines.push(`            number = ${values[i].time} `);
    lines.push(`            mark = "${values[i].text}" `);
  }
  return lines;
};
const dumpIntervalTier = function(values) {
  const lines = [];
  for (const i in values) {
    lines.push(`        intervals [${i + 1}]:`);
    if (i == 0) {
      lines.push("            xmin = 0 ");
    } else {
      lines.push(`            xmin = ${values[i - 1].time} `);
    }
    lines.push(`            xmax = ${values[i].time} `);
    lines.push(`            text = "${values[i].text}" `);
  }
  return lines;
};

const textgrid = {
  load: function(text) {
    const lines = text.split("\n");
    console.log(lines);
  },
  dump: function(duration, tiers) {
    const lines = [
      'File type = "ooTextFile"',
      'Object class = "TextGrid"',
      "",
      "xmin = 0 ",
      `xmax = ${duration} `,
      "tiers? <exists> ",
      `size = ${Object.keys(tiers).length} `,
      "item []: "
    ];
    let i = 1;
    for (const key in tiers) {
      lines.push(`    item [${i}]:`);
      if (tiers[key].type == "interval") {
        lines.push('        class = "TextTier"');
      } else {
        lines.push('        class = "IntervalTier"');
      }
      lines.push(`        name = "${key}" `);
      lines.push(`        xmax = ${duration} `);
      if (tiers[key].type == "interval") {
        lines.push(`        intervals: size = ${tiers[key].values.length} `);
        lines.concat(dumpIntervalTier(tiers[key].values));
      } else {
        lines.push(`        points: size = ${tiers[key].values.length} `);
        lines.concat(dumpPointTier(tiers[key].values));
      }

      i++;
    }
    return lines.join("\n");
  }
};

export default {
  textgrid: textgrid
};
