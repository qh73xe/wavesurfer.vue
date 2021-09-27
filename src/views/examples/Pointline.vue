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
        @addPoint="onAddPoint"
        @updatePoint="onUpdatePoint"
        @deletePoint="onDeletePoint"
        showPointLine
        showTimeLine
        :pointWidth="3"
        :points="points"
        :source="source"
        :responsive="true"
      />
      <w-example-demo-card-actions :ws="$refs.wavesurfer" v-if="isReady" />
      <v-data-table
        v-if="source"
        :headers="headers"
        :items="points"
        sort-by="time"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>POINTS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Points
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row v-if="source">
                      <v-col cols="12">
                        <v-slider
                          v-model="point.size"
                          append-icon="mdi-magnify-plus-cursor"
                          prepend-icon="mdi-magnify-minus-cursor"
                          :min="1"
                          :max="20"
                          :thumb-size="24"
                          label="Point Size"
                        >
                          <template v-slot:thumb-label="{ value }">
                            {{ value }} px
                          </template>
                        </v-slider>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="point.time"
                          label="time"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="point.value"
                          label="value"
                          required
                        />
                      </v-col>
                      <v-col cols="12">
                        <label>point color</label>
                        <v-color-picker v-model="point.color" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    @click="updatePoint"
                    rounded
                    block
                    color="primary"
                    dark
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editPoint(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletePoint(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
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

const name = "pointline";
const locale = "$vuetify.example.pointline";
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
    cardTitle: `${name} demo`,
    desc: "How to show the audio point line.",
    zoom: 0,
    point: {
      size: 3,
      color: "#4353FF",
      time: 0,
      value: 0,
    },
    points: [
      {
        size: 3,
        color: "#4353FF",
        time: 0,
        value: 0,
      },
      {
        size: 3,
        color: "#4353FF",
        time: 0.1,
        value: 10,
      },
      {
        size: 3,
        color: "#4353FF",
        time: 0.2,
        value: 5,
      },
    ],
    headers: [
      { text: "id", value: "id" },
      { text: "time", value: "time" },
      { text: "value", value: "value" },
      { text: "color", value: "color" },
      { text: "size", value: "size" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    dialog: false,
    template: `
    <v-card class="mx-auto">
      <v-card-text>
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
      </v-card-text>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @addPoint="onAddPoint"
        @updatePoint="onUpdatePoint"
        @deletePoint="onDeletePoint"
        showPointLine
        showTimeLine
        responsive
        :points="points"
        :source="source"
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
      <v-data-table
        v-if="source"
        :headers="headers"
        :items="points"
        sort-by="time"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>POINTS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Points
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row v-if="source">
                      <v-col cols="12">
                        <v-slider
                          v-model="point.size"
                          append-icon="mdi-magnify-plus-cursor"
                          prepend-icon="mdi-magnify-minus-cursor"
                          :min="1"
                          :max="20"
                          :thumb-size="24"
                          label="Point Size"
                        >
                          <template v-slot:thumb-label="{ value }">
                            {{ value }} px
                          </template>
                        </v-slider>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="point.time"
                          label="time"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="point.value"
                          label="value"
                          required
                        />
                      </v-col>
                      <v-col cols="12">
                        <label>point color</label>
                        <v-color-picker v-model="point.color" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    @click="updatePoint"
                    color="primary"
                    rounded
                    block
                    dark
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editPoint(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deletePoint(item)">
              mdi-delete
            </v-icon>
          </template>
      </v-data-table>
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
        zoom: 0,
        point: {
          size: 3,
          color: "#4353FF",
          time: 0,
          value: 0
        },
        points: [],
        headers: [
          { text: "id", value: "id" },
          { text: "time", value: "time" },
          { text: "value", value: "value" },
          { text: "color", value: "color" },
          { text: "size", value: "size" },
          { text: "Actions", value: "actions", sortable: false }
        ],
        snackbar: {
          show: false,
          text: ""
        },
        dialog: false,
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
        onZoomEnd: function(val) {
          this.$refs.wavesurfer.zoom(Number(val));
        },
        onAddPoint: function(point) {
          this.points.push(point);
          this.isReady = true;
          this.snackbar.text = "on added point.";
          this.snackbar.show = true;
        },
        onUpdatePoint: function(point) {
          const idx = this.points.findIndex(x => x.id == point.id);
          this.points[idx] = point;
          this.isReady = true;
          this.snackbar.text = "on updated point.";
          this.snackbar.show = true;
        },
        onDeletePoint: function(point) {
          const idx = this.points.findIndex(x => x.id == point.id);
          if (idx > -1) {
            this.points.splice(idx, 1);
          }
          this.isReady = true;
          this.snackbar.text = "on deleted point.";
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
        },
        editPoint(item) {
          this.point = Object.assign({}, item);
          this.dialog = true;
        },
        deletePoint(item) {
          this.$refs.wavesurfer.deletePoint(item.id);
        },
        updatePoint() {
          if (this.point.id) {
            this.$refs.wavesurfer.updatePoint(this.point.id, this.point);
          } else {
            this.$refs.wavesurfer.addPoint(this.point);
          }
          this.close();
        },
        close() {
          this.dialog = false;
          this.$nextTick(() => {
            this.point = Object.assign(
              {},
              {
                size: 3,
                color: "#4353FF",
                time: 0,
                value: 0
              }
            );
          });
        },
      }
    };
    `,
    source: null,
    isReady: false,
  }),
  methods: {
    editPoint(item) {
      this.point = Object.assign({}, item);
      this.dialog = true;
    },
    deletePoint(item) {
      this.$refs.wavesurfer.deletePoint(item.id);
    },
    updatePoint() {
      if (this.point.id) {
        this.$refs.wavesurfer.updatePoint(this.point.id, this.point);
      } else {
        this.addPoint();
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.point = Object.assign(
          {},
          {
            size: 3,
            color: "#4353FF",
            time: 0,
            value: 0,
          }
        );
      });
    },
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
    addPoint: function () {
      this.$refs.wavesurfer.addPoint(this.point);
    },
    onAddPoint: function (point) {
      this.points.push(point);
      this.isReady = true;
      this.snackbar.text = `on added point. id = ${point.id}`;
      this.snackbar.show = true;
    },
    onUpdatePoint: function (point) {
      const idx = this.points.findIndex((x) => x.id == point.id);
      this.points[idx] = point;
      this.isReady = true;
      this.snackbar.text = `on updated point. id = ${point.id}`;
      this.snackbar.show = true;
    },
    onDeletePoint: function (point) {
      const idx = this.points.findIndex((x) => x.id == point.id);
      if (idx > -1) {
        this.points.splice(idx, 1);
      }
      this.isReady = true;
      this.snackbar.text = `on deleted point. id = ${point.id}`;
      this.snackbar.show = true;
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
