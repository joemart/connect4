import { db } from "@firebase/firebase"
import { get, push, ref } from "firebase/database"

//variables
const boardPath = "/boards"

//functions

//Create boardID 
const createBoardID = <T extends string | undefined>(uid:T) =>push(ref(db, boardPath), {player: uid}).key

export {createBoardID}