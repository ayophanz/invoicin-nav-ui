// import { useAccountStore } from './../stores/account';
import accountService from '../services/account';

const beforeEach = async (to, from, next) => {
    // const accountStore = useAccountStore();
    // const hastToken = accountStore.getIsAuthenticated;
    const hasToken     = !!localStorage.getItem('id_token');
    const expiredToken = !!localStorage.getItem('expired_at');

    if (to.meta.auth) {
        if (!hasToken && !expiredToken) {
            return next({ name: 'login' });
        }

        await accountService.me()
        .then((response) => {
            if (!response.is_two_fa && from.name === 'login' && to.name !== 'setupTwofa') {
                return next({ name: 'setupTwofa' });
            }
            if (response.is_two_fa && to.name === 'setupTwofa') {
                return next({ name: 'dashboard' });
            }
        });

        return next();
    } 

    if (hasToken && !expiredToken && (to.name === 'login' || to.name === 'sessionExpired')) {
        return next({ name: 'dashboard' });
    } 
    if (hasToken && expiredToken && (to.name === 'login' || to.name === 'dashboard')) {
        return next({ name: 'sessionExpired' });
    }
    if (!hasToken && (to.name === 'sessionExpired')) {
        return next({ name: 'login' });
    }
    return next();
}

export default {
    beforeEach,
}