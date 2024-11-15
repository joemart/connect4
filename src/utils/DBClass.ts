import { auth, db } from "@firebase/firebase"
import { child, DatabaseReference, DataSnapshot, get, set, remove, onValue, push, Query, ref, onDisconnect, update } from "firebase/database"
import { type User, onAuthStateChanged, signOut } from "firebase/auth"

import  type ProfUser from "@/pages/components/Profile/User"
import { StaticImageData } from "next/image"

type SnapshotCB = (snapshot:DataSnapshot)=>void

//variables
    const boardPath = "/boards"
    const usersPath = "/users"
    const chatPath = "/chat"
    const boardMovesPath = "/board"
    const boardTurnPath = "/turn"
    const boardWinPath = "/winner"
    const boardSpectatorsPath = "/spectators"

//refs
    const userIDRef = <T extends ProfUser | undefined>(user:T)=>ref(db, usersPath + "/" + user?.uid )
    const userBoardIDRef = <T extends string>(BoardID :T, uid : T) => ref(db, boardPath + "/" + BoardID + usersPath + "/" + uid)
    const boardIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID)
    const boardIDplayerRef = <T extends string>(BoardID:T, player:T) => ref(db, boardPath + "/" + BoardID + "/" + player)
    const chatIDRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + chatPath)
    const winBoardIDRef = <T extends string>(BoardID : T) => ref(db, boardPath + "/" + BoardID  + boardWinPath)
    const boardIDMovesRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + boardMovesPath)
    const boardTurnRef = <T extends string>(BoardID:T) => ref(db, boardPath + "/" + BoardID + "/" + boardTurnPath)
    const boardIDSpectatorsRef = <T extends string>(BoardID : T, uid : T) => ref(db, boardPath + "/" + BoardID + "/" + boardSpectatorsPath + "/" + uid)
    const userRef = ref(db, usersPath)
    const chatMenuRef = ref(db, chatPath)
    const lobbyRef = ref(db, boardPath)
    const boardsRef = ref(db, boardPath)
    
//functions
    const board = [ ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '']]
    

    //Create boardID
    const createBoardID = () =>push(lobbyRef, {board, turn: "player1", spectators:[]}).key
    //reset boardID
    const resetBoardID = (fn:(BoardID:string)=>DatabaseReference) => (BoardID:string) => update(fn(BoardID), {board, turn: "player1", winner:""})
    //Disconnect
    const OnDisconnectMenu =  <T extends ProfUser | undefined>(fn:(user:T)=>DatabaseReference) => async (user:T) => await onDisconnect(fn(user)).remove()
    const OnDisconnectBoardID = (fn:(BoardID:string, uid:string)=>DatabaseReference) => async (BoardID : string, uid :string) => {
        await onDisconnect(fn(BoardID, uid)).remove()
        const snapshot = (await get(boardIDRef(BoardID))).val()
        if(await snapshot.player1 == uid){
            onDisconnect(boardIDplayerRef(BoardID,"player1")).remove()
        }
        if(await snapshot.player2 == uid){
            onDisconnect(boardIDplayerRef(BoardID,"player2")).remove()
        }
    }
    const OnDisconnectBoardIDSpectator = <T extends ((BoardID:string, uid:string)=>DatabaseReference)>(fn:T) => async <T extends string>(BoardID :T, uid :T) => {
        await onDisconnect(fn(BoardID, uid)).remove()
        await onDisconnect(boardIDSpectatorsRef(BoardID,uid)).remove()
    }


    //Auth utilities
    const utilSignOut = () => signOut(auth)
    const utilSignOutRemoveUser =  <T extends (u:ProfUser|undefined)=>DatabaseReference>(fn:T) => async <T extends ProfUser|undefined>(u:T, value:unknown) => await set(fn(u), value)
    const utilOnAuthStateChanged = <T extends (u:User|null)=>void>(fn:T) => onAuthStateChanged(auth, fn)

    //Get ID DB
    const getUserRef = async <T extends string>(uid: T) => await get(child(userRef, uid))
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

            if(!arg1 || !arg2) return
            const match = arg1.match(regex)
            const match2 = arg2.match(regex)

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
                    
                    lobbies.push(board.key)
                }
            })

            return lobbies
        })
    }
    const getWinnerName = (fn:(BoardID:string)=>DatabaseReference)=> async (BoardID:string | string[] | undefined) => {
        if(!BoardID || Array.isArray(BoardID)) return
        const winnerID = (await get(fn(BoardID))).val()
        const name = (await get(userBoardIDRef(BoardID, winnerID))).val()
        return name
    }
    const getBoardUserRef = (fn:(BoardID:string, uid:string) => DatabaseReference ) => (BoardID:string, uid:string) => get(fn(BoardID, uid))

    //PushDB
    const pushChat = (ref:DatabaseReference) => <T extends {user : string | undefined, message: string}>(args:T) => push(ref, args)
    const pushBoardIDChat = <T extends (BoardID:string)=>DatabaseReference>(fn:T) => <T extends undefined | string | string[],G extends {user : string | undefined, message: string}>(BoardID: T, args: G) => {
        if(!BoardID || Array.isArray(BoardID)) return
        return push(fn(BoardID), args)}
    
    const pushBoardSpectators = <T extends ((BoardID:string, uid:string) => DatabaseReference)>(fn:T) => async <T extends string>(BoardID : T, uid : T) =>{
        const spectator = (await get(userBoardIDRef(BoardID, uid))).val()
        await set(fn(BoardID, uid), spectator)
    }

    const pushPlayerIntoGame = <T extends (BoardID :string, player:string)=>DatabaseReference>(fn:T)=>async (BoardID:string, uid:string) => {
        const player1 = await get(fn(BoardID, "player1"))
        const player2 = await get(fn(BoardID, "player2"))

        //if player2 doesn't exist and is different from player1 then add

        if(player1.val() == null && player2.val() !== uid )
            set(fn(BoardID, "player1"), uid)
        else if(player2.val() == null && player1.val() !== uid)
            set(fn(BoardID, "player2"), uid)

    }

    const pushUserIntoLobby = (fn:(lobbyKey:string, uid:string )=>DatabaseReference)=> (lobbyKey:string, user:ProfUser | undefined) => {

        if(user)
        return set(fn(lobbyKey, user.uid), user.displayName)
    }

    //RemoveDB
    const removeUserMenu =  <T extends (user:ProfUser | undefined)=>DatabaseReference>(fn:T) => async <T extends ProfUser>(user:T) => await remove(fn(user))
    const removeFromBoardID = <T extends (BoardID:string, uid:string)=>DatabaseReference>(fn:T) => async <T extends string>(BoardID:T, uid:T)=>{
        await remove(fn(BoardID,uid))
    }

    //SetDB
    const setUser = <T extends (user:ProfUser)=>DatabaseReference>(fn:T) => async (user : ProfUser, args : {displayName:string, photo:string | StaticImageData, email:string}) => await set(fn(user), args)
    const setMove = <T extends ((BoardID:string)=>DatabaseReference)>(fn:T)=> (BoardID :string, values:string[][]) => set(fn(BoardID), values )
    const setTurn = <T extends (BoardID:string)=>DatabaseReference>(fn:T) => async<T extends string, G extends string>(BoardID : T, turn : G) => await set(fn(BoardID), turn)
    const setWinner = <T extends ((BoardID:string)=>DatabaseReference)>(fn:T) => async <T extends string, G extends string>(BoardID : T, winner : G) => await set(fn(BoardID), winner)

    //onValue
    const OnValue = (ref:DatabaseReference) => (fn:SnapshotCB) => onValue(ref, fn)
    const IDOnValue = <T extends (arg:string)=>DatabaseReference>(ref:T) => <T extends string | string[] | undefined>(BoardID : T, fn:SnapshotCB) => {
        if(!BoardID || Array.isArray(BoardID))return
        return onValue(ref(BoardID), fn)}
    
