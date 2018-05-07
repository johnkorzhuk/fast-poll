import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  // https://firebase.google.com/docs/web/setup
  // these keys will only work on your localhost, to test a
  apiKey: 'AIzaSyDF5UrJSvY2m0kJS_shx28VoVaQ6b1giTg',
  authDomain: 'polling-app-848fd.firebaseapp.com',
  databaseURL: 'https://polling-app-848fd.firebaseio.com',
  projectId: 'polling-app-848fd',
  storageBucket: 'polling-app-848fd.appspot.com',
  messagingSenderId: '305481405316',
};

class Firebase {
  constructor(offline = false) {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;

    if (config.apiKey === 'AIzaSyDF5UrJSvY2m0kJS_shx28VoVaQ6b1giTg') {
      // if you've updated the config to use your own keys you may delete this conditional.
      console.warn(
        `${
          config.authDomain
        } will only work on localhost. To get your own firebase keys visit: https://firebase.google.com/docs/web/setup and replace the config object in ./src/services/firebase.js with your own keys.`,
      );
    }

    if (offline) {
      firebase
        .firestore()
        .enablePersistence()
        .then(() => {
          this.store = firebase.firestore;
        })
        .catch(() => {
          // https://firebase.google.com/docs/firestore/manage-data/enable-offline
        });
    }
  }

  get polls() {
    return this.store().collection('polls');
  }

  get users() {
    return this.store().collection('users');
  }
}

export default new Firebase(true);
