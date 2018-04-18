import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  // apiKey: ,
  // authDomain: ,
  // databaseURL: ,
  // projectId: ,
  // storageBucket: ,
  // messagingSenderId: ,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get polls() {
    return this.store().collection('polls');
  }
}

export default new Firebase();
