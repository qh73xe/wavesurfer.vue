import { describe, expect, test } from "vitest";
import { readFile } from "fs/promises"
import { dumpTextGrid } from "./textgrid";
import type { TextGrid } from "../components/plugins/textgrid/"

const MISC = `${__dirname}/../../misc`
const load = async (fileName: string): Promise<string> => {
  const content = await readFile(`${MISC}/${fileName}`, "utf8")
  return content
}

describe('io/textgrid', () => {
  test('dumpTextGrid', async() => {
    const duration = 21.773878;
    const tg: TextGrid = {
      t2: {
        name: "t2",
        type: "point",
        items: [
          {
            time: 1.5,
            text: "test1",
          },
          {
            time: 10.5,
            text: "test2",
          },
        ],
      },
      t1: {
        name: "t1",
        type: "interval",
        items: [
          {
            time: 1,
            text: "test1",
          },
          {
            time: 3,
            text: "test2",
          },
          {
            time: 5,
            text: "test3",
          },
          {
            time: 5.5,
            text: "test4",
          },
          {
            time: 10,
            text: "test5",
          },
        ],
      },
    };
    const text = await load("test.TextGrid")
    expect(dumpTextGrid(tg, duration)).toBe(text)
  })
})
