<template>
  <w-example-layout
    :heading="title"
    :desc="$vuetify.lang.t(`${locale}.headline`)"
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
      <wave-surfer
        ref="wavesurfer"
        v-if="source"
        @play="onPlay"
        @pause="onPause"
        @destroy="onDestroy"
        @ready="onReady"
        @textgrid-dblclick="onDblclick"
        @textgrid-click="onClick"
        showTimeLine
        showTextGrid
        :tiers="tiers"
        :source="source"
        :responsive="true"
      >
        <template v-slot:textform>
          <v-text-field
            v-if="currentTier.name"
            v-model="current.text"
            class="ma-0"
            label="text"
            outline
            hide-details
            :disabled="current.key == null"
            @keydown.enter="saveTierValueText"
          />
        </template>
      </wave-surfer>
      <w-example-demo-card-actions :ws="$refs.wavesurfer" v-if="isReady" />
      <v-tabs
        v-if="isReady"
        v-model="tab"
        background-color="red lighten-2"
        dark
      >
        <v-tab v-for="(tier, key) in Object.keys(this.tiers)" :key="key">
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
              <span class="headline">New Tier</span>
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
      <v-tabs-items v-if="currentTier.name">
        <v-data-table
          :headers="headers"
          :items="currentTier.values"
          sort-by="time"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>TIER: {{ currentTier.name }}</v-toolbar-title>
              <v-spacer />
              <v-btn
                color="error"
                dark
                class="mb-2 mx-2"
                @click="deleteTier(currentTier.name)"
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
                  <v-card-title> Value in {{ currentTier.name }} </v-card-title>
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
            <v-icon small @click="removeValue(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <pre> {{ currentTier.values }} </pre>
      </v-tabs-items>

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
const name = "textgrid";
const locale = "$vuetify.example.textgrid";
export default {
  name: name,
  components: {
    WExampleLayout,
    WExampleDemoCard,
    WExampleDemoCardActions,
    WaveSurfer
  },
  data: () => ({
    source: null,
    tiers: {},
    current: {
      text: null,
      time: null,
      key: null
    },
    currentTier: {
      name: null,
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
    template: ``,
    code: ``
  }),
  watch: {
    tab: function(val) {
      if (val === null) {
        (this.currentTier.name = ""), (this.currentTier.values = []);
      } else {
        this.currentTier.name = Object.keys(this.tiers)[val];
        this.currentTier.values = this.tiers[this.currentTier.name].values;
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
      const key = this.currentTier.name;
      const item = {
        time: this.valueDialog.time,
        text: this.valueDialog.text
      };
      this.$refs.wavesurfer.addTierValue(key, item);
      this.closeValueDialog();
    },
    saveTierValueText: function() {
      const key = this.current.key;
      const time = this.current.time;
      const text = this.current.text;
      this.$refs.wavesurfer.setTierValueText(key, time, text);
    },
    editValue(value) {
      this.valueDialog.text = value.text;
      this.valueDialog.time = value.time;
      this.valueDialog.show = true;
    },
    removeValue(value) {
      console.log(value);
    },
    onTextGridFileChange: function(file) {
      if (file) {
        this.$refs.wavesurfer.loadTextGrid(file);
      }
    },

    onFileChange: function(file) {
      this.source = null;
      this.tiers = {};
      this.currentTier = {
        name: null,
        values: []
      };
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
    }
  }
};
</script>
<style scoped></style>
