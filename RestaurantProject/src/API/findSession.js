import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const findSession = async function(id) {
  let hour = id.slice(0, 2);
  // console.log(hour);
  return db
    .collection(hour)
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log(`Session: ${id} found!`);
        // console.log(doc._data);
        return doc._data;
      } else {
        console.log(`Session: ${id} not found!`);
        // return {};
      }
    })
    .catch(error => {
      console.log(error);
    });
};
