<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text.toUpperCase() }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            @click="$router.push({ name: child.name })"
          >
            <v-list-item-action>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text.toUpperCase() }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          link
          @click="$router.push({ name: item.name })"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text.toUpperCase() }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "mdi-home", text: "Home", name: "Home" },
      { icon: "mdi-help-circle", text: "About", name: "About" },
      { icon: "mdi-file-document", text: "Document", children: [] },
      { icon: "mdi-xml", text: "Example", children: [] }
    ]
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.state.app_bar.drawer;
      },
      set(val) {
        this.$store.commit("app_bar/set_drawer", val);
      }
    }
  },
  mounted: function() {
    for (const item of this.$router.options.routes) {
      if (item.name.match(/docs-/)) {
        this.items[2].children.push(item);
      } else if (item.name.match(/example-/)) {
        this.items[3].children.push(item);
      }
    }
  }
};
</script>

<style scoped></style>
