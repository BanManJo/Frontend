import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Demo from "@/components/Demo";
import AdminTest from "@/components/AdminTest";
import Map from "@/components/Map";
import OwnerPage from "@/components/OwnerPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/demo",
      name: "Demo",
      component: Demo
    },
    {
      path: "/admin-test",
      name: "AdminTest",
      component: AdminTest
    },
    {
      path: "/map",
      name: "Map",
      component: Map
    },
    {
      path: "/ownerPage",
      name: "OwnerPage",
      component: OwnerPage
    },
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
