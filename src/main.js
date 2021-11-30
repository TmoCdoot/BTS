import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "chartkick/chart.js";
import Chartkick from 'vue-chartkick';


createApp(App).use(store).use(router).use(Chartkick).mount("#app");
