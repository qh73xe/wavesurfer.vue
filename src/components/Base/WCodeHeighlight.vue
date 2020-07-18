<template>
  <code-highlight>
    <slot></slot>
  </code-highlight>
</template>
<script>
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
export default {
  name: "WCode.vue",
  props: {},
  directives: {
    escapeContent: {
      bind(el) {
        const html = el.innerHTML;
        el.textContent = html;
      }
    }
  },
  components: {
    CodeHighlight
  }
};
</script>

<style scoped>
div pre[class*="language-"] {
  width: 100%;
  display: inline-block;
}
</style>
