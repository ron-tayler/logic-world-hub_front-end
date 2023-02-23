import IO from "io-ts"

const mod = IO.type({
    id: IO.number,
    avatar: IO.string,
    images: IO.array(IO.string),
    name: IO.string,
    description: IO.string
})