import accountService from '../services/account';
import { useAccountStore } from '../stores/account';
import { storeToRefs } from 'pinia';

const beforeEach = async (to, from, next) => {
    const accountStore = useAccountStore();
    const { getOtpUserId } = storeToRefs(accountStore);
    
    let auth = false;
    await accountService.authCheck()
    .then(async (res) => {
        if (res.data.isAuth) auth = true;
    });

    if (auth) await accountService.me();
    
    if (auth && (to.name === 'twofa' || to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword' || to.name === 'sessionExpired')) {
        next({ name: 'main' });
    } else if ((!auth && getOtpUserId === null && to.name === 'twofa') || (!auth && to.name === 'main')) {
        next({ name: 'login' });
    } else {
        next();
    }
}

export default {
    beforeEach,
}