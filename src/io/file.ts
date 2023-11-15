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


export default {
  toBase64,
  toBuff,
  toFile,
  toBlob,
  text2PlainTextBlob,
  text2url,
  downloadURL
}
