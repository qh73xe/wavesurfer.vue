const dumpPointTier = function(values) {
  const lines = [];
  for (const i in values) {
    lines.push(`        points [${Number(i) + 1}]:`);
    lines.push(`            number = ${values[i].time} `);
    lines.push(`            mark = "${values[i].text}" `);
  }
  return lines;
};
const dumpIntervalTier = function(values, duration) {
  const lines = [];
  for (const i in values) {
    lines.push(`        intervals [${Number(i) + 1}]:`);
    if (i == 0) {
      lines.push("            xmin = 0 ");
    } else {
      lines.push(`            xmin = ${values[Number(i) - 1].time} `);
    }
    if (i == values.length - 1) {
      lines.push(`            xmax = ${duration} `);
    } else {
      lines.push(`            xmax = ${values[i].time} `);
    }
    lines.push(`            text = "${values[i].text}" `);
  }
  return lines;
};

const getItemIndex = function(lines) {
  const indexes = [];
  let itemSize = 0;
  for (const i in lines) {
    if (lines[i].match(/^\s{4}item.+/)) {
      indexes.push({ start: Number(i) + 1, end: null });
      if (itemSize > 0) {
        indexes[itemSize - 1].end = Number(i);
      }
      itemSize++;
    }
  }
  indexes[itemSize - 1].end = lines.length;
  return indexes;
};

const parsePointTier = function(lines) {
  const name = lines[1]
    .split("=")[1]
    .trim()
    .slice(1)
    .slice(0, -1);
  const values = [];
  for (const i in lines) {
    if (~lines[i].indexOf("number")) {
      const number = parseFloat(lines[i].split("=")[1].trim());
      const mark = lines[Number(i) + 1]
        .split("=")[1]
        .trim()
        .slice(1)
        .slice(0, -1);
      values.push({ time: number, text: mark });
    }
  }
  return { name: name, values: values, type: "point" };
};

const parseIntervalTier = function(lines) {
  const name = lines[1]
    .split("=")[1]
    .trim()
    .slice(1)
    .slice(0, -1);
  const values = [];
  for (const i in lines) {
    if (~lines[i].indexOf("text")) {
      const text = lines[Number(i)]
        .split("=")[1]
        .trim()
        .slice(1)
        .slice(0, -1);
      const xmax = parseFloat(lines[Number(i) - 1].split("=")[1].trim());
      values.push({ time: xmax, text: text });
    }
  }
  return { name: name, values: values, type: "interval" };
};

export default {
  load: function(text) {
    const lines = text.split("\n");
    const itemLines = getItemIndex(lines).map(range => {
      return lines.slice(range.start, range.end);
    });
    const items = itemLines.map(lines => {
      if (~lines[0].indexOf("TextTier")) {
        return parsePointTier(lines);
      } else if (~lines[0].indexOf("IntervalTier")) {
        return parseIntervalTier(lines);
      }
    });
    let result = {};
    for (const item of items) {
      result[item.name] = {
        type: item.type,
        values: item.values
      };
    }
    return result;
  },
  dump: function(duration, tiers) {
    let lines = [
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
        lines.push('        class = "IntervalTier"');
      } else {
        lines.push('        class = "TextTier"');
      }
      lines.push(`        name = "${key}" `);
      lines.push(`        xmin = 0 `);
      lines.push(`        xmax = ${duration} `);
      if (tiers[key].type == "point") {
        lines.push(`        points: size = ${tiers[key].values.length} `);
        lines = lines.concat(dumpPointTier(tiers[key].values));
      } else if (tiers[key].type == "interval") {
        const values = tiers[key].values;
        if (values[values.length - 1].time < duration) {
          values.push({ text: "", time: duration });
        }
        lines.push(`        intervals: size = ${values.length} `);
        lines = lines.concat(dumpIntervalTier(values, duration));
      }
      i++;
    }
    return lines.join("\n");
  }
};
