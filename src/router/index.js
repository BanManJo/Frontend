import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Demo from "@/components/Demo";
import AdminTest from "@/components/AdminTest";

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
    }
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
