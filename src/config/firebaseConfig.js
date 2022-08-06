// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBZE_gX_7IasxtriZzodG5BXT3O6pa6Qpc",
  authDomain: "spaceboxmisbah.firebaseapp.com",
  projectId: "spaceboxmisbah",
  storageBucket: "spaceboxmisbah.appspot.com",
  messagingSenderId: "86421138100",
  appId: "1:86421138100:web:ec0869e242e254c72a85e1",
  measurementId: "G-VTJBE7BFR0"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);



export default firebase;
