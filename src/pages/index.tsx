import Board from "./Board";
import "config/firebase"
import { getDatabase, ref, set, onValue, update, remove, get, child } from "firebase/database";
import { useEffect, useState } from "react"

export default function Home() {

  const [val, setVal] = useState<string>("")
  const [arr, setArr] = useState<string[]>([])

  const db = getDatabase()

  function writeData() {
    set(ref(db, "users/"), {
      username: "joemart06231990"
    })
  }


  function writeEmail() {

    update(ref(db, "users/"), {
      email: ["asdf@gmail.com", "asdflkjasdf@asdf.com"]
    })

    // push(ref(db, "users/"), {
    //   email: ["asdf@asdfa.com"]
    // })


  }

  const userRef = ref(db, "users/username")
  const arrRef = ref(db, "users/email")

  useEffect(() => {

    // get(child(ref(db), "users/email")).then(snapshot => {
    //   console.log(snapshot.val())
    // })

    onValue(arrRef, snapshot => {
      setArr([...snapshot.val()])
    })

    onValue(userRef, (snapshot) => {
      setVal(snapshot.val())
    })

  }, [val])

  function myUpdate() {

    const postData = {
      username: "Joe"
    }

    update(ref(db, "users/"), { ...postData })

  }

  function myDelete() {
    remove(ref(db, "users/username"))
  }

  return (
    <>
      Connect 4
      <Board>
        asdf
        <button onClick={() => writeData()}>write in DB</button>
        <button onClick={() => myUpdate()}>Update</button>
        <button onClick={() => myDelete()}>Remove</button>
        <button onClick={() => writeEmail()}>Write email</button>
        <div>{val ? val : "processing..."}</div>
        <div>{arr.map(x => x)}</div>

      </Board>
    </>
  );
}
