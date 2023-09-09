<template>
  <v-container class="grey lighten-2 fill-height" fluid>
    <v-row>
      <v-col>
        <w-jumbotron :heading="heading" :desc="desc" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" dark>
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
            style="max-height: 400px"
            class="overflow-y-auto"
          >
            <w-code-heighlight v-if="item.tab == 'Template'">
              {{ template_string }}
            </w-code-heighlight>
            <w-code-heighlight v-if="item.tab == 'Script'">
              {{ script_string }}
            </w-code-heighlight>
            <w-code-heighlight v-if="item.tab == 'Style'">
              {{ style_string }}
            </w-code-heighlight>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert class="mb-0" border="left">
          <slot name="desc"></slot>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import WJumbotron from "@/components/Base/WJumbotron.vue";
import WCodeHeighlight from "@/components/Base/WCodeHeighlight.vue";
export default {
  name: "WExampleLayout.vue",
  components: {
    WJumbotron,
    WCodeHeighlight,
  },
  data: () => ({
    tab: null,
    items: [
      { tab: "Template", content: "template" },
      { tab: "Script", content: "script" },
      { tab: "Style", content: "style" },
    ],
  }),
  props: {
    heading: {
      type: String,
    },
    desc: {
      type: String,
    },
    template_code: {
      type: String,
      default: "",
    },
    script_code: {
      type: String,
      default: "",
    },
    style_code: {
      type: String,
      default: "",
    },
  },
  computed: {
    template_string: function () {
      if (this.template_code.length == 0) {
        return "<template></template>";
      }
      const codes = [];
      for (const x of this.template_code
        .split("\n")
        .filter((x) => x.trim().length > 0)) {
        codes.push(x);
      }
      return `<template>\n${codes.join("\n")}\n</template>`;
    },
    script_string: function () {
      if (this.script_code.length == 0) {
        return `<script><\/script>`; // eslint-disable-line no-useless-escape
      }
      const codes = [];
      for (const x of this.script_code
        .split("\n")
        .filter((x) => x.trim().length > 0)) {
        codes.push(x);
      }
      return `<script>\n${codes.join("\n")}\n<\/script>`; // eslint-disable-line no-useless-escape
    },
    style_string: function () {
      if (this.style_code.length == 0) {
        return "<style scoped></style>";
      }
      const codes = [];
      for (const x of this.style_code
        .split("\n")
        .filter((x) => x.trim().length > 0)) {
        codes.push(x);
      }
      return `<style scoped>\n${codes.join("\n")}\n</style>`;
    },
  },
};
</script>

<style scoped></style>
