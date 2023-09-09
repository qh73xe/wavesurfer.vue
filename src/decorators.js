const DEBUG = false;
export function perf(key, func) {
  const start = performance.now();
  const res = func();
  const sec = (performance.now() - start) / 1000;
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(key, `run: ${sec.toFixed(3)} sec`);
    // stop invalid values from being used
  }
  return res;
}

export function log(name, isShow = false) {
  return function decorator(t, n, descriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function (...args) {
        try {
          const start = performance.now();
          const result = original.apply(this, args);
          const sec = (performance.now() - start) / 1000;
          if (isShow) {
            // eslint-disable-next-line no-console
            console.log(name, `run: ${sec.toFixed(3)} sec`);
            // stop invalid values from being used
          }
          return result;
        } catch (e) {
          if (DEBUG) {
            // eslint-disable-next-line no-console
            console.log(`Error from ${name}: ${e}`);
            // stop invalid values from being used
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
