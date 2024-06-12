import { defineStore } from "pinia";
import { EncryptStorage } from "encrypt-storage";

export const useAccountStore = defineStore("account", {
  state: () => ({
    _me: [],
    _otpRequired: false,
  }),
  actions: {
    setLogin(token: string) {
      localStorage.setItem("token", token);
      (
        window as any
      ).axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    setLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("@me:shared_me_state");
      (window as any).axios.defaults.headers.common.Authorization = "";
    },
    setOtpRequired() {
      this._otpRequired = true;
    },
    setOtpUserId(user_id: string) {
      localStorage.setItem("2fa_token", user_id);
    },
    setRemoveOtpUserId() {
      localStorage.removeItem("2fa_token");
    },
    setMe(data: object) {
      const encrypt = new EncryptStorage("G!KLH5J4E=A@", { prefix: "@me" });
      encrypt.setItem("shared_me_state", data);
      this._me = data;
    },
  },
  getters: {
    getIsAuthenticated() {
      return !!localStorage.getItem("token");
    },
    getIsOtpRequired() {
      return this._otpRequired;
    },
    getOtpUserId() {
      return localStorage.getItem("2fa_token");
    },
    getMe() {
      return this._me;
    },
  },
});
