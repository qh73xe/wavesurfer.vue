<template>
  <w-example-layout
    :heading="title"
    :desc="desc"
    :template_code="template"
    :script_code="code"
  >
    <template v-slot:desc>
      <span
        class="font-weight-light subtitle-1"
        v-html="$vuetify.lang.t(`${locale}.desc`)"
      />
    </template>
    <w-example-demo-card :title="card_title">
      <template v-slot:input-form>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
        <v-row>
          <v-col col="4">
            <label>wave color: {{ waveColor }}</label>
            <v-color-picker v-model="waveColor"></v-color-picker>
          </v-col>
          <v-col col="4">
            <label>progress color: {{ progressColor }}</label>
            <v-color-picker v-model="progressColor"></v-color-picker>
          </v-col>
          <v-col col="4">
            <label>cursor color: {{ cursorColor }}</label>
            <v-color-picker v-model="cursorColor"></v-color-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-slider
            v-model="barWidth"
            label="bar width"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="barRadius"
            label="bar Radius"
            min="0"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="barGap"
            label="bar Gap"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="cursorWidth"
            label="cursor width"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="height"
            label="height"
            min="100"
            max="500"
            step="100"
            ticks="always"
            tick-size="4"
          />
        </v-row>
      </template>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        :source="source"
        :waveColor="waveColor"
        :progressColor="progressColor"
        :barWidth="barWidth"
        :barRadius="barRadius"
        :barGap="barGap"
        :cursorColor="cursorColor"
        :cursorWidth="cursorWidth"
        :height="height"
        responsive
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

const name = "bars";
const locale = "$vuetify.example.bars";
export default {
  name: name,
  components: {
    WExampleLayout,
    WExampleDemoCard,
    WExampleDemoCardActions,
    WaveSurfer,
  },
  data: () => ({
    locale: locale,
    title: `wavesurfer.vue>example>${name}`,
    card_title: `${name} demo`,
    desc: "How to change the wave form shape.",
    waveColor: "#D9DCFF",
    progressColor: "#4353FF",
    cursorColor: "#4353FF",
    barWidth: 3,
    barRadius: 3,
    cursorWidth: 1,
    height: 200,
    barGap: 3,
    snackbar: {
      show: false,
      text: "",
    },
    template: `
    <v-card class="mx-auto">
      <v-card-text>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
        <v-row>
          <v-col col="4">
            <label>wave color: {{ waveColor }}</label>
            <v-color-picker v-model="waveColor"></v-color-picker>
          </v-col>
          <v-col col="4">
            <label>progress color: {{ progressColor }}</label>
            <v-color-picker v-model="progressColor"></v-color-picker>
          </v-col>
          <v-col col="4">
            <label>cursor color: {{ cursorColor }}</label>
            <v-color-picker v-model="cursorColor"></v-color-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-slider
            v-model="barWidth"
            label="bar width"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="barRadius"
            label="bar Radius"
            min="0"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="barGap"
            label="bar Gap"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="cursorWidth"
            label="cursor width"
            min="1"
            max="5"
            step="1"
            ticks="always"
            tick-size="4"
          />
        </v-row>
        <v-row>
          <v-slider
            v-model="height"
            label="height"
            min="100"
            max="500"
            step="100"
            ticks="always"
            tick-size="4"
          />
        </v-row>

      </v-card-text>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        :source="source"
        :waveColor="waveColor"
        :progressColor="progressColor"
        :barWidth="barWidth"
        :barRadius="barRadius"
        :barGap="barGap"
        :cursorColor="cursorColor"
        :cursorWidth="cursorWidth"
        :height="height"
        responsive
      />
      <v-card-actions v-if="source">
        <v-btn dark icon color="primary" @click="skipBackward">
          <v-icon dark>mdi-skip-backward</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn dark icon color="primary" @click="playPause">
          <v-icon dark>mdi-play-pause</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="play">
          <v-icon dark>mdi-play</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="pause">
          <v-icon dark>mdi-pause</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn dark icon color="primary" @click="skipForward">
          <v-icon dark>mdi-skip-forward</v-icon>
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
      </v-snackbar>
    </v-card>
    `,
    code: `
    import WaveSurfer from "wavesurfer.vue";
    export default {
      components: { WaveSurfer },
      data: () => ({
        source: null,
        waveColor: "#D9DCFF",
        progressColor: "#4353FF",
        cursorColor: "#4353FF",
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 200,
        barGap: 3,
        snackbar: {
          show: false,
          text: ""
        },
      }),
      methods: {
        onFileChange: function(file) {
          this.source = null;
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener("load", () => {
            this.source = fr.result;
          });
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
        },
        play: function() {
          this.$refs.wavesurfer.play();
        },
        pause: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.pause();
        },
        playPause: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.playPause();
        },
        skipBackward: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.skipBackward();
        },
        skipForward: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.skipForward();
        }
      }
    };
    `,
    source: null,
    isReady: false,
  }),
  methods: {
    onFileChange: function (file) {
      this.source = null;
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.source = fr.result;
        });
      }
    },
    onReady: function () {
      this.isReady = true;
      this.snackbar.text = "on ready";
      this.snackbar.show = true;
    },
    onPlay: function () {
      this.snackbar.text = "on play";
      this.snackbar.show = true;
    },
    onPause: function () {
      this.snackbar.text = "on pause";
      this.snackbar.show = true;
    },
    onDestroy: function () {
      this.snackbar.text = "on destroy";
      this.snackbar.show = true;
    },
  },
};
</script>
<style scoped></style>
