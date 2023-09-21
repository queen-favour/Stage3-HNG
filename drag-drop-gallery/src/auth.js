import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import other Firebase services you need...
const firebaseConfig = {
    apiKey: "AIzaSyARE363SwMxxqCkv_eDq-HrZRqXjgbxxyU",
    authDomain: "drag-drop-gallery-57a6d.firebaseapp.com",
    projectId: "drag-drop-gallery-57a6d",
    storageBucket: "drag-drop-gallery-57a6d.appspot.com",
    messagingSenderId: "441963619786",
    appId: "1:441963619786:web:c1ffb6343877c8ecaa9b33",
    measurementId: "G-WE0CC2NZ3H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize other Firebase services you need...
export { auth }; 
