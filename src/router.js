import Vue from "vue";
import Router from "vue-router";
import Demo from "@/components/Demo";
import Map from "@/components/Map";
import OwnerPage1 from "@/components/OwnerPage1";
import OwnerPage2 from "@/components/OwnerPage2";
import UserMyPage from "@/components/UserMyPage";
import OwnerMyPage from "@/components/OwnerMyPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      children: [
        // Dashboard
        {
          name: "Dashboard",
          path: "",
          component: () => import("@/views/dashboard/Dashboard")
        },
        // Pages
        {
          name: "User Profile",
          path: "pages/user",
          component: () => import("@/views/dashboard/pages/UserProfile")
        },
        {
          name: "Timeline",
          path: "pages/timeline",
          component: () => import("@/views/dashboard/pages/Timeline")
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/dashboard/component/Notifications")
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/dashboard/component/Icons")
        },
        {
          name: "Typography",
          path: "components/typography",
          component: () => import("@/views/dashboard/component/Typography")
        },
        {
          name: "Buttons",
          path: "components/buttons",
          component: () => import("@/views/dashboard/component/Buttons")
        },
        // Tables
        {
          name: "Regular Tables",
          path: "tables/regular-tables",
          component: () => import("@/views/dashboard/tables/RegularTables")
        },
        // Maps
        {
          name: "Google Maps",
          path: "maps/google-maps",
          component: () => import("@/views/dashboard/maps/GoogleMaps")
        },
        // Upgrade
        {
          name: "Upgrade",
          path: "upgrade",
          component: () => import("@/views/dashboard/Upgrade")
        }
      ]
    },
    {
      path: "/demo",
      name: "Demo",
      component: Demo
    },
    {
      path: "/map",
      name: "Map",
      component: Map
    },
    {
      path: "/ownerPage2/:storeName",
      name: "OwnerPage2",
      component: OwnerPage2
    },
    {
      path: "/ownerPage1/:storeName",
      name: "OwnerPage1",
      component: OwnerPage1
    },
    {
      path: "/userMyPage",
      name: "UserMyPage",
      component: UserMyPage
    },
    {
      path: "/ownerMyPage",
      name: "OwnerMyPage",
      component: OwnerMyPage
    }
  ]
});
