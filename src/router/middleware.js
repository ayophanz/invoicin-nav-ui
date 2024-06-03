import accountService from '../services/account';
import { useAccountStore } from '../stores/account';
import { storeToRefs } from 'pinia';

const beforeEach = (to, from, next) => {
    const accountStore = useAccountStore();
    const { getOtpUserId, getIsAuthenticated } = storeToRefs(accountStore);
    
    accountService.authCheck()
    .then((res) => {
        if (res.data.isAuth) {
        // if (getIsAuthenticated) {
            if (to.meta.auth == false)
                window.history.replaceState({}, '', window.location.origin);
        } else {
            if ((getOtpUserId === null && to.name === 'twofa') || to.meta.auth == true)
                window.history.replaceState({}, '', `${window.location.origin}/login`);
        }
    });

    next();
}

export default {
    beforeEach,
}