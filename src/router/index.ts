import { createRouter, createWebHistory } from "vue-router";
import middleware from "./middleware.ts";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import SessionExpired from "../views/SessionExpired.vue";
import TwoFA from "../views/TwoFA.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import Invitation from "../views/Invitation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: ["/organization/:pathMatch(.*)*", "/customer/:pathMatch(.*)*"],
      name: "main",
      component: Main,
      meta: {
        auth: true,
      },
    },
    {
      path: "/invitation/:token",
      name: "invitation",
      component: Invitation,
      meta: {
        auth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: "/session-expired",
      name: "sessionExpired",
      component: SessionExpired,
      meta: {
        auth: false,
      },
    },
    {
      path: "/2fa",
      name: "twofa",
      component: TwoFA,
      meta: {
        auth: false,
      },
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: ForgotPassword,
      meta: {
        auth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach(middleware.beforeEach as any);

export default router;
