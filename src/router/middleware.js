// import { useAccountStore } from './../stores/account';
import accountService from '../services/account';

const beforeEach = async (to, from, next) => {
    // const accountStore = useAccountStore();
    const hasToken = !!localStorage.getItem('id_token');  // accountStore.getIsAuthenticated;

    if (to.meta.auth) { // Routes that requires authentication
        if (!hasToken) {
            return next({ name: 'login' });
        } else {
            await accountService.me(); // Run every request
        }
    } else { // Guest routes
        if (hasToken && to.name === 'login') {
            return next({ name: 'dashboard' });
        } else {
            //
        }
    }

    return next();
}

export default {
    beforeEach,
}