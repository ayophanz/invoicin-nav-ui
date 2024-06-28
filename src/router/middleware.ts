import axios from "../plugins/axios.ts";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const beforeEach = (
  to: RouteLocationNormalized,
  // from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  console.log(to.name);

  if (
    ((localStorage.getItem("2fa_token") == null && to.name == "twofa") ||
      (localStorage.getItem("token") == null && to.meta.auth === true)) &&
    to.name != "login"
  ) {
    localStorage.removeItem("@me:shared_me_state");
    axios.defaults.headers.common.Authorization = "";
    return () => {
      next({ name: "login" });
    };
  } else if (
    localStorage.getItem("token") != null &&
    to.meta.auth === false &&
    to.name != "main"
  ) {
    return () => {
      next({ name: "main" });
    };
  } else {
    return () => {
      next();
    };
  }
};

export default {
  beforeEach,
};
