import Options from "@/views/documentation/Options.vue";
import Methods from "@/views/documentation/Methods.vue";

import Events from "@/views/documentation/Events.vue";
const basename = "docs";
export default [
  {
    path: `/${basename}/options`,
    name: `${basename}-option`,
    text: `Options`,
    component: Options
  },
  {
    path: `/${basename}/methods`,
    name: `${basename}-methods`,
    text: `Methods`,
    component: Methods
  },
  {
    path: `/${basename}/events`,
    name: `${basename}-events`,
    text: `Events`,
    component: Events
  }
];
