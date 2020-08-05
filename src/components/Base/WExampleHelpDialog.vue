<template>
  <v-dialog v-model="dialog" :width="width">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :icon="icon">
        <v-icon v-if="icon" v-bind="attrs" v-on="on">mdi-help</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span
          class="headline"
          v-text="$vuetify.lang.t('$vuetify.wExampleHelpDialog.headline')"
        />
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
        <v-btn
          text
          color="primary"
          @click="dialog = false"
          v-text="$vuetify.lang.t('$vuetify.close')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "w-example-help-dialog",
  data: () => ({
    dialog: false
  }),
  props: {
    icon: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "600px"
    }
  }
};
</script>

<style scoped></style>
