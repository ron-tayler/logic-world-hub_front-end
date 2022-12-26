import {IModIssuePost} from "@/store/objects/mods/IModIssuePost";
import {EnumIModIssueType} from "@/store/objects/mods/EnumIModIssueType";

export interface IModIssue {
    id: number
    name: string
    type: EnumIModIssueType
    posts: IModIssuePost[]
}