import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCdZ_8PkT0Anqp9Tw8vHAnDZRIG6cx9Vdc',
  authDomain: 'wuwish-81bc1.firebaseapp.com',
  databaseURL: 'https://wuwish-81bc1-default-rtdb.firebaseio.com',
  projectId: 'wuwish-81bc1',
  storageBucket: 'wuwish-81bc1.firebasestorage.app',
  messagingSenderId: '467318589351',
  appId: '1:467318589351:web:bea3751c58212356935882',
  measurementId: 'G-ML9V7V00HL'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

// console.log('Firestore 初始化完成:', db);

export default app;
