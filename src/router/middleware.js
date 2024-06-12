const beforeEach = (to, from, next) => {
    console.log(to.name);
    
    if (((localStorage.getItem("2fa_token") == null && to.name == 'twofa') ||
        (localStorage.getItem("token") == null && to.meta.auth === true)) && to.name != 'login') {
            localStorage.removeItem("@me:shared_me_state");
            window.axios.defaults.headers.common.Authorization = "";
            next({name: 'login'});
    }
    else if (localStorage.getItem("token") != null && to.meta.auth === false && to.name != 'main')
        next({name: 'main'});
    else 
        next();
}

export default {
    beforeEach,
}