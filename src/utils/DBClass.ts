import { auth, db } from "@firebase/firebase"
import { child, DatabaseReference, DataSnapshot, get, set, onValue, push, Query, ref, onDisconnect, update } from "firebase/database"
import { type User, Auth, onAuthStateChanged, signOut } from "firebase/auth"
import Router from "next/router"

import { type User as ProfUser } from "@/pages/components/Profile/User.type"
import { StaticImageData } from "next/image"
import { Board as BoardType } from "@/pages/boards/Board.type"

type SnapshotCB = (snapshot:DataSnapshot)=>void

const router = Router.router

//variables
    const boardPath = "/boards"
    const usersPath = "/users"
    const chatPath = "/chat"
    const boardMovesPath = "/board"
    const boardTurnPath = "/turn"

//refs
    const userIDRef = <T extends ProfUser | null>(user:T)=>ref(db, usersPath + "/" + user?.uid )
    const boardIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID)
    const chatIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + chatPath)
    const boardIDMovesRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + boardMovesPath)
    const boardTurnRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + "/" + boardTurnPath)
    const userRef = ref(db, usersPath)
    const chatMenuRef = ref(db, chatPath)
    const lobbyRef = ref(db, boardPath)
    const usersMenuRef = ref(db, usersPath)
    
//functions
    const board = [ ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '']]
    //Create boardID
    const createBoardID = <T extends string | undefined>(uid:T) =>push(lobbyRef, {player1: uid, board, turn: "player1"}).key
    //Disconnect
    const OnDisconnectMenu = <T extends ProfUser | null>(fn:(user:T)=>DatabaseReference) => (user:T) => onDisconnect(fn(user)).remove()

    //Auth utilities
    const utilSignOut = () => signOut(auth)
    const utilSignOutRemoveUser = <T extends (u:ProfUser|null)=>DatabaseReference>(fn:T) => <T extends ProfUser|null>(u:T, value:unknown) => set(fn(u), value)
    const utilOnAuthStateChanged = <T extends (u:User|null)=>void>(fn:T) => onAuthStateChanged(auth, fn)

    //Get ID DB
    const getUserRef = <T extends string>(uid: T) => get(child(userRef, uid))
    const getBoardRef = <T extends string>(BoardID:T) => get(boardIDRef(BoardID))
    const getOpenLobby = () => {
        
        return get(lobbyRef).then((boards)=>{
            let openLobbies:DataSnapshot[] = []
            boards.forEach((board)=> {
                !board.val().player2 ? openLobbies.push(board) : null
            })
            // router?.isReady ? router?.push(boardPath + "/" + openLobbies[0].key) : null
            return openLobbies[0]
        })
    }

    //PushDB
    const pushChat = (ref:DatabaseReference) => <T extends {user : string | undefined, message: string}>(args:T) => push(ref, args)
    const pushBoardIDChat = <T extends (BoardID:string)=>DatabaseReference>(fn:T) => <T extends undefined | string | string[],G extends {user : string | undefined, message: string}>(BoardID: T, args: G) => {
        if(!BoardID || Array.isArray(BoardID)) return
        return push(fn(BoardID), args)}
    const pushPlayerIntoLobby = (lobbyKey:string, uid:string) => {
        update(child(lobbyRef, lobbyKey), {player2: uid})
    }

    //SetDB
    const setUser = <T extends (user:ProfUser)=>DatabaseReference>(fn:T) => async (user : ProfUser, args : {displayName:string, photo:string | StaticImageData, email:string}) => await set(fn(user), args)
    const setMove = <T extends ((BoardID:string)=>DatabaseReference)>(fn:T)=> (BoardID :string, values:string[][]) => set(fn(BoardID), values )
    const setTurn = <T extends (BoardID:string)=>DatabaseReference>(fn:T) => async<T extends string, G extends string>(BoardID : T, turn : G) => await set(fn(BoardID), turn)

    //onValue
    const OnValue = (ref:DatabaseReference) => (fn:SnapshotCB) => onValue(ref, fn)
    const IDOnValue = <T extends (arg:string)=>DatabaseReference>(ref:T) => <T extends string | string[] | undefined>(BoardID : T, fn:SnapshotCB) => {
        if(!BoardID || Array.isArray(BoardID))return
        return onValue(ref(BoardID), fn)}

//objects
    const AuthUtil = {
        utilSignOut,
        utilOnAuthStateChanged,
        utilSignOutRemoveUser : utilSignOutRemoveUser(userIDRef)
        }

    const RefUtil = {
        userIDRef,
        userRef
    }

    const GetDB = {
        getUserRef,
        getBoardRef,
        getOpenLobby
    }

    const SetDB = {

        setUser: setUser(userIDRef),
        setMove: setMove(boardIDMovesRef),
        setTurn: setTurn(boardTurnRef)
        
    }

    const DisconnectDB = {
        MenuDC : OnDisconnectMenu(userIDRef)
    }

    const PushDB = {
        pushMenuChat : pushChat(chatMenuRef),
        pushBoardIDChat : pushBoardIDChat(chatIDRef),
        pushPlayerIntoLobby
    }

    const OnValueDB = {
        chatOnValue : OnValue(chatMenuRef),
        usersOnValue: OnValue(userRef),
        chatBoardIDOnValue : IDOnValue(chatIDRef),
        boardOnValue: IDOnValue(boardIDRef),
        boardIDMovesOnValue : IDOnValue(boardIDMovesRef)
    }

export {createBoardID, AuthUtil, RefUtil, GetDB, OnValueDB, PushDB, SetDB, DisconnectDB}