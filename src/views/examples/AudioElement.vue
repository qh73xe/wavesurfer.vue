<template>
  <w-example-layout
    :heading="title"
    :desc="desc"
    :template_code="template"
    :script_code="code"
  >
    <v-card class="mx-auto">
      <wave-surfer ref="wavesurfer" v-if="source" :source="source" />
      <v-card-text v-else>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
      </v-card-text>
      <v-card-actions v-if="source">
        <v-btn dark icon color="primary" @click="play">
          <v-icon dark>mdi-play</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="pause">
          <v-icon dark>mdi-pause</v-icon>
        </v-btn>
      </v-card-actions>
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
    template: `
    <v-card class="mx-auto">
      <wave-surfer ref="wavesurfer" v-if="source" :source="source" />
      <v-card-text v-else>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn dark icon color="primary" @click="play">
          <v-icon dark>mdi-play</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="pause">
          <v-icon dark>mdi-pause</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    `,
    code: `
    import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
    export default {
      data: () => ({ source: null }),
      components: { WaveSurfer },
      methods: {
        onFileChange: function(file) {
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener("load", () => {
            this.source = fr.result;
          });
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
      }
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
    }
  }
};
</script>
<style scoped></style>
