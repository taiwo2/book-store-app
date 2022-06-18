import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyClH66epqeDpbEStdaziEhQCVcRP2izbmQ",
  authDomain: "books-5f785.firebaseapp.com",
  databaseURL: "https://books-5f785-default-rtdb.firebaseio.com",
  projectId: "books-5f785",
  storageBucket: "books-5f785.appspot.com",
  messagingSenderId: "322964210452",
  appId: "1:322964210452:web:15959a94458a91a697f801"
};

// Initialize Firebase
let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();