<template>
  <w-example-layout
    :heading="title"
    :desc="$vuetify.lang.t(`${locale}.headline`)"
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
        <v-file-input
          accept=".TextGrid"
          v-if="source"
          label="textgrid"
          @change="onTextGridFileChange"
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
      <template v-slot:toolbar>
        <w-example-help-dialog>
          <span
            class="font-weight-light subtitle-1"
            v-html="$vuetify.lang.t(`${locale}.help`)"
          />
        </w-example-help-dialog>
      </template>
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        @textgrid-dblclick="onDblclick"
        @textgrid-click="onClick"
        @textgrid-update="onTextGridUpdate"
        @textgrid-current-update="onTextGridCurrentUpdate"
        showTimeLine
        showTextGrid
        responsive
        :source="source"
      >
        <template v-slot:textform>
          <v-text-field
            v-if="current.key"
            v-model="current.text"
            class="ma-0"
            label="text"
            outline
            hide-details
            :disabled="current.key == null"
            @keydown.enter="saveTierValue"
          />
        </template>
      </wave-surfer>
      <w-example-demo-card-actions :ws="$refs.wavesurfer" v-if="isReady" />
      <v-tabs v-if="isReady" v-model="tab" background-color="primary" dark>
        <v-tab v-for="(tier, key) in tabs" :key="key">
          {{ tier }}
        </v-tab>
        <v-dialog v-model="tierDialog.show" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="align-self-center mr-4" v-bind="attrs" v-on="on">
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">
                New Tier
              </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="tierDialog.name"
                      label="Tier name*"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['interval', 'point']"
                      label="tier type*"
                      v-model="tierDialog.type"
                      required
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="closeTierDialog">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveTierDialog">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-tabs>
      <v-tabs-items v-if="current.key">
        <v-data-table :headers="headers" :items="current.values" sort-by="time">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>TIER: {{ current.key }}</v-toolbar-title>
              <v-spacer />
              <v-btn
                color="error"
                dark
                class="mb-2 mx-2"
                @click="deleteTier(current.key)"
              >
                Delete Tier
              </v-btn>

              <v-dialog v-model="valueDialog.show" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title> Value in {{ current.key }} </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="valueDialog.text"
                            label="text"
                          />
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="valueDialog.time"
                            label="time"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeValueDialog"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="saveValueDialog"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editValue(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteTierValue(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-tabs-items>
      <v-card-actions v-if="tabs.length > 0">
        <v-btn @click="downloadTextGrid" color="primary" block rounded dark>
          Download TextGrid
        </v-btn>
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
import WExampleDemoCardActions from "@/components/Base/WExampleDemoCardActions.vue";
import WExampleHelpDialog from "@/components/Base/WExampleHelpDialog.vue";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";
const name = "textgrid";
const locale = "$vuetify.example.textgrid";
export default {
  name: name,
  components: {
    WExampleLayout,
    WExampleDemoCard,
    WExampleDemoCardActions,
    WExampleHelpDialog,
    WaveSurfer
  },
  data: () => ({
    source: null,
    textgrid: {},
    current: {
      key: null,
      text: null,
      time: null,
      idx: null,
      values: []
    },
    isReady: false,
    zoom: 0,
    tab: null,
    valueDialog: {
      show: false,
      text: "",
      time: 0
    },
    tierDialog: {
      show: false,
      name: "",
      type: "interval"
    },
    tabs: [],
    headers: [
      { text: "time", value: "time" },
      { text: "text", value: "text" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    snackbar: {
      show: false,
      text: ""
    },
    locale: locale,
    title: `wavesurfer.vue>example>${name}`,
    cardTitle: `${name} demo`,
    template: `
    <v-card class="mx-auto">
      <v-card-text>
        <v-file-input
          accept="audio/*"
          label="audio file"
          @change="onFileChange"
        />
        <v-file-input
          accept=".TextGrid"
          v-if="source"
          label="textgrid"
          @change="onTextGridFileChange"
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
        @ready="onReady"
        @textgrid-dblclick="onDblclick"
        @textgrid-click="onClick"
        @textgrid-update="onTextGridUpdate"
        @textgrid-current-update="onTextGridCurrentUpdate"
        showTimeLine
        showTextGrid
        :source="source"
        :responsive="true"
      >
        <template v-slot:textform>
          <v-text-field
            v-if="current.key"
            v-model="current.text"
            class="ma-0"
            label="text"
            outline
            hide-details
            :disabled="current.key == null"
            @keydown.enter="saveTierValue"
          />
        </template>
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
      <v-tabs v-if="isReady" v-model="tab" background-color="primary" dark>
        <v-tab v-for="(tier, key) in tabs" :key="key">
          {{ tier }}
        </v-tab>
        <v-dialog v-model="tierDialog.show" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="align-self-center mr-4" v-bind="attrs" v-on="on">
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">
                New Tier
              </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="tierDialog.name"
                      label="Tier name*"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['interval', 'point']"
                      label="tier type*"
                      v-model="tierDialog.type"
                      required
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="closeTierDialog">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveTierDialog">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-tabs>
      <v-tabs-items v-if="current.key">
        <v-data-table :headers="headers" :items="current.values" sort-by="time">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>TIER: {{ current.key }}</v-toolbar-title>
              <v-spacer />
              <v-btn
                color="error"
                dark
                class="mb-2 mx-2"
                @click="deleteTier(current.key)"
              >
                Delete Tier
              </v-btn>

              <v-dialog v-model="valueDialog.show" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title> Value in {{ current.key }} </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="valueDialog.text"
                            label="text"
                          />
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="valueDialog.time"
                            label="time"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeValueDialog">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveValueDialog">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editValue(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteTierValue(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-tabs-items>
      <v-card-actions v-if="tabs.length > 0">
        <v-btn @click="downloadTextGrid" color="primary" block rounded dark>
          Download TextGrid
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
        textgrid: {},
        current: {
          key: null,
          text: null,
          time: null,
          idx: null,
          values: []
        },
        isReady: false,
        zoom: 0,
        tab: null,
        valueDialog: {
          show: false,
          text: "",
          time: 0
        },
        tierDialog: {
          show: false,
          name: "",
          type: "interval"
        },
        tabs: [],
        headers: [
          { text: "time", value: "time" },
          { text: "text", value: "text" },
          { text: "Actions", value: "actions", sortable: false }
        ],
        snackbar: {
          show: false,
          text: ""
        },
      }),
      watch: {
        tab: function(val) {
          if (val === null) {
            (this.current.key = ""), (this.current.values = []);
          } else {
            this.current.key = Object.keys(this.textgrid)[val];
            const values = this.textgrid[this.current.key].values;
            this.current.values = values
            if (this.current.idx==null){
              if (values.length > 0){
                this.current.idx = 0
              }
            }
          }
        }
      },
      methods: {
        closeTierDialog: function() {
          this.tierDialog.show = false;
          this.tierDialog.name = "";
          this.tierDialog.type = "interval";
        },
        saveTierDialog: function() {
          this.$refs.wavesurfer.addTier(this.tierDialog.name, this.tierDialog.type);
          this.closeTierDialog();
          if (this.tab !== null) {
            this.tab++;
          }
        },
        deleteTier: function(key) {
          this.$refs.wavesurfer.deleteTier(key);
          if (this.tab == 0) {
            this.tab = null;
          } else {
            this.tab = this.tab - 1;
          }
        },
        closeValueDialog: function() {
          this.valueDialog.show = false;
          this.valueDialog.text = "";
          this.valueDialog.time = 0;
        },
        saveValueDialog: function() {
          const key = this.current.key;
          const item = {
            time: this.valueDialog.time,
            text: this.valueDialog.text
          };
          this.current.time = item.time;
          this.current.text = item.text;
          if (this.textgrid[key].values.findIndex(x => x.time == item.time) > -1) {
            this.saveTierValue();
          } else {
            this.$refs.wavesurfer.addTierValue(key, item);
          }
          this.closeValueDialog();
        },
        editValue(value) {
          this.valueDialog.text = value.text;
          this.valueDialog.time = value.time;
          this.valueDialog.show = true;
        },
        saveTierValue: function() {
          const key = this.current.key;
          const item = {
            time: this.current.time,
            text: this.current.text
          }
          const idx = this.current.idx
          this.$refs.wavesurfer.setTierValue(key, idx, item);
        },
        deleteTierValue(item) {
          const key = this.current.key;
          const idx = this.textgrid.values.findIndex(x=>x.time==item.time)
          if (idx > -1){
            this.$refs.wavesurfer[key].deleteTierValue(key, idx);
          }
        },
        downloadTextGrid: function() {
          const filename = "test.TextGrid";
          this.$refs.wavesurfer.downloadTextGrid(filename);
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
        onTextGridFileChange: function(file) {
          if (file) {
            this.$refs.wavesurfer.loadTextGrid(file);
          }
        },
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
        onReady: function() {
          this.isReady = true;
        },
        onDblclick: function(obj) {
          const key = obj.key;
          const item = {
            time: obj.time,
            text: ""
          };
          this.$refs.wavesurfer.addTierValue(key, item);
        },
        onClick: function(obj) {
          if (obj.item) {
            this.current.key = obj.key;
            this.current.text = obj.item.text;
            this.current.time = obj.item.time;
          }
        },
        onTextGridUpdate: function(textgrid) {
          this.textgrid = textgrid;
          this.tabs = Object.keys(this.textgrid);
        },
        onTextGridCurrentUpdate: function(current) {
          this.current.key = current.key;
          this.current.idx = current.index;
          if (current.item) {
            this.current.time = current.item.time;
            this.current.text = current.item.text;
          } else {
            this.current.time = 0;
            this.current.text = "";
          }
        }
      }
    };
    `
  }),
  watch: {
    tab: function(val) {
      if (val === null) {
        (this.current.key = ""), (this.current.values = []);
      } else {
        this.current.key = Object.keys(this.textgrid)[val];
        this.current.values = this.textgrid[this.current.key].values;
      }
    }
  },
  methods: {
    closeTierDialog: function() {
      this.tierDialog.show = false;
      this.tierDialog.name = "";
      this.tierDialog.type = "interval";
    },
    saveTierDialog: function() {
      this.$refs.wavesurfer.addTier(this.tierDialog.name, this.tierDialog.type);
      this.closeTierDialog();
      if (this.tab !== null) {
        this.tab++;
      }
    },
    deleteTier: function(key) {
      this.$refs.wavesurfer.deleteTier(key);
      if (this.tab == 0) {
        this.tab = null;
      } else {
        this.tab = this.tab - 1;
      }
    },
    closeValueDialog: function() {
      this.valueDialog.show = false;
      this.valueDialog.text = "";
      this.valueDialog.time = 0;
    },
    saveValueDialog: function() {
      const key = this.current.key;
      const item = {
        time: this.valueDialog.time,
        text: this.valueDialog.text
      };
      this.current.time = item.time;
      this.current.text = item.text;
      const idx = this.textgrid[key].values.findIndex(x => x.time == item.time);
      if (idx > -1) {
        this.saveTierValue();
      } else {
        this.$refs.wavesurfer.addTierValue(key, item);
      }
      this.closeValueDialog();
    },
    editValue(value) {
      this.valueDialog.text = value.text;
      this.valueDialog.time = value.time;
      this.valueDialog.show = true;
    },
    saveTierValue: function() {
      const key = this.current.key;
      const item = {
        time: this.current.time,
        text: this.current.text
      };
      const idx = this.current.idx;
      this.$refs.wavesurfer.setTierValue(key, idx, item);
    },
    deleteTierValue(item) {
      const key = this.current.key;
      const idx = this.textgrid[key].values.findIndex(x => x.time == item.time);
      this.$refs.wavesurfer.deleteTierValue(key, idx);
    },
    downloadTextGrid: function() {
      const filename = "test.TextGrid";
      this.$refs.wavesurfer.downloadTextGrid(filename);
    },
    onTextGridFileChange: function(file) {
      if (file) {
        this.$refs.wavesurfer.loadTextGrid(file);
      }
    },
    onFileChange: function(file) {
      this.source = null;
      this.textgrid = {};
      this.isReady = false;
      this.zoom = 0;
      this.tab = null;
      this.valueDialog.show = false;
      this.valueDialog.text = "";
      this.valueDialog.time = 0;
      this.tierDialog.show = false;
      this.tierDialog.name = "";
      this.tierDialog.type = "interval";
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
    },
    onDblclick: function(obj) {
      const key = obj.key;
      const item = {
        time: obj.time,
        text: ""
      };
      this.$refs.wavesurfer.addTierValue(key, item);
    },
    onClick: function(obj) {
      if (obj.item) {
        this.current.key = obj.key;
        this.current.text = obj.item.text;
        this.current.time = obj.item.time;
      }
    },
    onTextGridUpdate: function(textgrid) {
      this.textgrid = textgrid;
      this.tabs = Object.keys(this.textgrid);
    },
    onTextGridCurrentUpdate: function(current) {
      this.current.key = current.key;
      this.current.idx = current.index;
      if (current.item) {
        this.current.time = current.item.time;
        this.current.text = current.item.text;
      } else {
        this.current.time = 0;
        this.current.text = "";
      }
    }
  }
};
</script>
<style scoped></style>
