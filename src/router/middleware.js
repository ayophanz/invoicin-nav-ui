import accountService from '../services/account';

const beforeEach = (to, from, next) => {
    console.log(to.name);
    if (localStorage.getItem("2fa_token") === null && to.name === 'twofa')
        window.history.replaceState({}, '', `${window.location.origin}/login`);

    else if (localStorage.getItem("id_token") === null && to.meta.auth == true)
        window.history.replaceState({}, '', `${window.location.origin}/login`);

    if (to.meta.auth == false) {
        accountService.authCheck()
        .then((res) => {
            if (res.data.isAuth && to.meta.auth == false)
                window.history.replaceState({}, '', `${window.location.origin}`);
        });
    }

    next();
}

export default {
    beforeEach,
}