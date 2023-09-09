<template>
  <s-click-list :items="items" type="record" @click="$emit('click', $event)" />
</template>
<script>
import SClickList from "./SClickList";
export default {
  name: "s-m-tier-list",
  components: { SClickList },
  computed: {
    items: () => {
      return [
        {
          text: "Add record ...",
          val: "ADD",
        },
        {
          text: "Edit record ...",
          val: "Edit",
        },
        {
          text: "Remove record ...",
          val: "Remove",
        },
      ];
    },
  },
};
</script>

<style scoped></style>
