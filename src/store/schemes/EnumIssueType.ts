import * as IO from "io-ts"

export enum EnumIssueType {
    GENERAL,
    BUGS,
    ANNOUNCEMENTS,
    IDEAS,
}

export const IOEnumIssueType = new IO.Type<EnumIssueType,number>(
    "EnumIssueType",
    (input):input is EnumIssueType=>{
        if(typeof input != "number") return false
        return EnumIssueType[input] != undefined
    },
    (input,context)=>{
        if(typeof input != "number") return IO.failure(input,context)
        if(EnumIssueType[input] == undefined ) return IO.failure(input,context)
        return IO.success(input as EnumIssueType)
    },
    IO.identity
)