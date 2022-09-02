import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
    state: () => ({ 
        _me: [],
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
        me(data) {
            this._me = data;
        },
    },
    getters: {
        getIsAuthenticated() {
            return !!localStorage.getItem('id_token');
        },
        getMe() {
            return this._me;
        }
    },
});