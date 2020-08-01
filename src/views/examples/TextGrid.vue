<template>
  <w-example-layout
    :heading="title"
    :desc="$vuetify.lang.t(`${locale}.headline`)"
    :template_code="template"
    :script_code="code"
  >
    <template v-slot:desc>
      <!--
      <span
        class="font-weight-light subtitle-1"
        v-html="$vuetify.lang.t(`${locale}.desc`)"
      />
      -->
    </template>
    <w-example-demo-card :title="cardTitle">
      <template v-slot:input-form>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
        <v-slider
          v-if="source"
          v-model="zoom"
          @end="onZoomEnd"
          append-icon="mdi-magnify-plus-cursor"
          prepend-icon="mdi-magnify-minus-cursor"
          step="100"
          :min="0"
          :max="500"
          label="Zoom"
        >
          <template v-slot:thumb-label="{ value }">
            &times; {{ (value / 100).toFixed(0) }}
          </template>
        </v-slider>
      </template>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        showTimeLine
        showTextGrid
        :source="source"
        :responsive="true"
      />
      <w-example-demo-card-actions :ws="$refs.wavesurfer" v-if="isReady" />
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
      </v-snackbar>
    </w-example-demo-card>
  </w-example-layout>
</template>

<script>
import WExampleLayout from "@/components/Base/WExampleLayout.vue";
import WExampleDemoCard from "@/components/Base/WExampleDemoCard.vue";
import WExampleDemoCardActions from "@/components/Base/WExampleDemoCardActions.vue";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
const name = "textgrid";
const locale = "$vuetify.example.textgrid";
export default {
  name: name,
  components: {
    WExampleLayout,
    WExampleDemoCard,
    WExampleDemoCardActions,
    WaveSurfer
  },
  data: () => ({
    locale: locale,
    title: `wavesurfer.vue>example>${name}`,
    cardTitle: `${name} demo`,
    zoom: 0,
    snackbar: {
      show: false,
      text: ""
    },
    dialog: false,
    template: ``,
    code: ``,
    source: null,
    isReady: false
  }),
  methods: {
    onFileChange: function(file) {
      this.source = null;
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.source = fr.result;
        });
      }
    },
    onZoomEnd: function(val) {
      this.$refs.wavesurfer.zoom(Number(val));
    },
    onReady: function() {
      this.isReady = true;
      this.snackbar.text = "on ready";
      this.snackbar.show = true;
    },
    onPlay: function() {
      this.snackbar.text = "on play";
      this.snackbar.show = true;
    },
    onPause: function() {
      this.snackbar.text = "on pause";
      this.snackbar.show = true;
    },
    onDestroy: function() {
      this.snackbar.text = "on destroy";
      this.snackbar.show = true;
    }
  }
};
</script>
<style scoped></style>
