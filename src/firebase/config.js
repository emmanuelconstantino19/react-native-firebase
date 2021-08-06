import firebase from "firebase/app";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCikzFM66zTQqkzWxS52EIueSJbTcr31zo",
  authDomain: "student-progress-monitor-7eb26.firebaseapp.com",
  projectId: "student-progress-monitor-7eb26",
  storageBucket: "student-progress-monitor-7eb26.appspot.com",
  messagingSenderId: "985114264444",
  appId: "1:985114264444:web:cd19ef0020dca56f23daf9",
  measurementId: "G-WDW91Z1CL0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
