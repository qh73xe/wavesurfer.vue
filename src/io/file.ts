import ffmpeg from "ffmpeg.js";

/** arrayBuffer を文字列に変換します */
export const ab2String = (arrayBuffer: ArrayBuffer): string => {
  let binaryString = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return binaryString
}

/** File を base64 形式の文字列に変換します */
export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else if (reader.result instanceof ArrayBuffer) {
        resolve(ab2String(reader.result));
      } else {
        reject("unknown type");
      }
    }
    reader.onerror = error => reject(error);
  });

/** base64 形式の文字列から MineType を抽出します */
export const toMineType = (dataUrl: string): string => {
  const mimeString = dataUrl
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  return mimeString;
}

/** base64 形式の文字列を arrayBuffer に変換します */
export const toBuff = (dataUrl: string): ArrayBuffer => {
  const byteString = atob(dataUrl.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return ab;
};

/** base64 形式の文字列を Blob に変換します */
export const toBlob = (dataUrl: string): Blob => {
  const type = toMineType(dataUrl)
  const ab = toBuff(dataUrl);
  return new Blob([ab], { type });
};

/** base64 形式の文字列を File に変換します */
export const toFile = (dataUrl: string, filename: string): File => {
  const type = toMineType(dataUrl)
  const ab = toBuff(dataUrl);
  return new File([ab], filename, {type});
}

/** 文字列をプレーンテキストに変換します */
export const text2PlainTextBlob = (text: string): Blob => {
    return new Blob([text], { type: 'text/plain' });
}

/** 文字列からダウンロード可能な URL を生成します */
export const text2url = (text: string): string => {
  const blob = text2PlainTextBlob(text);
  return URL.createObjectURL(blob);
}

/** URL で指定されたファイルをダウンロードします */
export const downloadURL = (url: string, filename: string): void => {
  if (url && filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}

export interface VideoObject {
  duration: number | null;
  videoStream: {
    codec_name: string;
    pix_fmt: string;
    bitrate: number | null;
    fps: number | null;
    tbr: number | null;
    tbn: number | null;
    tbc: number | null;
  },
  audioStream: {
    codec_name: string;
    sample_rate: number | null;
    channel_layout: string;
    sample_fmt: number | null;
    bitrate: number | null;
  },
  originSize: {
    width: number | null;
    height: number | null;
  },
}

export const initVideoObject = ():VideoObject => {
  return {
    duration: null,
    videoStream: {
      codec_name: "",
      pix_fmt: "",
      bitrate: null,
      fps: null,
      tbr: null,
      tbn: null,
      tbc: null
    },
    audioStream: {
      codec_name: "",
      sample_rate: null,
      channel_layout: "",
      sample_fmt: null,
      bitrate: null
    },
    originSize: {
      width: null,
      height: null
    },
  };
};


export const info = (buff: ArrayBuffer, name: string, callback: (item: VideoObject) => void) => {
  const data = new Uint8Array(buff);
  let stdout = "";
  const result = ffmpeg({
    MEMFS: [{ name, data }],
    arguments: ["-i", name],
    print: (msg: string) => { stdout += msg + "\n" },
    printErr: (msg: string) => { stdout += msg + "\n" },
    onExit: function() {
      let item = initVideoObject();
      if (stdout) {
        for (const line of stdout.split("\n")) {
          if (~line.indexOf("Duration")) {
            const timeInfo = line
              .split(",")[0]
              .split(": ")[1]
              .split(":")
              .map(val => {
                return Number(val);
              });
            item.duration =
              timeInfo[0] * 60 * 60 +
              timeInfo[1] * 60 +
              timeInfo[2];
          }
          if (~line.indexOf("Stream")) {
            const info = line.split(": ");
            if (info.length == 3) {
              const detail = info[2].split(", ");
              if (info[1] == "Video") {
                const sizeText = detail.filter(x =>
                  x.match(
                    /^([1-9]\d*|0)(\.\d+)?x([1-9]\d*|0)(\.\d+)?/
                  )
                )[0];
                if (sizeText) {
                  const size = sizeText.split(" ")[0].split("x");
                  item.originSize = {
                    width: Number(size[0]),
                    height: Number(size[1])
                  };
                }
                item.videoStream.codec_name = detail[0];
                item.videoStream.pix_fmt = detail[1];
                try {
                  item.videoStream.bitrate = Number(
                    detail
                      .filter(x => x.match(/kb\/s/))[0]
                      .split(" ")[0]
                  );
                } catch {
                  item.videoStream.bitrate = null;
                }
                try {
                  item.videoStream.fps = Number(
                    detail
                      .filter(x => x.match(/fps/))[0]
                      .split(" ")[0]
                  );
                } catch {
                  item.videoStream.fps = null;
                }
                try {
                  item.videoStream.tbr = Number(
                    detail
                      .filter(x => x.match(/tbr/))[0]
                      .split(" ")[0]
                  );
                } catch {
                  item.videoStream.tbr = null;
                }

                try {
                  item.videoStream.tbn = Number(
                    detail
                      .filter(x => x.match(/tbn/))[0]
                      .split(" ")[0]
                  );
                } catch {
                  item.videoStream.tbn = null;
                }
                try {
                  item.videoStream.tbc = Number(
                    detail
                      .filter(x => x.match(/tbc/))[0]
                      .split(" ")[0]
                  );
                } catch {
                  item.videoStream.tbc = null;
                }
              } else {
                item.audioStream.codec_name = detail[0];
                try {
                  item.audioStream.sample_rate = Number(
                    detail[1].split(" ")[0]
                  );
                } catch {
                  item.audioStream.sample_rate = null;
                }
                item.audioStream.channel_layout = detail[2];
                try {
                  item.audioStream.bitrate = Number(
                    detail[4].split(" ")[0]
                  );
                } catch {
                  item.audioStream.bitrate = null;
                }
              }
            }
          }
        }
        callback(item);
      }
    }
  });
  return result;
};


export default {
  toBase64,
  toBuff,
  toFile,
  toBlob,
  text2PlainTextBlob,
  text2url,
  downloadURL
}
