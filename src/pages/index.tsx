import Board from "./Board";
import { db } from "config/firebase"

import { ref, child, push, onValue, get, DataSnapshot } from "firebase/database"

import { useList } from "react-firebase-hooks/database"

import { useEffect, useState } from "react"

export default function Home() {

  //users

  const usersRef = db.ref("users")

  const [snapshot, error, loading] = useList(ref(db, "users"))

  const updateUser = (pos: number) => {

    const myArr = snapshot ? snapshot.map(x => x.val()) : []
    myArr[pos] = "wow"
    usersRef.set(myArr)

  }

  //board

  //board reference
  const boardRef = db.ref("board")

  //destructure the row
  const [row] = useList(ref(db, "board"))


  const updateBoard = (pos: number) => {

    //save the array on 'myCells'
    const myCells = row ? row.map(x => x.val()) : []
    //change from 'x' to 'o' or the other way
    myCells[pos] = myCells[pos] == "x" ? "o" : "x";
    //update on realtime Database
    boardRef.set(myCells)

  }

  const potatoRef = db.ref("potato")
  const [myPotato, setMyPotato] = useState("")

  useEffect(() => {

    // get(potatoRef).then(res => setMyPotato(res.val()))

    return onValue(ref(db, "potato"), snapshot => {
      setMyPotato(snapshot.val())

    })

  }, [myPotato])

  const setPotato = () => {
    const potato = myPotato == "hot" ? "cold" : "hot";
    potatoRef.set(potato)
  }

  return (
    <>
      Connect 4
      <Board>
        asf cvbnsdfgsfsf
        {/* <div>
          {snapshot ? snapshot.map((x, i) => <button onClick={() => updateUser(i)} key={i}>Click for {i}</button>) : ""}
        </div>

        {snapshot ? snapshot.map((x, i) => <div key={i}>{x.val()}</div>) : ""} */}

        {/* Display the buttons and update a button depending on which one it is */}
        {/* {row ? row.map((x, i) => <button onClick={() => updateBoard(i)} key={i}>{x.val()}</button>) : <></>} */}

        <button onClick={setPotato}>Click here {myPotato}</button>
      </Board>
    </>
  );
}
