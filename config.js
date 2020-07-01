import firebase from 'firebase';

const config={
      apiKey: "AIzaSyArLlvKVYY9qRBqxqU_HiDE-xdr25wQcCA",
    authDomain: "pukaar-c2f79.firebaseapp.com",
    databaseURL: "https://pukaar-c2f79.firebaseio.com",
    projectId: "pukaar-c2f79",
    storageBucket: "pukaar-c2f79.appspot.com",
    messagingSenderId: "469968586511",
    appId: "1:469968586511:web:c78e4bacd5b9169685607a",
    measurementId: "G-Z27HEBXMFD"
}

const Firebase = firebase.initializeApp(config);
export default Firebase;

// export const firebaseConfig = {
//     apiKey: "AIzaSyArLlvKVYY9qRBqxqU_HiDE-xdr25wQcCA",
//     authDomain: "pukaar-c2f79.firebaseapp.com",
//     databaseURL: "https://pukaar-c2f79.firebaseio.com",
//     projectId: "pukaar-c2f79",
//     storageBucket: "pukaar-c2f79.appspot.com",
//     messagingSenderId: "469968586511",
//     appId: "1:469968586511:web:c78e4bacd5b9169685607a",
//     measurementId: "G-Z27HEBXMFD"
//   };
