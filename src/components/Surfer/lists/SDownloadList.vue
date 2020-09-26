<template>
  <s-click-list :items="items" type="open" @click="$emit('click', $event)" />
</template>
<script>
import SClickList from "./SClickList";
export default {
  name: "s-download-list",
  components: { SClickList },
  computed: {
    items: () => {
      return [
        {
          text: "Save as Textgrid File ...",
          val: "TEXTGRID"
        },
        {
          text: "Save as Json File ...",
          val: "TEXTGRID"
        }
      ];
    }
  }
};
</script>

<style scoped></style>
