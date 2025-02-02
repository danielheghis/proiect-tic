import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import StatsView from "../views/StatsView.vue";
import PlayerDetails from "../views/PlayerDetails.vue";
import AddNewPlayer from "@/views/AddNewPlayer.vue";
import MatchScheduledDetails from "@/views/MatchScheduledDetails.vue";
import MatchFinishedDetails from "@/views/MatchFinishedDetails.vue";

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
  {
    path: "/players/:id/details",
    name: "player-details",
    component: PlayerDetails,
  },
  {
    path: "/players/sign",
    name: "player-sign",
    component: AddNewPlayer,
  },
  {
    path: "/players/sign",
    name: "player-sign",
    component: AddNewPlayer,
  },
  {
    path: "/matches/scheduled/details/:id",
    name: "match-details-scheduled",
    component: MatchScheduledDetails,
  },
  {
    path: "/matches/finished/details/:id",
    name: "match-details-finished",
    component: MatchFinishedDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
