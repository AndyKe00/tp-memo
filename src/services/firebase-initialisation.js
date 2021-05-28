import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import firebaseConfig from './config';

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser FirebaseAuth
export const instanceFirebaseAuth = firebase.auth();

// Initialiser FirebaseUI
export const instanceFirebaseUI = new firebaseui.auth.AuthUI(instanceFirebaseAuth);

// Initialiser Firestore
export const instanceFirestore = firebase.firestore();

