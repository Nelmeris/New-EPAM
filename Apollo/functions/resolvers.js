const serviceAccount = require("./serviceAccountKey.json");
const admin = require('firebase-admin');
const { parse } = require("graphql");

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

function createOrderFromArgs(args) {
    return {
        userId: args.userId,
        typeId: args.typeId,
        description: args.description,
        statusId: args.statusId,
        managerId: args.managerId
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

        addOrder: (parent, args) =>
        db.collection('/orders').add(
            createOrderFromArgs(args)
        ).then(ref =>
            ref.get().then(snapshot =>
                parseSnapshot(snapshot)
            )
        ),

        updateOrder: (parent, args)  =>
        db.collection('/orders').doc(args.id).set(
            createOrderFromArgs(args)
        ).then(ref => 
            db.collection('/orders').get().then(snapshots =>
                parseSnapshot(
                    snapshots.docs
                    .find(snapshot => snapshot.id === args.id)
                )
            )
        ),

        addRule: (parent, args) =>
        db.collection('/rules').add({
            title: args.title
        }).then(ref =>
            ref.get().then(snapshot =>
                parseSnapshot(snapshot)
            )
        ),

        addUserType: (parent, args) =>
        db.collection('/userTypes').add({
            title: args.title
        }).then(ref =>
            ref.get().then(snapshot =>
                parseSnapshot(snapshot)
            )
        ),

        addUserTypeRule: (parent, args) =>
        db.collection('/userTypeRules').add({
            ruleId: args.ruleId,
            userTypeId: args.userTypeId
        }).then(ref =>
            ref.get().then(snapshot =>
                parseSnapshot(snapshot)
            )
        ),
        
        deleteUserTypeRule: (parent, args) =>
        db.collection('/userTypeRules').get().then(snapshot => {
            const ruleData = snapshot.docs
            .find(snapshot => snapshot.id === args.id);
            const rule = parseSnapshot(ruleData)
            ruleData.delete();
        })
    }
}

module.exports = resolvers;