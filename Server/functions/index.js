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
  }
  type Query {
    users: [User] 
  }
`;

const resolvers = {
    Query: {
        users: () =>
        db.collection('/users').get().then(snapshots =>
            snapshots.docs.map(item => {
                const user = item.data();
                user.id = item.id;
                return user;
            })
        )
    }
}

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);