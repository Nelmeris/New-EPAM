const serviceAccount = require("./serviceAccountKey.json");
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://new-epam.firebaseio.com"
});

const db = admin.firestore();

function parseSnapshot(snapshot) {
    const object = snapshot.data();
    object.id = snapshot.id;
    return object;
}

function getFromFirestore(collection, key, value) {
    return db.collection(collection).get().then(snapshots => {
        const items = snapshots.docs.map(snapshot => parseSnapshot(snapshot))
        return (key) ? items.find(item => item[key] == value) : items;
    })
}

function addToFirestore(collection, object) {
    return db.collection(collection).add(object).then(ref => 
        ref.get().then(snapshot =>
            parseSnapshot(snapshot)
        )
    )
}

function updateOnFirestore(collection, id, object) {
    return db.collection(collection).doc(id).set(object).then(ref => 
        db.collection(collection).get().then(snapshots =>
            parseSnapshot(
                snapshots.docs
                .find(snapshot => snapshot.id === id)
            )
        )
    )
}

function deleteFromFirestore(collection, id) {
    return db.collection(collection).get().then(snapshot => {
        const data = snapshot.docs
        .find(snapshot => snapshot.id === id);
        const rule = parseSnapshot(data)
        data.delete();
        return rule;
    })
}

module.exports = { getFromFirestore, addToFirestore, updateOnFirestore, deleteFromFirestore };