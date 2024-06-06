import { defineStore } from "pinia";
import { EncryptStorage } from "encrypt-storage";

export const useAccountStore = defineStore("account", {
  state: () => ({
    _me: [],
    _otpRequired: false,
  }),
  actions: {
    setLogin(token: string) {
      localStorage.removeItem("expired_at");
      localStorage.setItem("id_token", token);
      (
        window as any
      ).axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    setLogout() {
      localStorage.removeItem("expired_at");
      localStorage.removeItem("id_token");
      localStorage.removeItem("@me:sharedMeState");
      (window as any).axios.defaults.headers.common.Authorization = "";
    },
    setRefreshToken(token: string) {
      useAccountStore().setLogout();
      useAccountStore().setLogin(token);
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
      const encryptMe = new EncryptStorage("G!KLH5J4E=A@", {
        prefix: "@me",
      });
      encryptMe.setItem("sharedMeState", data);
      this._me = data;
    },
  },
  getters: {
    getIsAuthenticated() {
      return !!localStorage.getItem("id_token");
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
