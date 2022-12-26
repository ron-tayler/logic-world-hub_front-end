import Vue from "vue";
import vue_cookies from "vue-cookies";
import gettext from "vue-gettext";
import VTooltip from "v-tooltip"
import "@/assets/style/tooltip.scss"

import App from "@/App.vue";
import router from "@/router";
import { store } from "@/store";

import "@/icons";
import { lang } from "@/lang";

Vue.config.productionTip = false;

Vue.use(vue_cookies);
Vue.use(VTooltip);
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

new Vue({
    router,
    store,
    render: (h) => h(App),
    mounted() {
        const lang: keyof typeof langCodes = this.$cookies.get("lang") ?? "en";
        this.$language.current = langCodes[lang] ?? "en_US";
    },
}).$mount("#app");
