export interface IModIssueMinimal {
    id: number
    name: string
    type: number
    author: {
        id: number
        nick: string
    }
    createDate: Date
    posts: number,
    last_post_author:{
        id: number
        nick: string
    },
    last_post_createDate: Date
}