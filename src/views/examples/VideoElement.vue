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
          accept="video/*"
          label="video file"
          @change="onFileChange"
        />
      </template>
      <v-card-text v-if="source">
        <v-row>
          <v-col cols="3">
            <video ref="video" :src="source" @loadeddata="onLoadedData" />
          </v-col>
        </v-row>
      </v-card-text>
      <wave-surfer
        ref="wavesurfer"
        v-if="videoSource"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        backend="MediaElement"
        :source="videoSource"
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

const name = "video-element";
const locale = "$vuetify.example.videoElement";
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
    desc: "How to load the video.",
    snackbar: {
      show: false,
      text: ""
    },
    source: null,
    videoSource: null,
    template: `
    <v-card class="mx-auto">
      <v-card-text>
        <v-file-input
          accept="video/*"
          label="video file"
          @change="onFileChange"
        />
      </v-card-text>
      <video
        ref="video"
        :src="source"
        @loadeddata="onLoadedData"
        v-if="source"
      />
      <wave-surfer
        ref="wavesurfer"
        v-if="videoSource"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        backend="MediaElement"
        :source="videoSource"
        :responsive="true"
      />
      <v-card-actions v-if="videoSource">
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
        videoSource: null,
        snackbar: {
          show: false,
          text: ""
        },
      }),
      methods: {
        onFileChange: function(file) {
          this.source = null;
          this.videoSource = null;
          if (file) {
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.addEventListener("load", () => {
              this.source = fr.result;
            });
          }
        },
        onLoadedData: function() {
          this.videoSource = this.$refs.video;
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
    isReady: false
  }),
  methods: {
    onFileChange: function(file) {
      this.source = null;
      this.videoSource = null;
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.source = fr.result;
        });
      }
    },
    onLoadedData: function() {
      this.videoSource = this.$refs.video;
    },
    onReady: function() {
      this.isReady = true;
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
<style scoped>
video {
  width: 100%;
}
</style>
