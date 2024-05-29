import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKWVX9xMgRaxQObhoizyEKETP8txmKSck",
  authDomain: "fir-boutique-mern.firebaseapp.com",
  projectId: "fir-boutique-mern",
  storageBucket: "fir-boutique-mern.appspot.com",
  messagingSenderId: "259762071936",
  appId: "1:259762071936:web:ab0fef09ab4c25ffe9b965"
};



const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
