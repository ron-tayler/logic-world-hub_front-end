import {Actions, Getters, Module, Mutations} from "vuex-smart-module";
import axios from "axios";
import {
    IAuthor, IIssue, IIssueMinimal, IIssuePost, IModMinimal, ISchemaMod, ITag, IVersion,
    Author, Issue, IssueMinimal, IssuePost, ModMinimal, SchemaMod, Tag, Version
} from "@/store/schemes/Mod";
import * as IO from "io-ts"

class ModsState {
    mods: IModMinimal[] = []
    mod: ISchemaMod|null = null
    images: string[] = []
    versions: IVersion[] = []
    authors: IAuthor[] = []
    tags: ITag[] = []
    issues: IIssue[] = []
    issue: IIssueMinimal|null = null
    issuePosts : IIssuePost[] = []
    readme: string = ""
    change_log: string = ""
}

class ModsGetters extends Getters<ModsState> {

}

class ModsMutations extends Mutations<ModsState> {
    saveModsByLoad(mods: IModMinimal[]){
        this.state.mods = mods
    }
    saveModByLoad(mod: ISchemaMod){
        this.state.mod = mod
    }
    saveTagsByLoad(tags: ITag[]){
        this.state.tags = tags
    }
    saveImagesByLoad(images: string[]){
        this.state.images = images
    }
    saveVersionsByLoad(versions: IVersion[]){
        this.state.versions = versions
    }
    saveAuthorsByLoad(authors: IAuthor[]){
        this.state.authors = authors
    }
    saveReadmeByLoad(readme: string){
        this.state.readme = readme
    }
    saveChangeLogByLoad(change_log: string){
        this.state.change_log = change_log
    }
    saveIssuesByLoad(issues: IIssue[]){
        this.state.issues = issues
    }
    saveIssueByLoad(issue: IIssueMinimal){
        this.state.issue = issue
    }
    saveIssuePostsByLoad(posts: IIssuePost[]){
        this.state.issuePosts = posts
    }
}

class ModsActions extends Actions<ModsState, ModsGetters, ModsMutations, ModsActions> {
    async getModsMostDownloads(){
        return axios
            .get("http://localhost:3000/api/v1/mods/most-downloaded")
            .then((response)=>{
                const result = IO.array(ModMinimal).decode(response.data)
                if(result._tag == "Left") return;
                const mods = result.right
                this.commit("saveModsByLoad",mods)
            })
    }
    async getModsNews(){
        return axios
            .get("http://localhost:3000/api/v1/mods/news")
            .then((response)=>{
                const result = IO.array(ModMinimal).decode(response.data)
                if(result._tag == "Left") return;
                const mods = result.right
                this.commit("saveModsByLoad",mods)
            })
    }
    async getModsRecentlyUpdated(){
        return axios
            .get("http://localhost:3000/api/v1/mods/recently-updated")
            .then((response)=>{
                const result = IO.array(ModMinimal).decode(response.data)
                if(result._tag == "Left") return;
                const mods = result.right
                this.commit("saveModsByLoad",mods)
            })
    }

    async getMod(mod_id: number){
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}`)
            .then(response=>{
                const result = SchemaMod.decode(response.data)
                if(result._tag == "Left") {
                    console.log(result.left)
                    return
                }
                const mod = result.right
                this.commit("saveModByLoad",mod)
            })
    }
    async getTags(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/tags`)
            .then(response=>{
                const result = IO.array(Tag).decode(response.data)
                if(result._tag == "Left") return;
                const tags = result.right
                this.commit("saveTagsByLoad",tags)
            })
    }
    async getImages(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/images`)
            .then(response=>{
                const result = IO.array(IO.string).decode(response.data)
                if(result._tag == "Left") return;
                const images = result.right
                this.commit("saveImagesByLoad",images)
            })
    }
    async getVersions(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/versions`)
            .then(response=>{
                const result = IO.array(Version).decode(response.data)
                if(result._tag == "Left") return;
                const versions = result.right
                this.commit("saveVersionsByLoad",versions)
            })
    }
    async getAuthors(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/authors`)
            .then(response=>{
                const result = IO.array(Author).decode(response.data)
                if(result._tag == "Left") return;
                const authors = result.right
                this.commit("saveAuthorsByLoad",authors)
            })
    }
    async getReadme(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/readme`)
            .then(response=>{
                const result = IO.string.decode(response.data)
                if(result._tag == "Left") return;
                const readme = result.right
                this.commit("saveReadmeByLoad",readme)
            })
    }
    async getChangeLog(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/change-log`)
            .then(response=>{
                const result = IO.string.decode(response.data)
                if(result._tag == "Left") return;
                const change_log = result.right
                this.commit("saveChangeLogByLoad",change_log)
            })
    }
    async getIssues(){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/issues`)
            .then(response=>{
                const result = IO.array(Issue).decode(response.data)
                if(result._tag == "Left") return;
                const issues = result.right
                this.commit("saveIssuesByLoad",issues)
            })
    }
    async getIssue(issue_id: number){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .get(`http://localhost:3000/api/v1/mods/mod/${mod_id}/issue/${issue_id}`)
            .then(response=>{
                const result = IO.type({
                    issue: IssueMinimal,
                    posts: IO.array(IssuePost)
                }).decode(response.data)
                if(result._tag == "Left") return;
                const issue = result.right
                this.commit("saveIssueByLoad",issue.issue)
                this.commit("saveIssuePostsByLoad",issue.posts)
            })
    }

    async createIssue(params: {name: string, type: number, text: string}){
        const mod_id = this.state.mod?.id ?? 0
        if(mod_id == 0) return;
        return axios
            .post(`http://localhost:3000/api/v1/mods/mod/${mod_id}/issue/create`,params)
    }
    async sendPost(text: string){
        const issue_id = this.state.issue?.id ?? 0
        if(issue_id == 0) return;
        return axios
            .post(`http://localhost:3000/api/v1/mods/mod/issue/${issue_id}/post/send`,{text})
            .then(() => this.dispatch("getIssue",issue_id))
    }
}

export const mods = new Module({
    state: ModsState,
    getters: ModsGetters,
    mutations: ModsMutations,
    actions: ModsActions,
});