//objects
        const UtilDB = {
            createBoardID,
            resetBoardID: resetBoardID(boardIDRef)
        }

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
        getBoardUserRef: getBoardUserRef(userBoardIDRef),
        getOpenLobby,
        getOpponent,
        getWinnerName: getWinnerName(winBoardIDRef)
    }

    const SetDB = {

        setUser: setUser(userIDRef),
        setMove: setMove(boardIDMovesRef),
        setTurn: setTurn(boardTurnRef),
        setWinner : setWinner(winBoardIDRef)
        
    }

    const DisconnectDB = {
        MenuDC : OnDisconnectMenu(userIDRef),
        BoardDC : OnDisconnectBoardID(userBoardIDRef),
        SpectatorDC : OnDisconnectBoardIDSpectator(userBoardIDRef)
    }

    const PushDB = {
        pushMenuChat : pushChat(chatMenuRef),
        pushBoardIDChat : pushBoardIDChat(chatIDRef),
        pushPlayerIntoGame: pushPlayerIntoGame(boardIDplayerRef),
        pushUserIntoLobby : pushUserIntoLobby(userBoardIDRef),
        pushBoardSpectators : pushBoardSpectators(boardIDSpectatorsRef)
    }

    const RemoveDB = {
        removeUserMenu: removeUserMenu(userIDRef),
        removeUserBoardID : removeFromBoardID(userBoardIDRef),
        removeSpectatorBoardID: removeFromBoardID(boardIDSpectatorsRef),
        removePlayerBoardID: removeFromBoardID(boardIDplayerRef)
    }

    const OnValueDB = {
        chatOnValue : OnValue(chatMenuRef),
        usersOnValue: OnValue(userRef),
        menuUsersOnValue: OnValue(userRef),
        chatBoardIDOnValue : IDOnValue(chatIDRef),
        boardOnValue: IDOnValue(boardIDRef),
        boardIDMovesOnValue : IDOnValue(boardIDMovesRef),
        boardIDWin : IDOnValue(winBoardIDRef),
        allBoardsValue: OnValue(boardsRef)
   }

export {UtilDB, AuthUtil, RefUtil, GetDB, OnValueDB, PushDB, SetDB, RemoveDB, DisconnectDB}