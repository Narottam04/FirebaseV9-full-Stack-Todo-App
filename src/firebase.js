import { getAuth} from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = { 
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID 
// }

const firebaseConfig = {
    apiKey: "AIzaSyCbiAo_4jEivGoZUSKD2SyCf6iFNshRFNA",
    authDomain: "firestore-tut-ecf3a.firebaseapp.com",
    projectId: "firestore-tut-ecf3a",
    storageBucket: "firestore-tut-ecf3a.appspot.com",
    messagingSenderId: "352180033708",
    appId: "1:352180033708:web:045067ba4f72a746926709"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export default app

