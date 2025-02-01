import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import StatsView from "../views/StatsView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: ScheduleView,
  },
  {
    path: "/stats",
    name: "stats",
    component: StatsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
