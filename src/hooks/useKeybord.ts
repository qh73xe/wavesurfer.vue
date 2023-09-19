import { ref, computed } from 'vue';

export interface KeyMap {
  key: string;
  repeat: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey?: boolean;
  callback: () => void;
}

export default function useKeybord(keymaps: KeyMap[], callback: (event: KeyboardEvent) => void) {
  const userAgent = ref(window.navigator.userAgent.toLowerCase());
  const os = computed(() => {
    if (userAgent.value.indexOf('windows nt') !== -1) {
      return 'windows';
    } else if (userAgent.value.indexOf('android') !== -1) {
      return 'android';
    } else if (userAgent.value.indexOf('iphone') !== -1 || userAgent.value.indexOf('ipad') !== -1) {
      return 'ios';
    } else if (userAgent.value.indexOf('mac os x') !== -1) {
      return 'mac';
    }
    return 'linux';
  });

  const onKeyDown = (event: KeyboardEvent) => {
    keymaps.forEach((keymap: KeyMap) => {
      const keyCheck = keymap.key === event.key;
      const altCheck = keymap.altKey === event.altKey;
      const ctrlCheck = keymap.ctrlKey === event.ctrlKey;
      const metaCheck = keymap.metaKey === event.metaKey;
      const shiftCheck = keymap.shiftKey ? keymap.shiftKey === event.shiftKey : true;
      if (keyCheck && altCheck && ctrlCheck && metaCheck && shiftCheck) {
        if (keymap.repeat === false && keymap.repeat === event.repeat) {
          keymap.callback();
        } else if (keymap.repeat === true) {
          keymap.callback();
        } else {
          callback(event);
        }
      } else {
        callback(event);
      }
    });
  };
  return { os, onKeyDown };
}
