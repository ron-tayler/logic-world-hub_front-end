import {DefaultAPIInstance} from "@/api/AxiosInstances";

export function getMods(){
    DefaultAPIInstance
        .get("/api/mods")
        .then(response => {

        })
}