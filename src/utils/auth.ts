import {getAuth, createUserWithEmailAndPassword, Auth} from "firebase/auth"

class Firebase{
    auth: Auth
    constructor(){
        this.auth = getAuth()
    }

    createUserWithEmailAndPassword(email:string, password:string){
        return createUserWithEmailAndPassword(this.auth, email, password)
    }
}

const FirebaseObj = new Firebase()

export {FirebaseObj as Firebase}