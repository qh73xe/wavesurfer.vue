const DEBUG = false;
export function perf(key, func) {
  const start = performance.now();
  const res = func();
  const sec = (performance.now() - start) / 1000;
  if (DEBUG) {
    console.log(key, `run: ${sec.toFixed(3)} sec`);
  }
  return res;
}

export function log(name, isShow = false) {
  return function decorator(t, n, descriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function(...args) {
        try {
          const start = performance.now();
          const result = original.apply(this, args);
          const sec = (performance.now() - start) / 1000;
          if (isShow) {
            console.log(name, `run: ${sec.toFixed(3)} sec`);
          }
          return result;
        } catch (e) {
          if (DEBUG) {
            console.log(`Error from ${name}: ${e}`);
          }
          throw e;
        }
      };
    }
    return descriptor;
  };
}

export function logger() {
  if (DEBUG) {
    console.log(...arguments);
  }
}
