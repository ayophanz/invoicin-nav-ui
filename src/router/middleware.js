import accountService from '../services/account';

const beforeEach = async (to, from, next) => {
    const twofaToken = localStorage.getItem('2fa_token');
    
    let auth = false;
    await accountService.authCheck()
    .then(async (res) => {
        if (res.data.isAuth) auth = true;
    });

    if (auth) await accountService.me();
    
    if (auth && (to.name === 'twofa' || to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword' || to.name === 'sessionExpired')) {
        next({ name: 'main' });
    } else if ((!auth && twofaToken === null && to.name === 'twofa') || (!auth && to.name === 'main')) {
        next({ name: 'login' });
    } else {
        next();
    }
}

export default {
    beforeEach,
}