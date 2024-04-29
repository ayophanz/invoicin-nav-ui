import accountService from '../services/account';
import { useAccountStore } from '../stores/account';
import { storeToRefs } from 'pinia';

const beforeEach = async (to, from, next) => {
    const accountStore = useAccountStore();
    const { getOtpUserId } = storeToRefs(accountStore);
    
    await accountService.authCheck()
    .then(async (res) => {
        if (res.data.isAuth) {
            await accountService.me();
            if (to.name === 'twofa' || to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword' || to.name === 'sessionExpired')
                window.history.replaceState({}, '', window.location.origin);
        } else {
            if ((getOtpUserId === null && to.name === 'twofa') || to.name === 'main')
                window.history.replaceState({}, '', `${window.location.origin}/login`);
        }
    });

    next();
}

export default {
    beforeEach,
}