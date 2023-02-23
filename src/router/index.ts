import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import { mod, mods } from "@/router/mods";
import UserPage from "@/views/UserPage.vue";
import WorldListPage from "@/views/WorldListPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import { UserCtx } from "@/store";
import ProfilePage from "@/views/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import TestPage from "@/views/TestPage.vue";

Vue.use(VueRouter);

const todo = [
    "/",
    "/mods",
    "/mods/max-downloads?tags=chips,lang,interface,display",
    "/mods/rating?q=potato%20chips",
    "/mod/1/fox-chips",
    "/add-mod",
    "/mods-collection/1/bobs",
    "/mods-list/2/bob-and-angel",
    "/favorites",
    "/notifications",
    "/profile",
    "/worlds",
    "/world/1/8bit-pc",
    "/add-world",
    "/servers",
    "/server/1/logic-craft",
    "/add-server",
    "/login",
    "/hub-manager",
    "/not-found",
];

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    mods,
    mod,
    {
        path: "/worlds",
        name: "Worlds",
        component: WorldListPage,
    },
    {
        path: "/sign-in",
        name: "SignIn",
        component: LoginPage,
        beforeEnter(to, from, next) {
            if (UserCtx.getters.IS_AUTH()) next({ name: "Home" });
            else next();
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfilePage,
        beforeEnter(to, from, next) {
            if (!UserCtx.getters.IS_AUTH()) next({ name: "Home" });
            else next();
        },
    },
    {
        path: "/settings",
        name: "Settings",
        component: SettingsPage,
        beforeEnter(to, from, next) {
            if (!UserCtx.getters.IS_AUTH()) next({ name: "Home" });
            else next();
        },
    },
    {
        path: "/user/:user_id",
        name: "User",
        component: UserPage,
    },
    {
        path: "/test",
        name: "Test",
        component: TestPage,
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFoundPage,
    },
];

const router = new VueRouter({
    mode: `history`,
    routes,
});

export default router;
