<template>
  <w-example-layout
    :heading="title"
    :desc="desc"
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
    <w-example-demo-card :title="card_title">
      <template v-slot:toolbar>
        <v-switch class="mt-4" v-model="isScroll" label="scroll" />
      </template>
      <template v-slot:input-form>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
        <v-row>
          <v-col>
            <v-select
              v-model="targetChannel"
              :items="[0, 1]"
              label="target channel"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slider
              v-model="zoom"
              @end="onZoomEnd"
              append-icon="mdi-magnify-plus-cursor"
              prepend-icon="mdi-magnify-minus-cursor"
              step="100"
              :min="0"
              :max="500"
              :thumb-size="24"
              label="Zoom"
            >
              <template v-slot:thumb-label="{ value }">
                {{ (value / 100).toFixed(1) }}
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slider
              v-model="freqRate"
              append-icon="mdi-magnify-plus-cursor"
              prepend-icon="mdi-magnify-minus-cursor"
              step="0.25"
              :min="0.25"
              :max="1"
              :hint="`モノラル音源の場合: ${freqRate * 12} kHz,
                ステレオ音源の場合: ${freqRate * 24} kHz までを表示します`"
              label="MaxFreq"
            >
              <template v-slot:thumb-label="{ value }">
                {{ value }}
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </template>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        :source="source"
        :minPxPerSec="minPxPerSec"
        :scrollParent="scrollParent"
        :freqRate="freqRate"
        :targetChannel="targetChannel"
        showSpectrogram
        splitChannels
        normalize
        responsive
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        @spectrogram-render-start="onSpectrogramRenderStart"
        @spectrogram-render-end="onSpectrogramRenderEnd"
      >
        <v-progress-linear
          v-if="isLoading"
          color="light-blue"
          height="10"
          indeterminate
        />
      </wave-surfer>
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

const name = "spectrogram";
const locale = "$vuetify.example.spectrogram";
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
    desc: "How to show the spectrogram of audio file.",
    isScroll: true,
    isLoading: false,
    zoom: 0,
    freqRate: 1,
    targetChannel: 0,
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
          <v-col>
            <v-switch class="mt-4" v-model="isScroll" label="scroll" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="targetChannel"
              :items="[0, 1]"
              label="target channel"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slider
              v-model="zoom"
              @end="onZoomEnd"
              append-icon="mdi-magnify-plus-cursor"
              prepend-icon="mdi-magnify-minus-cursor"
              step="100"
              :min="0"
              :max="500"
              label="Zoom"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slider
              v-model="freqRate"
              append-icon="mdi-magnify-plus-cursor"
              prepend-icon="mdi-magnify-minus-cursor"
              step="0.25"
              :min="0.25"
              :max="1"
              label="MaxFreq"
            />
          </v-col>
        </v-row>

      </v-card-text>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        :source="source"
        :minPxPerSec="minPxPerSec"
        :scrollParent="scrollParent"
        :freqRate="freqRate"
        :targetChannel="targetChannel"
        showSpectrogram
        splitChannels
        normalize
        responsive
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @spectrogram-render-start="onSpectrogramRenderStart"
        @spectrogram-render-end="onSpectrogramRenderEnd"
      >
        <v-progress-linear
          v-if="isLoading"
          color="light-blue"
          height="10"
          indeterminate
        />
      </wave-surfer>
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
        isScroll: true,
        isLoading: false,
        zoom: 0,
        freqRate: 1,
        targetChannel: 0,
        snackbar: {
          show: false,
          text: ""
        },
      }),
      computed: {
        minPxPerSec: function() {
          if (this.isScroll) {
            return 100;
          }
          return 50;
        },
        scrollParent: function() {
          return this.isScroll;
        }
      },
      methods: {
        onFileChange: function(file) {
          this.source = null;
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener("load", () => {
            this.source = fr.result;
          });
        },
        onZoomEnd: function(val) {
          this.$refs.wavesurfer.zoom(Number(val));
        },
        onSpectrogramRenderEnd() {
          this.isLoading = false;
        },
        onSpectrogramRenderStart() {
          this.isLoading = true;
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
          if (this.$refs.wavesurfer) {
            this.$refs.wavesurfer.pause();
          }
        },
        playPause: function() {
          if (this.$refs.wavesurfer) {
            this.$refs.wavesurfer.playPause();
          }
        },
        skipBackward: function() {
          if (this.$refs.wavesurfer) {
            this.$refs.wavesurfer.skipBackward();
          }
        },
        skipForward: function() {
          if (this.$refs.wavesurfer) {
            this.$refs.wavesurfer.skipForward();
          }
        }
      }
    };
    `,
    source: null,
    isReady: false,
  }),
  computed: {
    minPxPerSec: function () {
      if (this.isScroll) {
        return 100;
      }
      return 50;
    },
    scrollParent: function () {
      return this.isScroll;
    },
  },
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
    onZoomEnd: function (val) {
      this.$refs.wavesurfer.zoom(Number(val));
    },
    onSpectrogramRenderEnd() {
      this.isLoading = false;
    },
    onSpectrogramRenderStart() {
      this.isLoading = true;
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
