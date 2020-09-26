<template>
  <v-list dense>
    <input
      ref="input"
      :accept="clicked.accept"
      @change="onChange"
      type="file"
      style="display:none"
    />
    <v-list-item v-for="(item, i) in items" :key="i" @click="onClick(item)">
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "s-upload-list",
  data: () => ({
    clicked: {
      text: "",
      val: "",
      accept: ""
    }
  }),
  computed: {
    items: () => {
      return [
        {
          text: "Read From Audio File ...",
          val: "AUDIO",
          accept: "audio/*"
        },
        {
          text: "Read From Textgrid File ...",
          val: "TEXTGRID",
          accept: ".TextGrid,.textgrid,.Textgrid"
        }
      ];
    }
  },
  methods: {
    init() {
      this.clicked = {
        text: "",
        val: "",
        accept: ""
      };
    },
    open(val) {
      const idx = this.items.findIndex(x => x.val == val);
      if (idx !== -1) {
        this.clicked = this.items[idx];
        this.$nextTick(() => {
          this.$refs.input.click();
        });
      }
    },
    onClick(item) {
      this.clicked = item;
      this.$nextTick(() => {
        this.$refs.input.click();
      });
    },
    onChange() {
      const item = {
        type: "OPEN",
        click: this.clicked.val,
        files: this.$refs.input.files
      };
      this.$emit("click", item);
      this.init();
    }
  }
};
</script>

<style scoped></style>
