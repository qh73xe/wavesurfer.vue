<template>
  <v-container class="grey lighten-2 fill-height" fluid>
    <v-row>
      <v-col>
        <w-jumbotron :heading="heading" :desc="desc" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import WJumbotron from "@/components/Base/WJumbotron.vue";
export default {
  name: "WDocumentationLayout.vue",
  components: {
    WJumbotron
  },
  props: {
    heading: {
      type: String
    },
    desc: {
      type: String
    }
  }
};
</script>

<style scoped></style>
