import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
  };


/*const firebaseConfig = {
  apiKey: "AIzaSyBDr67BmMg3FnYg68qs_BNQ751mAXOqQCk",
  authDomain: "reactshop-b5520.firebaseapp.com",
  projectId: "reactshop-b5520",
  storageBucket: "reactshop-b5520.appspot.com",
  messagingSenderId: "834378190038",
  appId: "1:834378190038:web:48e159e9530df9aeb08d77"
};*/
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

/*export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const dbService = firebase.firestore();

export const storageService = firebase.storage();*/