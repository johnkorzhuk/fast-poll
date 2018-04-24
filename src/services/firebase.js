import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDF5UrJSvY2m0kJS_shx28VoVaQ6b1giTg',
  authDomain: 'polling-app-848fd.firebaseapp.com',
  databaseURL: 'https://polling-app-848fd.firebaseio.com',
  projectId: 'polling-app-848fd',
  storageBucket: 'polling-app-848fd.appspot.com',
  messagingSenderId: '305481405316',
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
