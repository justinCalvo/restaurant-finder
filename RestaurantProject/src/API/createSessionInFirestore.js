import firestore from '@react-native-firebase/firestore';
import { uniqueID } from './makeID.js';
import { createSession } from './createSession.js';

const db = firestore();

export const createSessionInFirestore = async function(idArr) {
  let id = uniqueID();
  db.collection('sessions')
    .get({ id })
    .then(doc => {
      if (doc.exists) {
        console.log(`Session: ${id} already exists!`);
        return createSessionInFirestore();
      }
      return createSession(id, idArr);
    })
    .catch(error => {
      console.log(error);
    });
};
