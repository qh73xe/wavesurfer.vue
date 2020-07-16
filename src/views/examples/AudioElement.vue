<template>
  <w-example-layout
    :heading="title"
    :desc="desc"
    :template_code="template"
    :script_code="code"
  >
    <v-card class="mx-auto">
      <v-system-bar color="primary darken-2" dark>
        <v-spacer></v-spacer>
        <v-icon>mdi-window-minimize</v-icon>
        <v-icon>mdi-window-maximize</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>wave-furser</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
      </v-card-text>
      <wave-surfer
        @play="onPlay"
        @pause="onPause"
        ref="wavesurfer"
        v-if="source"
        :source="source"
        :responsive="true"
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
  </w-example-layout>
</template>

<script>
import WExampleLayout from "@/components/Base/WExampleLayout.vue";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
export default {
  data: () => ({
    title: "wavesurfer.vue>example>audio-element",
    desc: "How to load the audio.",
    snackbar: {
      show: false,
      text: ""
    },
    template: `
    <v-card class="mx-auto">
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        :source="source"
        :responsive="true"
        @play="onPlay"
        @pause="onPause"
      />
      <v-card-actions>
        <v-btn dark icon color="primary" @click="play">
          <v-icon dark>mdi-play</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="pause">
          <v-icon dark>mdi-pause</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
      </v-card-text>
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
      </v-snackbar>
    </v-card>
    `,
    code: `
    import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
    export default {
      data: () => ({
        source: null,
        snackbar: {
          show: false,
          text: ""
        },
      }),
      components: { WaveSurfer },
      methods: {
        onFileChange: function(file) {
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
        play: function() {
          this.$refs.wavesurfer.play();
        },
        pause: function() {
          if (this.$refs.wavesurfer) {
            this.$refs.wavesurfer.pause();
          }
        }
      }
    };
    `,
    source: null
  }),
  components: {
    WExampleLayout,
    WaveSurfer
  },
  methods: {
    onFileChange: function(file) {
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.source = fr.result;
        });
      } else {
        this.source = null;
      }
    },
    onPlay: function() {
      this.snackbar.text = "on play";
      this.snackbar.show = true;
    },
    onPause: function() {
      this.snackbar.text = "on pause";
      this.snackbar.show = true;
    },
    play: function() {
      if (this.$refs.wavesurfer) {
        this.$refs.wavesurfer.play();
      }
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
</script>
<style scoped></style>
