<template>
  <v-list dense>
    <v-list-item v-for="(item, i) in items" :key="i" @click="onClick(item)">
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "s-view-list",
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick(item) {
      const payload = {
        type: this.type,
        click: item.val
      };
      this.$emit("click", payload);
    }
  }
};
</script>

<style scoped></style>
