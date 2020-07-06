const functions = require('firebase-functions');
const express = require('express');
const { typeDefs } = require('./typeDefs');
const { ApolloServer } = require('apollo-server-express'); 

const { resolvers } = require('./resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);