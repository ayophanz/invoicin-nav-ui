import { createApp, h } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import 'floating-vue/dist/style.css';
import floatingVue from 'floating-vue';

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
        app.use(router);
        app.use(floatingVue);
    },
});

export const { bootstrap } = vueLifecycles;
export const { mount } = vueLifecycles;
export const { unmount } = vueLifecycles;