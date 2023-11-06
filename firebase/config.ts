import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuoSMwAIBcYlgR280eiop9P2L9arLjzuc",
    authDomain: "vietnamese-cuisine-fc3a7.firebaseapp.com",
    projectId: "vietnamese-cuisine-fc3a7",
    storageBucket: "vietnamese-cuisine-fc3a7.appspot.com",
    messagingSenderId: "157768291359",
    appId: "1:157768291359:ios:3ae0afcf3cdf7661ecb12a",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
