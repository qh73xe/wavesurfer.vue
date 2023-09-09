import Vue from "vue";
import VueRouter from "vue-router";
import docs from "./docs.js";
import examples from "./example.js";
import Home from "../views/Home.vue";
import Surfer from "../views/Surfer.vue";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Home",
    text: "Home",
    component: Home,
  },
  {
    path: "/surfer",
    name: "Surfer",
    text: "Surfer",
    component: Surfer,
  },
];

routes = routes.concat(docs);
routes = routes.concat(examples);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
