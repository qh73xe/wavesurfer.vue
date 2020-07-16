<template>
  <w-documentation-layout :heading="heading" :desc="$vuetify.lang.t(desc)">
    <v-list two-line v-if="search.length > 0">
      <v-list-item
        v-for="(item, key) in items.filter(x => ~x[0].indexOf(search))"
        :key="key"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ $vuetify.lang.t(`${locale}.descs.${item}`) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list two-line v-else>
      <v-list-item v-for="(item, key) in items" :key="key">
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ $vuetify.lang.t(`${locale}.descs.${item}`) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </w-documentation-layout>
</template>
<script>
import WDocumentationLayout from "@/components/Base/WDocumentationLayout.vue";
const locale = "$vuetify.document.events";
export default {
  name: "Events.vue",
  components: {
    WDocumentationLayout
  },
  data: () => ({
    heading: "wavesurfer.vue/documentation/events",
    locale: locale,
    desc: `${locale}.desc`,
    items: [
      "audioprocess",
      "dblclick",
      "destroy",
      "error",
      "finish",
      "interaction",
      "loading",
      "mute",
      "pause",
      "play",
      "ready",
      "scroll",
      "seek",
      "volume",
      "waveform-ready",
      "zoom"
    ]
  }),
  computed: {
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
