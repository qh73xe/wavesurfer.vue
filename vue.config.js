module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/wavesurfer.vue/" : "/"
  // ライブラリ出力用
  // outputDir: "lib"
};
