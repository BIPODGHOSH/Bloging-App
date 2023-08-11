// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCIAcQS9dbp4H9hKFGd1JpjCg4uaQGwxQc",
    authDomain: "bloging-app7.firebaseapp.com",
    projectId: "bloging-app7",
    storageBucket: "bloging-app7.appspot.com",
    messagingSenderId: "908214082232",
    appId: "1:908214082232:web:bb20fdffd7137715b1324d",
    measurementId: "G-77M8QXLVQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);