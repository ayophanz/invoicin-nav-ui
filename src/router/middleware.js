import accountService from '../services/account';

const beforeEach = async (to, from, next) => {
    let auth = false;
    await accountService.authCheck()
    .then((res) => {
        if (res.data.isAuth) auth = true;
    });

    if (auth && (to.name === 'twofa' || to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword' || to.name === 'sessionExpired')) {
        return next({ name: 'dashboard' });
    }

    console.log('from');
    console.log(from);

    if (!auth && from.name !== 'login' && to.name === 'twofa') {
        return next({ name: 'login' });
    }
    
    if (!auth && to.name !== 'login' && to.name !== 'twofa' && to.name !== 'register') {
        return next({ name: 'login' });
    }

    return next();
}

export default {
    beforeEach,
}