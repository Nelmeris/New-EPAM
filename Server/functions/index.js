const functions = require('firebase-functions')

const jsonServer = require('json-server')

const main = jsonServer.create()
const api = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

api.use(middlewares)
api.use(router)

main.use('/', api)

exports.server = functions.https.onRequest(main)
