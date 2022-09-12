import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
    state: () => ({ 
        _me: [],
        _otpRequired: false,
        _otpSetupRequired: false,
    }),
    actions: {
        login(token) {
            localStorage.removeItem('expired_at');
            localStorage.setItem('id_token', token);
            window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        },
        logout() {
            localStorage.removeItem('expired_at');
            localStorage.removeItem('id_token');
            window.axios.defaults.headers.common.Authorization = '';
        },
        refreshToken(token) {
            useAccountStore().logout();
            useAccountStore().login(token);
        },
        sessionExpired() {
            localStorage.setItem('expired_at', new Date().toString());
        },
        otpSetupRequired(user_id) {
            localStorage.setItem('2fa:user:id', user_id);
            this._otpSetupRequired = true;
        },
        otpRequired(user_id) {
            localStorage.setItem('2fa:user:id', user_id);
            this._otpRequired = true;
        },
        removeOtpUserId() {
            localStorage.removeItem('2fa:user:id');
        },
        me(data) {
            this._me = data;
        },
    },
    getters: {
        getIsAuthenticated() {
            return !!localStorage.getItem('id_token');
        },
        getIsOtpSetupRequired() {
            return this._otpSetupRequired;
        },
        getIsOtpRequired() {
            return this._otpRequired;
        },
        getOtpUserId() {
            return localStorage.getItem('2fa:user:id');
        },
        getMe() {
            return this._me;
        }
    },
});