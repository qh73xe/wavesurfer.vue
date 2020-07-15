<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down" v-text="$store.state.app_name" />
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      v-model="search"
      class="hidden-sm-and-down"
    />
    <v-spacer></v-spacer>
    <v-btn icon @click="$router.push({ name: 'home' })">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon :href="$store.state.github">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.app_bar.drawer;
      },
      set(val) {
        this.$store.commit("app_bar/set_drawer", val);
      }
    },
    search: {
      get() {
        return this.$store.state.app_bar.search;
      },
      set(val) {
        this.$store.commit("app_bar/set_search", val);
      }
    }
  }
};
</script>

<style scoped></style>
