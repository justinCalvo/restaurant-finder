import firestore from '@react-native-firebase/firestore';
const db = firestore();

export const createSession = async function(id, idArr) {
  let obj = {};

  for (let i = 0; i < idArr.length; i++) {
    obj[idArr[i]] = 0;
  }

  db.collection('sessions')
    .doc(id)
    .set(obj)
    .then(() => {
      console.log(`Session: ${id} created!`);
    })
    .catch(() => {
      console.log(`Session: ${id} failed! YOU SUCK`);
    });
};
