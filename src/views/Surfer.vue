<template>
  <v-card tile>
    <s-tool-bar @click="onToolBarClick" />
    <v-alert class="mb-0" tile type="warning">
      This page is under renovation.
    </v-alert>
    <wave-surfer
      ref="ws"
      v-if="source"
      showSpectrogram
      showFreqLabel
      splitChannels
      normalize
      responsive
      scrollParent
      :source="source"
      :freqRate="freqRate"
      :minPxPerSec="minPxPerSec"
    >
      <template v-slot:textform>
        <v-text-field
          outline
          hide-details
          class="ma-0"
          label="text"
          v-if="current.key"
          v-model="text"
          :disabled="current.key == null"
        />
      </template>
    </wave-surfer>
  </v-card>
</template>
<script>
import SToolBar from "@/components/Surfer/SToolBar";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
export default {
  name: "surfer",
  components: {
    SToolBar,
    WaveSurfer
  },
  data: () => ({
    isReady: false,
    source: null,
    textgrid: {},
    text: "",
    freqRate: 0.5,
    minPxPerSec: 100,
    current: {
      key: "",
      record: {
        text: "",
        time: 0,
        idx: 0
      },
      tier: {
        values: []
      }
    },
    zoom: 1,
    tab: null
  }),
  methods: {
    initCurrent: function() {
      this.current.key = "";
      this.current.record.text = "";
      this.current.record.time = 0;
      this.current.record.idx = 0;
      this.current.tier.values = [];
    },
    initData: function() {
      this.source = null;
      this.textgrid = {};
      this.isReady = false;
      this.zoom = 1;
      this.tab = null;
      this.text = "";
      this.initCurrent();
    },
    loadAudio(file) {
      this.source = null;
      const fr = new FileReader();
      fr.addEventListener("load", () => {
        this.source = fr.result;
      });
      fr.readAsDataURL(file);
    },
    onToolBarClick($event) {
      console.log($event.click, $event.type);
      if ($event.type == "OPEN") {
        if ($event.click == "AUDIO") {
          this.loadAudio($event.files[0]);
        }
      }
    }
  }
};
</script>

<style scoped></style>
