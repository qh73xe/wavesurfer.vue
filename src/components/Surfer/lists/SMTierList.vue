<template>
  <s-click-list :items="items" type="tier" @click="$emit('click', $event)" />
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
          text: "Add tier ...",
          val: "ADD",
        },
        {
          text: "Duplicate tier ...",
          val: "Duplicate",
        },
        {
          text: "Edit tier ...",
          val: "Edit",
        },
        {
          text: "Remove tier ...",
          val: "Remove",
        },
        {
          text: "Remove all text from tier",
          val: "Remove:text",
        },
      ];
    },
  },
};
</script>

<style scoped></style>
