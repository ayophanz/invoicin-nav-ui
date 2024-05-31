import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
    state: () => ({ 
        _me: [],
        _otpRequired: false,
    }),
    actions: {
        login(token: string) {
            localStorage.removeItem('expired_at');
            localStorage.setItem('id_token', token);
            (window as any).axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        },
        logout() {
            localStorage.removeItem('expired_at');
            localStorage.removeItem('id_token');
            (window as any).axios.defaults.headers.common.Authorization = '';
        },
        refreshToken(token: string) {
            useAccountStore().logout();
            useAccountStore().login(token);
        },
        sessionExpired() {
            localStorage.setItem('expired_at', new Date().toString());
        },
        otpRequired() {
            this._otpRequired = true;
        },
        otpUserId(user_id: string) {
            localStorage.setItem('2fa_token', user_id);
        },
        removeOtpUserId() {
            localStorage.removeItem('2fa_token');
        },
        me(data: object) {
            this._me = data;
        },
    },
    getters: {
        getIsAuthenticated() {
            return !!localStorage.getItem('id_token');
        },
        getIsOtpRequired() {
            return this._otpRequired;
        },
        getOtpUserId() {
            return localStorage.getItem('2fa_token');
        },
        getMe() {
            return this._me;
        }
    },
});