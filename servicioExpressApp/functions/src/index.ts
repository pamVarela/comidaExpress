import * as functions from 'firebase-functions';
import { WriteResult } from '@google-cloud/firestore';

//CONECTAR a la BD en firebase
const admin = require ('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

//endpoint prueba1 
export const helloWorld = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        admin.firestore().collection("restaurantes").add(request.body).then(WriteResult=>{

        });
    }
    response.send({msg : 'hello putos'});
});
