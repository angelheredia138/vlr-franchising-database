import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "./views/Home.vue";
import RegionPage from "./views/RegionPage.vue";
import TeamPage from "./views/TeamPage.vue";
import PlayerPage from "./views/PlayerPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/region/:region",
    name: "RegionPage",
    component: RegionPage,
    props: true,
  },
  { path: "/team/:id", name: "TeamPage", component: TeamPage, props: true },
  {
    path: "/player/:id",
    name: "player",
    component: PlayerPage,
  },
];

const router = createRouter({
  history: createWebHistory("/vlr-franchising-database/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top of the page on every navigation
    return { top: 0 };
  },
});

export default router;
