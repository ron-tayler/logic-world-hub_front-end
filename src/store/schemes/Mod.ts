import * as IO from "io-ts"
import * as IOTypes from "io-ts-types"
import {IOEnumIssueType} from "@/store/schemes/EnumIssueType";

export const ModMinimal = IO.type({
    id: IO.number,
    name: IO.string,
    description: IO.string,
    avatar: IO.string
},"ModMinimal")
export const SchemaMod = IO.type({
    id: IO.number,
    name: IO.string,
    description: IO.string,
    avatar: IO.string,
    repository: IO.string,
    docs_url: IO.string,
    collection_id: IO.number,
    createDate: IOTypes.DateFromISOString,
    views: IO.number,
    downloads: IO.number,
    favorites: IO.number,
    subscribers: IO.number,
},"Mod")
export const Version = IO.type({
    id: IO.number,
    version: IO.string,
    game_version: IO.string,
    releaseDate: IOTypes.DateFromISOString
},"Version")
export const Author = IO.type({
    id: IO.number,
    nick: IO.string,
    type: IO.number,
    avatar: IO.string
},"Author")
export const Tag = IO.type({
    id: IO.number,
    name: IO.string
},"Tag")
export const Issue = IO.type({
    id: IO.number,
    name: IO.string,
    type: IOEnumIssueType,
    author: IO.type({
        id: IO.number,
        nick: IO.string
    }),
    createDate: IOTypes.DateFromISOString,
    posts: IO.number,
    last_post_author: IO.type({
        id: IO.number,
        nick: IO.string
    }),
    last_post_createDate: IOTypes.DateFromISOString
},"Issue")
export const IssueMinimal = IO.type({
    id: IO.number,
    name: IO.string,
    type: IOEnumIssueType,
    author: IO.type({
        id: IO.number,
        nick: IO.string
    }),
    createDate: IOTypes.DateFromISOString,
},"IssueMinimal")
export const IssuePost = IO.type({
    id: IO.number,
    createDate: IOTypes.DateFromISOString,
    author: IO.type({
        id: IO.number,
        nick: IO.string,
        avatar: IO.string,
    }),
    text: IO.string
},"IssuePost")

export type IModMinimal = IO.TypeOf<typeof ModMinimal>
export type ISchemaMod = IO.TypeOf<typeof SchemaMod>
export type IVersion = IO.TypeOf<typeof Version>
export type IAuthor = IO.TypeOf<typeof Author>
export type ITag = IO.TypeOf<typeof Tag>
export type IIssue = IO.TypeOf<typeof Issue>
export type IIssueMinimal = IO.TypeOf<typeof IssueMinimal>
export type IIssuePost = IO.TypeOf<typeof IssuePost>
