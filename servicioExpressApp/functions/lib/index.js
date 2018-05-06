"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
//CONECTAR a la BD en firebase
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
//endpoint prueba1 
exports.helloWorld = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        admin.firestore().collection("restaurantes").add(request.body).then(WriteResult => {
        });
    }
    response.send({ msg: 'hello putos' });
});
//# sourceMappingURL=index.js.map