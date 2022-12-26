import {RouteConfig} from "vue-router";
import ModPage, {EnumTabs} from "@/views/ModPage.vue";
import ModListPage from "@/views/ModListPage.vue";
import TheMain from "@/components/ModPage/TheMain.vue";
import TheChangeList from "@/components/ModPage/TheChangeList.vue";
import TheVersions from "@/components/ModPage/TheVersions.vue";
import TheIssues from "@/components/ModPage/TheIssues.vue";
import TheMetrics from "@/components/ModPage/TheMetrics.vue";
import TheIssue from "@/components/ModPage/TheIssue.vue";

export const mods: RouteConfig = {
    path: "/mods",
    name: "Mods",
    component: ModListPage
}

export const mod: RouteConfig = {
    path: "/mod/:id",
    component: ModPage,
    children:[
        {
            path: "",
            name: "Mod",
            component: TheMain,
            meta:{tab: EnumTabs.MAIN}
        },{
            path: "change-list",
            name: "Mod__ChangeList",
            component: TheChangeList,
            meta:{tab: EnumTabs.CHANGE_LIST}
        },{
            path: "versions",
            name: "Mod__Versions",
            component: TheVersions,
            meta:{tab: EnumTabs.VERSIONS}
        },{
            path: "issues",
            name: "Mod__Issues",
            component: TheIssues,
            meta:{tab: EnumTabs.ISSUES}
        },{
            path: "metrics",
            name: "Mod__Metrics",
            component: TheMetrics,
            meta:{tab: EnumTabs.METRICS}
        },{
            path: "issue/:issue_id",
            name: "Mod__Issue",
            component: TheIssue,
            meta:{tab: EnumTabs.ISSUES}
        }
    ]
}