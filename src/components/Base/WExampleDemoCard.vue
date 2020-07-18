<template>
  <v-card class="mx-auto">
    <v-system-bar color="primary darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon>mdi-window-minimize</v-icon>
      <v-icon>mdi-window-maximize</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-toolbar color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <slot name="toolbar"></slot>
    </v-toolbar>
    <v-card-text>
      <slot name="input-form"></slot>
    </v-card-text>
    <slot></slot>
  </v-card>
</template>
<script>
export default {
  name: "WExampleDemoCard.vue",
  props: {
    title: {
      type: String,
      default: "wave-surfer-demo"
    }
  }
};
</script>

<style scoped></style>
