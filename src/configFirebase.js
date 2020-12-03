import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCJtz278934Chd16oU1L1X0QFDApd35Oj8",
    authDomain: "challengejobreact.firebaseapp.com",
    databaseURL: "https://challengejobreact.firebaseio.com",
    projectId: "challengejobreact",
    storageBucket: "challengejobreact.appspot.com",
    messagingSenderId: "109342891864",
    appId: "1:109342891864:web:f6f87141356b7ec6010f2d"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth()
export const users = firebase.database().ref().child('users')
export const usersWishlist = firebase.database().ref().child('usersWishlist')
