import { auth, db } from "@firebase/firebase"
import { child, DatabaseReference, DataSnapshot, get, set, remove, onValue, push, Query, ref, onDisconnect, update } from "firebase/database"
import { type User, onAuthStateChanged, signOut } from "firebase/auth"

import { type User as ProfUser } from "@/pages/components/Profile/User.type"
import { StaticImageData } from "next/image"
import { Board as BoardType } from "@/pages/boards/Board.type"

type SnapshotCB = (snapshot:DataSnapshot)=>void


//variables
    const boardPath = "/boards"
    const usersPath = "/users"
    const chatPath = "/chat"
    const boardMovesPath = "/board"
    const boardTurnPath = "/turn"
    const boardWinPath = "/win"

//refs
    const userIDRef = <T extends ProfUser | undefined>(user:T)=>ref(db, usersPath + "/" + user?.uid )
    const userBoardIDRef = <T extends string>(BoardID :T, uid : T) => ref(db, boardPath + "/" + BoardID + usersPath + "/" + uid)
    const boardIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID)
    const chatIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + chatPath)
    const winBoardIDRef = <T extends string>(BoardID : T) => ref(db, boardPath + "/" + BoardID  + boardWinPath)
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
    const OnDisconnectMenu =  <T extends ProfUser | undefined>(fn:(user:T)=>DatabaseReference) => async (user:T) => await onDisconnect(fn(user)).remove()
    const OnDisconnectBoardID = (fn:(BoardID:string, uid:string)=>DatabaseReference) => async (BoardID : string, uid :string) => await onDisconnect(fn(BoardID, uid)).remove()

    //Auth utilities
    const utilSignOut = () => signOut(auth)
    const utilSignOutRemoveUser = async <T extends (u:ProfUser|undefined)=>DatabaseReference>(fn:T) => async <T extends ProfUser|undefined>(u:T, value:unknown) => await set(fn(u), value)
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
    const getOpponent = <T extends string>(name:T) =>{
        //returns the lobbies with the specified names
        const isNameEqual = <T extends string | undefined>(arg1:T, arg2: T) =>{
            const regex = /(.*) (.*)/i
            // console.log(arg1, arg2)
            if(!arg1 || !arg2) return
            const match = arg1.match(regex)
            const match2 = arg2.match(regex)
           
            // console.log("Is name equal match " +match)
            if(!match || !match2) return
            
            if(match[1] == match2[1]) return true
            if(match[1] == match2[2]) return true
            if(match[2] == match2[1]) return true
            if(match[2] == match2[2]) return true
        }

        const areNamesEqual = (arg1:string, array:string[] | undefined) =>{
            const regex = /(.*) (.*)/i
            const match = arg1.match(regex)
            // console.log(arg1)
            // console.log("Arenames equal match " + match)
            if(!array)return
            // console.log(arg1)
            
            return array.some(name=>{
                
                const match2 = name.match(regex)
                if(!match || !match2)return
                if(match[1] == match2[1]) return true
                if(match[1] == match2[2]) return true
                if(match[2] == match2[1]) return true
                if(match[2] == match2[2]) return true
            })
        }
        return get(lobbyRef).then(boards=>{
            let lobbies : string[] = []
            boards.forEach((board)=>{
                // getUserRef(board.val().player1).then(user => user.val().displayName)
                if(isNameEqual(board.val().player1, name) || isNameEqual(board.val().player2,name) || areNamesEqual(name, board.val().spectators)){
                    //push the lobby keys into arrayy
                    console.log("In IF")
                    lobbies.push(board.key)
                }
            })

            return lobbies
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
    const pushUserIntoLobby = (fn:(lobbyKey:string, uid:string )=>DatabaseReference)=> (lobbyKey:string, user:ProfUser | undefined) => {
        // console.log(user, lobbyKey)
        if(user)
        return set(fn(lobbyKey, user.uid), user.displayName)
    }

    //RemoveDB
    const removeUserMenu =  <T extends (user:ProfUser | undefined)=>DatabaseReference>(fn:T) => async <T extends ProfUser>(user:T) => await remove(fn(user))
    const removeUserBoardID = async <T extends string>(BoardID:T, uid:T) => {await remove( userBoardIDRef(BoardID, uid))}

    //SetDB
    const setUser = <T extends (user:ProfUser)=>DatabaseReference>(fn:T) => async (user : ProfUser, args : {displayName:string, photo:string | StaticImageData, email:string}) => await set(fn(user), args)
    const setMove = <T extends ((BoardID:string)=>DatabaseReference)>(fn:T)=> (BoardID :string, values:string[][]) => set(fn(BoardID), values )
    const setTurn = <T extends (BoardID:string)=>DatabaseReference>(fn:T) => async<T extends string, G extends string>(BoardID : T, turn : G) => await set(fn(BoardID), turn)
    const setWin = <T extends ((BoardID:string)=>DatabaseReference)>(fn:T) => async <T extends string, G extends boolean>(BoardID : T, win : G) => await set(fn(BoardID), win)

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
        getOpenLobby,
        getOpponent
    }

    const SetDB = {

        setUser: setUser(userIDRef),
        setMove: setMove(boardIDMovesRef),
        setTurn: setTurn(boardTurnRef),
        setWin : setWin(winBoardIDRef)
        
    }

    const DisconnectDB = {
        MenuDC : OnDisconnectMenu(userIDRef),
        BoardDC : OnDisconnectBoardID(userBoardIDRef)
    }

    const PushDB = {
        pushMenuChat : pushChat(chatMenuRef),
        pushBoardIDChat : pushBoardIDChat(chatIDRef),
        pushPlayerIntoLobby,
        pushUserIntoLobby : pushUserIntoLobby(userBoardIDRef)
    }

    const RemoveDB = {
        removeUserBoardID,
        removeUserMenu: removeUserMenu(userIDRef)
    }

    const OnValueDB = {
        chatOnValue : OnValue(chatMenuRef),
        usersOnValue: OnValue(userRef),
        chatBoardIDOnValue : IDOnValue(chatIDRef),
        boardOnValue: IDOnValue(boardIDRef),
        boardIDMovesOnValue : IDOnValue(boardIDMovesRef),
        boardIDWin : IDOnValue(winBoardIDRef)
   }

export {createBoardID, AuthUtil, RefUtil, GetDB, OnValueDB, PushDB, SetDB, RemoveDB, DisconnectDB}