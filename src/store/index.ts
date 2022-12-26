import Vue from "vue";
import Vuex from "vuex";
import { createStore, Module } from "vuex-smart-module";
import { user } from "./modules/user";
import { mods } from "./modules/mods";

Vue.use(Vuex);

const root = new Module({
    modules: {
        user,
        mods
    },
});

export const store = createStore(root, {
    strict: true,
});

export const RootCtx = root.context(store);
export const UserCtx = user.context(store);
export const ModsCtx = mods.context(store);
