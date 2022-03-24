import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD1u7EN36qz7MivUbGZk1znXf7iLcAAwls',
  authDomain: 'linkedin-clone-a4915.firebaseapp.com',
  projectId: 'linkedin-clone-a4915',
  storageBucket: 'linkedin-clone-a4915.appspot.com',
  messagingSenderId: '286847979508',
  appId: '1:286847979508:web:342e5db4ab68a805b973a1',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };

export default db;
