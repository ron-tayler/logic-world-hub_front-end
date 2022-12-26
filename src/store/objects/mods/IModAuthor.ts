import {EnumModAuthorRole} from "@/store/objects/mods/EnumModAuthorRole";

export interface IModAuthor {
    id: number
    nick: string
    avatar: string
    type: EnumModAuthorRole
}