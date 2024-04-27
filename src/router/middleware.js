import accountService from '../services/account';
import { useAccountStore } from '../stores/account';
import { storeToRefs } from 'pinia';

const beforeEach = (to, from, next) => {
    const accountStore = useAccountStore();
    const { getOtpUserId } = storeToRefs(accountStore);
    
    let auth = false;
    accountService.authCheck()
    .then((res) => {
        if (res.data.isAuth) {
            accountService.me();
            if (to.name === 'twofa' || to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword' || to.name === 'sessionExpired') 
                return next({ name: 'main' });
        } else {
            if ((getOtpUserId === null && to.name === 'twofa') || (!auth && to.name === 'main')) 
                return next({ name: 'login' });
        }
    });
    
    return next();
}

export default {
    beforeEach,
}