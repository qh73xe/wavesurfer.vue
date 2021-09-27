<template>
  <v-container class="grey lighten-2 fill-height" fluid>
    <v-row>
      <v-col>
        <w-jumbotron heading="wavesurfer.vue/home" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <span
          class="font-weight-light subtitle-1 my-0"
          v-html="$vuetify.lang.t('$vuetify.home.desc')"
        />
      </v-col>
    </v-row>

    <h3>Quick start</h3>
    <v-row>
      <v-col>
        <span
          class="font-weight-light subtitle-1 my-0"
          v-html="$vuetify.lang.t('$vuetify.home.quickStart.install')"
        />
        <w-code-heighlight>
          $ yarn add https://github.com/qh73xe/wavesurfer.vue.git
        </w-code-heighlight>
        <span
          class="font-weight-light subtitle-1 my-0"
          v-html="$vuetify.lang.t('$vuetify.home.quickStart.example')"
        />
        <w-code-heighlight>
          {{ code_string }}
        </w-code-heighlight>
        <span
          class="font-weight-light subtitle-1 my-0"
          v-html="$vuetify.lang.t('$vuetify.home.quickStart.result')"
        />
        <v-card>
          <wave-surfer :source="source" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span
          class="font-weight-light subtitle-1 my-0"
          v-html="$vuetify.lang.t('$vuetify.home.quickStart.next')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert type="info">
          <span
            class="font-weight-light subtitle-1 my-0"
            v-html="$vuetify.lang.t('$vuetify.home.quickStart.warning')"
          />
        </v-alert>
      </v-col>
    </v-row>

    <h3>Contents</h3>
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
              <v-list-item
                v-for="link in links.items"
                :key="link.name"
                @click="$router.push({ path: link.path })"
              >
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
import WCodeHeighlight from "@/components/Base/WCodeHeighlight.vue";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
export default {
  name: "Home",
  components: {
    WJumbotron,
    WaveSurfer,
    WCodeHeighlight,
  },
  data: () => ({
    source:
      "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav",
    /* eslint-disable no-useless-escape */
    code: `
    <template>
      <wave-surfer :source="source" />
    </template>

    <script>
    import WaveSurfer from "wavesurfer.vue";
    export default {
      components: {
        WaveSurfer
      },
      data: () => ({
        source: "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav"
      }),
    };
    <\/script>
    `,
    /* eslint-enable */
  }),
  computed: {
    routes: function () {
      const items = {
        main: {
          icon: "mdi-apps",
          items: [],
        },
        documents: {
          icon: "mdi-file-document",
          items: [],
        },
        examples: {
          icon: "mdi-xml",
          items: [],
        },
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
    },
    code_string: function () {
      const codes = [];
      for (const x of this.code.split("\n")) {
        codes.push(x);
      }
      return `${codes.join("\n")}`;
    },
  },
};
</script>
