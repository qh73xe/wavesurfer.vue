<template>
  <section class="text-center">
    <h1 class="font-weight-light headline" v-text="`${heading}`" />
    <span v-if="desc" class="font-weight-light subtitle-1" v-html="desc" />
  </section>
</template>
<script>
export default {
  name: "WJumbotron.vue",
  props: {
    heading: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped></style>
