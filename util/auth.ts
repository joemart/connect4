import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

const auth = getAuth()
const createUserWithEmailAndPasswordFunc = (email : string, password : string) =>{
    createUserWithEmailAndPassword(auth, email, password)
    
    .catch(e=>console.log(e))
}

export {createUserWithEmailAndPasswordFunc}