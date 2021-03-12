import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCKJQ-hXj6uOiVAjuzI8oS-3f-2HooPOdM",
    authDomain: "booking-d1d1a.firebaseapp.com",
    projectId: "booking-d1d1a",
    storageBucket: "booking-d1d1a.appspot.com",
    messagingSenderId: "385923084373",
    appId: "1:385923084373:web:2491a941c8b9f2214a24dc"
  };
// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
