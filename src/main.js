import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueLazyload from "vue-lazyload";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTwitch } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter, faTwitch, faLink);

const app = createApp(App);
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: "/src/assets/loading-placeholder.png", // Placeholder image
  attempt: 1,
});
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
