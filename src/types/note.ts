import { ReactNode } from "react";
import { Note } from "../database/userQueries";

export type noteType  = {
    user:number,
    setUser: React.Dispatch<React.SetStateAction<number>>,
    allnote: Note[],
    visible:boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    hideModal: ()=> void,
    headModal:string,
    setHeadModal:React.Dispatch<React.SetStateAction<string>>,
} | null;
