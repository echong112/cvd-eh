import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import flamelink from 'flamelink/app';
import 'flamelink/content';
import 'flamelink/storage';

const projectId = 'cvd-2-d6aa3';
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const app = flamelink({
  firebaseApp,
  dbType: 'cf'
});

export default app;
