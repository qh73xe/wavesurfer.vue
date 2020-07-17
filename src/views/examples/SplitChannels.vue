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
      </template>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        :source="source"
        responsive
        splitChannels
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

const name = "split-channel";
const locale = "$vuetify.example.splitChannels";
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
    card_title: `${name} demo`,
    desc: "How to load the stereo audio.",
    snackbar: {
      show: false,
      text: ""
    },
    template: `
    <v-card class="mx-auto">
      <v-card-text>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
      </v-card-text>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        :source="source"
        responsive
        splitChannels
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
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
