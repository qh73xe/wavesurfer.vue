<template>
  <v-app>
    <w-navigation-drawer />
    <w-app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import WAppBar from "./components/Base/WAppBar.vue";
import WNavigationDrawer from "./components/Base/WNavigationDrawer.vue";

export default {
  name: "App",
  components: {
    WNavigationDrawer,
    WAppBar,
  },
  data: () => ({}),
};
</script>
