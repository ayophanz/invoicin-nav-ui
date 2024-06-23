import axios from "../plugins/axios.ts";
import { defineStore } from "pinia";
import { EncryptStorage } from "encrypt-storage";
import { MeState } from "../types/meState.ts";

export const useAccountStore = defineStore("account", {
  state: () => ({
    _me: {} as MeState,
    _otpRequired: false as boolean,
    _token: "" as string,
  }),
  actions: {
    setLogin(token: string) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    setLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("@me:shared_me_state");
      axios.defaults.headers.common.Authorization = "";
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
    setMe(data: MeState) {
      const encrypt = new EncryptStorage("G!KLH5J4E=A@", { prefix: "@me" });
      encrypt.setItem("shared_me_state", data);
      this._me = data;
    },
  },
  getters: {
    getIsAuthenticated() {
      return !!localStorage.getItem("token");
    },
    getIsOtpRequired(): boolean {
      return this._otpRequired;
    },
    getOtpUserId(): string {
      return localStorage.getItem("2fa_token") ?? "";
    },
    getMe(): MeState {
      return this._me;
    },
  },
});
