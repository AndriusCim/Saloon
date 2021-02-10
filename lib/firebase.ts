import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD3wCWsI9MSJ3V2bInG_k1yaWeQDax3Dmk',
  authDomain: 'saloon-8bc01.firebaseapp.com',
  projectId: 'saloon-8bc01',
  storageBucket: 'saloon-8bc01.appspot.com',
  messagingSenderId: '483987514040',
  appId: '1:483987514040:web:a017e8089e31d21710ca4d'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
