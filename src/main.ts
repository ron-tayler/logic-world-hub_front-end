import Vue from "vue";
import vue_cookies from "vue-cookies";
import gettext from "vue-gettext";
import VTooltip from "v-tooltip";
import {
    FpjsVueOptions,
    fpjsPlugin,
} from "@fingerprintjs/fingerprintjs-pro-vue-v2";
import "@/assets/style/tooltip.scss";

import App from "@/App.vue";
import router from "@/router";
import { store, UserCtx } from "@/store";

import "@/icons";
import { lang } from "@/lang";
import api from "@/api";

Vue.config.productionTip = false;

const apiKey = "kzgfNbjVN7yqpGgGNFoS";

Vue.use(vue_cookies);
Vue.use(VTooltip);
Vue.use(fpjsPlugin, {
    loadOptions: {
        apiKey,
    },
} as FpjsVueOptions);
Vue.use(gettext, {
    translations: lang,
    availableLanguages: {
        en_US: "ENG",
        ru_RU: "RUS",
        es_ES: "ESP",
        zh_CH: "中國",
    },
    defaultLanguage: "en_US",
});

const langCodes = {
    ru: "ru_RU",
    en: "en_US",
    es: "es_ES",
    ch: "zn_CH",
};

const app = new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        const lang: keyof typeof langCodes = this.$cookies.get("lang") ?? "en";
        this.$language.current = langCodes[lang] ?? "en_US";
    },
}).$mount("#app");

let is_auth = false;

api.on("AUTH_YES", () => {
    UserCtx.actions.ON_AUTH_YES();
    is_auth = true;
});
api.on("AUTH_NO", () => {
    UserCtx.actions.ON_AUTH_NO();
    if (is_auth)
        app.$router?.push({
            name: "SignIn",
        });
    is_auth = false;
});

// @ts-ignore
window.app = app;
// @ts-ignore
window.api = api;
