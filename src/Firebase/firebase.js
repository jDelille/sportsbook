import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'


const app = firebase.initializeApp({
  apiKey: "AIzaSyCem9ITtwSFcYbdXEvNFBiNNyodLCxSF3M",
  authDomain: "socklord-sportsbook.firebaseapp.com",
  databaseURL: "https://socklord-sportsbook-default-rtdb.firebaseio.com",
  projectId: "socklord-sportsbook",
  storageBucket: "socklord-sportsbook.appspot.com",
  messagingSenderId: "291208360075",
  appId: "1:291208360075:web:a0053bcbc898e76285648e"
})

export const firebaseRef = firebase;
export const auth = app.auth();
export const firestore = app.firestore()