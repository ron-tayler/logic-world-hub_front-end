import {IModAuthor} from "@/store/objects/mods/IModAuthor";
import {IModTag} from "@/store/objects/mods/IModTag";
import {IModIssue} from "@/store/objects/mods/IModIssue";
import {IModVersionMinimal} from "@/store/objects/mods/IModVersionMinimal";

export interface IMod {
    id: number
    avatar: string
    images: string[]
    name: string
    description: string
    readme: string
    changeLog: string
    repository: string
    docs_url: string
    collection_id: number
    createDate: Date
    views: number
    downloads: number
    favorites: number
    subscribers: number
    versions: IModVersionMinimal[]
    authors: IModAuthor[]
    tags: IModTag[]
}