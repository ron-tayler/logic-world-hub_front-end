export interface IModIssuePost {
    id: number
    createDate: Date
    author: {
        id: number
        nick: string
        avatar: string
    }
    text: string
}