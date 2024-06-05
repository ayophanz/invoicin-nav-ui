import accountService from '../services/account';

const beforeEach = (to, from, next) => {

    accountService.authCheck()
    .then((res) => {
        if (res.data.isAuth && to.meta.auth == false)
            next({ path: '/', replace: true });
        else if ((localStorage.getItem("2fa_token") === null && to.name === 'twofa') || to.meta.auth == true)
            next({ path: 'login', replace: true });
    });

    next();
}

export default {
    beforeEach,
}