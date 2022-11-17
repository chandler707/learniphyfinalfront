import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCie81z8AeOpXlLrD86QssPT4LNKWfnBZc",
    authDomain: "educationapp-1c5ef.firebaseapp.com",
    projectId: "educationapp-1c5ef",
    storageBucket: "educationapp-1c5ef.appspot.com",
    messagingSenderId: "932226794586",
    appId: "1:932226794586:web:d38fe3524171913e168463",
    measurementId: "G-79632XRG8E"
}

const app = firebase.initializeApp(firebaseConfig);

export default app;
