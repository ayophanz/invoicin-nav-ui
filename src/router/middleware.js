// import { useAccountStore } from './../stores/account';
// import accountService from '../services/account';

const beforeEach = (to, from, next) => {
    // const hasToken     = !!localStorage.getItem('id_token');
    // const expiredToken = localStorage.getItem('expired_at');

    // if (to.meta.auth) {
    //     accountService.me();
    // } else {
    //     console.log(expiredToken);
    //     //if (expiredToken === null) {
    //         return next({ name: 'login' });
    //     //}//
    // }

    return next();
}

export default {
    beforeEach,
}