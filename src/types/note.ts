import { Note } from "../database/userQueries";

export type noteType  = {
    user:number,
    setUser: React.Dispatch<React.SetStateAction<number>>,
    allnote: Note[]
} | null;
