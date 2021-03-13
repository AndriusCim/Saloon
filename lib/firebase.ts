import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Post, PostDto } from '../api/posts';

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

// Types
export type PostRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type UserInfo = firebase.UserInfo;
export type Document = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export type Timestamp = firebase.firestore.Timestamp;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export const getUserWithUsername = async (username: string) => {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
};

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

