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
      <wave-surfer
        ref="wavesurfer"
        rec
        responsive
        :waveColor="waveColor"
        :barWidth="barWidth"
        :barRadius="barRadius"
        @destroy="onDestroy"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn dark icon color="primary" @click="recStart">
          <v-icon dark>mdi-record-circle</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="recStop">
          <v-icon dark>mdi-stop-circle</v-icon>
        </v-btn>
        <v-spacer />
      </v-card-actions>
      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
      </v-snackbar>
    </w-example-demo-card>
  </w-example-layout>
</template>

<script>
import WExampleLayout from "@/components/Base/WExampleLayout.vue";
import WExampleDemoCard from "@/components/Base/WExampleDemoCard.vue";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";

const name = "recording";
const locale = "$vuetify.example.recording";
export default {
  name: name,
  components: {
    WExampleLayout,
    WExampleDemoCard,
    WaveSurfer
  },
  data: () => ({
    locale: locale,
    title: `wavesurfer.vue>example>${name}`,
    card_title: `${name} demo`,
    desc: "How to record the audio.",
    barWidth: 3,
    barRadius: 3,
    waveColor: "black",
    snackbar: {
      show: false,
      text: ""
    },
    template: `
    <v-card class="mx-auto">
      <wave-surfer
        ref="wavesurfer"
        rec
        responsive
        :waveColor="waveColor"
        :barWidth="barWidth"
        :barRadius="barRadius"
        @destroy="onDestroy"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn dark icon color="primary" @click="recStart">
          <v-icon dark>mdi-record-circle</v-icon>
        </v-btn>
        <v-btn dark icon color="primary" @click="recStop">
          <v-icon dark>mdi-stop-circle</v-icon>
        </v-btn>
        <v-spacer />
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
        barWidth: 3,
        barRadius: 3,
        waveColor: "black",
        snackbar: {
          show: false,
          text: ""
        },
      }),
      methods: {
        recStart: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.recStart();
        },
        recStop: function() {
          if (this.$refs.wavesurfer) this.$refs.wavesurfer.recStop();
        },
        onDestroy: function() {
          this.snackbar.text = "on destroy";
          this.snackbar.show = true;
        }
      }
    };
    `,
    source: null,
    isReady: false
  }),
  methods: {
    recStart: function() {
      if (this.$refs.wavesurfer) this.$refs.wavesurfer.recStart();
    },
    recStop: function() {
      if (this.$refs.wavesurfer) this.$refs.wavesurfer.recStop();
    },
    onDestroy: function() {
      this.snackbar.text = "on destroy";
      this.snackbar.show = true;
    }
  }
};
</script>
<style scoped></style>
