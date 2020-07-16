<template>
  <v-container class="grey lighten-2 fill-height" fluid>
    <v-row>
      <v-col>
        <w-jumbotron heading="wavesurfer.vue/example/home" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list>
            <v-list-group
              v-for="(links, key) in routes"
              :key="key"
              :prepend-icon="links.icon"
              :value="true"
            >
              <template v-slot:activator>
                <v-list-item-title>
                  {{ key.toUpperCase() }}
                </v-list-item-title>
              </template>
              <v-list-item v-for="link in links.items" :key="link.name" link>
                <v-list-item-icon>
                  <v-icon>
                    {{ link.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="link.text" />
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import WJumbotron from "@/components/Base/WJumbotron.vue";
export default {
  name: "Home",
  components: {
    WJumbotron
  },
  computed: {
    routes: function() {
      const items = {
        main: {
          icon: "mdi-apps",
          items: []
        },
        documents: {
          icon: "mdi-file-document",
          items: []
        },
        examples: {
          icon: "mdi-xml",
          items: []
        }
      };
      for (const item of this.$router.options.routes) {
        if (item.name.match(/docs-/)) {
          items.documents.items.push(item);
        } else if (item.name.match(/example-/)) {
          items.examples.items.push(item);
        } else {
          items.main.items.push(item);
        }
      }
      return items;
    }
  }
};
</script>
