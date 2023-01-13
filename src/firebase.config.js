import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_0dnDVBTawtZ2NgpSsI2lkw74PxeGm_g",
  authDomain: "myform-2080a.firebaseapp.com",
  projectId: "myform-2080a",
  storageBucket: "myform-2080a.appspot.com",
  messagingSenderId: "555317089210",
  appId: "1:555317089210:web:83f8241c2df8e749008383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;