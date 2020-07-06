const serviceAccount = require("./serviceAccountKey.json");
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://new-epam.firebaseio.com"
});

const db = admin.firestore();

function createUserFromArgs(args) {
    return {
        name: args.name,
        surname: args.surname,
        phoneNumber: args.phoneNumber,
        email: args.email,
        password: args.password,
        createdAt: args.createdAt,
        typeId: args.typeId
    }
}

function parseSnapshot(snapshot) {
    const object = snapshot.data();
    object.id = snapshot.id;
    return object;
}

const resolvers = {
    Query: {
        users: () =>
        db.collection('/users').get().then(snapshots =>
            snapshots.docs.map(snapshot => parseSnapshot(snapshot))
        )
    },
    Mutation: {
        addUser: (parent, args) =>
        db.collection('/users').add(
            createUserFromArgs(args)
        ).then(ref => 
            ref.get().then(snapshot =>
                parseSnapshot(snapshot)
            )
        ),

        updateUser: (parent, args) =>
        db.collection('/users').doc(args.id).set(
            createUserFromArgs(args)
        ).then(ref => 
            db.collection('/users').get().then(snapshots =>
                parseSnapshot(
                    snapshots.docs
                    .find(snapshot => snapshot.id === args.id)
                )
            )
        ),

        deleteUser: (parent, args) =>
        db.collection('/users').get().then(snapshots => {
            const userData = snapshots.docs
            .find(snapshot => snapshot.id === args.id);
            const user = parseSnapshot(userData);
            db.collection('/users').doc(args.id).delete();
            return user;
        })
    }
}

export { resolvers };