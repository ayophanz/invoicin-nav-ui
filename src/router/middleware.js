import accountService from '../services/account';

const beforeEach = async (to, from, next) => {
    // const hasToken     = !!localStorage.getItem('id_token');
    // const expiredToken = localStorage.getItem('expired_at');

    if (to.meta.auth) await accountService.me();
    else return next({ name: 'login' });

    return next();
}

export default {
    beforeEach,
}