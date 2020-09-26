<template>
  <s-click-list :items="items" type="view" @click="$emit('click', $event)" />
</template>
<script>
import SClickList from "./SClickList";
export default {
  name: "s-view-list",
  components: { SClickList },
  computed: {
    items: () => {
      return [
        {
          text: "Zoom in",
          val: "ZOOM:IN"
        },
        {
          text: "Zoom out",
          val: "ZOOM:OUT"
        },
        {
          text: "Zoom to Selection",
          val: "ZOOM:SELECTED"
        }
      ];
    }
  }
};
</script>

<style scoped></style>
