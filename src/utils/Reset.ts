import { db } from "config/firebase";
import {ref, set} from "firebase/database";

const Reset = () =>{
    set(ref(db, "board"), [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ])
}

export default Reset