import * as functions from 'firebase-functions';
import { request } from 'https';

//CONECTAR a la BD en firebase
//const async = require ('async');
const admin = require ('firebase-admin');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

var categorias = db.collection("categorias");
var restaurantes = db.collection("restaurantes");

//endpoint para crear la lista de productos de cada categoria
export const listaCategorias = functions.https.onRequest((request, response) => {
    if(request.method == "GET"){
        categorias.get().then(snapshot =>{
            var categ = [];
            snapshot.forEach( doc => {
                categ.push(doc.id);
            });
            response.send({categorias:categ});
        })
        .catch(err =>{
            response.send({error: "Error al obtener datos"})
        })
    }
});

//endpoint para la consulta de los productos de una categoria
export const listaProductosCategoria = functions.https.onRequest((request,response) => {
    if(request.method == "GET"){
        //request.body.name
        categorias.doc("carnes").get().then(snapshot =>{
            var lista = [];
            for (let x = 0 ; snapshot.data().productos[x] != undefined; x++){

                snapshot.data().productos[x].restaurante.get().then(restaurante =>{
                    var rest;
                    rest = {id: restaurante.id, nombre: restaurante.data().nombre}
                
                    lista.push ({
                        nombre: snapshot.data().productos[x].nombre,
                        descripcion: snapshot.data().productos[x].descripcion,
                        img: snapshot.data().productos[x].img,
                        restaurante: rest
                    })
                    if(snapshot.data().productos[x+1] == undefined){
                        response.send({productos: lista});
                    }
                  
               }).catch((err) => {
                response.send({error: "Error datos del restaurante"});
               });
              
            }
            
        }).catch (err => {
            response.send({error: "Error en los datos de productos de la categoria..."});
        });
    }
});
