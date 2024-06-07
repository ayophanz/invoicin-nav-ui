const beforeEach = (to, from, next) => {
    console.log(to.name);
    
    if (localStorage.getItem("2fa_token") === null && to.name === 'twofa') {
        if (localStorage.getItem("id_token") === null) return next({ name: 'main' }); 
        else return next({name: 'login'});
    }
    else if (localStorage.getItem("id_token") === null && to.meta.auth == true)
        return next({name: 'login'});
    else return next();
}

export default {
    beforeEach,
}