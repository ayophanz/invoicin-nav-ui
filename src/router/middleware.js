import accountService from '../services/account';
import { useAccountStore } from '../stores/account';
import { storeToRefs } from 'pinia';

const beforeEach = (to, from, next) => {
    const accountStore = useAccountStore();
    const { getOtpUserId } = storeToRefs(accountStore);
    
    accountService.authCheck()
    .then((res) => {
        if (res.data.isAuth) {
            accountService.me();
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