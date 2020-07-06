const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { gql } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://new-epam.firebaseio.com"
});

const db = admin.firestore();

const typeDefs = gql`
  # A User
  type User {
    id: ID!
    name: String!
    surname: String!
    phoneNumber: String!
    email: String!
    password: String!
    createdAt: String!
    typeId: String!
  }
  type Query {
    users: [User] 
  }
  type Mutation {
      addUser(
          name: String!,
          surname: String!,
          phoneNumber: String!,
          email: String!,
          password: String!,
          typeId: String!,
          createdAt: String!): User
      updateUser(
          id: ID!,
          name: String!,
          surname: String!,
          phoneNumber: String!,
          email: String!,
          password: String!,
          typeId: String!,
          createdAt: String!): User
      deleteUser(id: ID!): User
  }
`;

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

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);