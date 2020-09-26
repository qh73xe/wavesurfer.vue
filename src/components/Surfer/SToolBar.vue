<template>
  <v-toolbar dense dark color="primary lighten-1">
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu tile bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small text v-bind="attrs" v-on="on">open</v-btn>
        </template>
        <s-upload-list @click="$emit('click', $event)" />
      </v-menu>
      <v-menu tile bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small text v-bind="attrs" v-on="on">save</v-btn>
        </template>
        <s-download-list @click="$emit('click', $event)" />
      </v-menu>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu tile bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small text v-bind="attrs" v-on="on"> View </v-btn>
        </template>
        <s-view-list @click="$emit('click', $event)" />
      </v-menu>
      <v-menu tile bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small text v-bind="attrs" v-on="on"> Tier </v-btn>
        </template>
        <s-m-tier-list @click="$emit('click', $event)" />
      </v-menu>
      <v-menu tile bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small text v-bind="attrs" v-on="on"> Record </v-btn>
        </template>
        <s-m-record-list @click="$emit('click', $event)" />
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import SUploadList from "./lists/SUploadList";
import SDownloadList from "./lists/SDownloadList";
import SViewList from "./lists/SViewList";
import SMTierList from "./lists/SMTierList";
import SMRecordList from "./lists/SMRecordList";
export default {
  name: "s-tool-bar",
  components: {
    SUploadList,
    SDownloadList,
    SViewList,
    SMTierList,
    SMRecordList
  }
};
</script>

<style scoped></style>
