import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import {mod, mods} from "@/router/mods";
import UserPage from "@/views/UserPage.vue";

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
    "/not-found"
]

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    mods,
    mod,
    {
        path: "/user/:user_id",
        name: "User",
        component: UserPage
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFoundPage
    }
];

const router = new VueRouter({
    mode: `history`,
    routes,
});

export default router;
