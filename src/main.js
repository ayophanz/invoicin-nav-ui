import { createApp, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import axios from './plugins/axios';
import singleSpaVue from 'single-spa-vue';
import floatingVue from 'floating-vue';
import Toast from "vue-toastification";

import './style.css';
import 'floating-vue/dist/style.css';
import "vue-toastification/dist/index.css";

// import Echo from "laravel-echo";

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'a699e23cd2d7d25358a2',
//   wsHost: window.location.hostname,
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
// });

const toastOptions = {
  // You can set your default options here
};

const pinia = createPinia();
const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
      render() {
        return h(App, {
          props: {
            // single-spa props are available on the "this" object. Forward them to your component as needed.
            // https://single-spa.js.org/docs/building-applications#lifecyle-props
            name: this.name,
            mountParcel: this.mountParcel,
            singleSpa: this.singleSpa,
          },
        });
      },
    },
    handleInstance: (app) => {
        app.use(pinia);
        app.use(router);
        app.use(floatingVue);
        app.use(Toast, toastOptions);
        axios.defaults.baseURL = import.meta.env.VITE_API_URL;
        axios.defaults.headers.common.Accept = 'application/json';
        window.axios = axios;
    },
});

export const { bootstrap } = vueLifecycles;
export const { mount } = vueLifecycles;
export const { unmount } = vueLifecycles;