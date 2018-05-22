"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
//CONECTAR a la BD en firebase
//const async = require ('async');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
var compradores = db.collection("Compradores");
var categorias = db.collection("categorias");
var restaurante = db.collection("restaurantes");
//crear un producto
/*export const crearProducto=functions.https.onRequest((request,response)=>
{
    if(request.method == "Post"){
        categorias.doc(request.query.categoria).get().then(snapshot =>{
            categorias
            .add({
                descripcion: request.body.descripcion,
                img: request.body.img,
                nombre: request.body.nombre,
  //------------------se debe validar que el restaurante exista.----------------------------
                restaurante: request.body.restaurante
            })
        })
        response.send({status:true,data:"enviado"});
    }
});*/
exports.getRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        restaurante.get().then(snapshot => {
            var listaRestaurantes = [];
            snapshot.forEach(restaurante => {
                listaRestaurantes.push(restaurante.id);
            });
            response.send({ id: listaRestaurantes });
        }).catch(err => {
            response.send({ error: "Error al cargar datos" });
        });
    }
});
//crear restaurante
exports.crearRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.add({
            descripcion: request.body.descripcion,
            nombre: request.body.nombre,
            ubicacion: request.body.ubicacion
        });
        response.send({ status: true, data: "Insertado" });
    }
});
//modificar datos
exports.modificarRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.doc(request.body.id).set({
            descripcion: request.body.descripcion,
            nombre: request.body.nombre,
            ubicacion: request.body.ubicacion
        }, { merge: true });
        response.send({ status: "Editado exitoso" });
    }
    else {
        response.send({ status: "Error en post" });
    }
});
//eliminar resturante.
exports.eliminarRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.doc(request.body.id).delete().then(function () {
            response.send({ status: true, data: "eliminado" });
        });
    }
    else {
        response.send({ status: "Error en post" });
    }
});
//endpoint para crear la lista de productos de cada categoria
exports.listaCategorias = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        categorias.get().then(snapshot => {
            var categ = [];
            snapshot.forEach(doc => {
                categ.push(doc.id);
            });
            response.send({ categorias: categ });
        })
            .catch(err => {
            response.send({ error: "Error al obtener datos" });
        });
    }
});
//endpoint para la consulta de los productos de una categoria
exports.listaProductosCategoria = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        //request.body.name
        categorias.doc(request.query.categoria).get().then(snapshot => {
            var lista = [];
            for (let x = 0; snapshot.data().productos[x] != undefined; x++) {
                snapshot.data().productos[x].restaurante.get().then(restaurante => {
                    var rest;
                    rest = { id: restaurante.id, nombre: restaurante.data().nombre };
                    lista.push({
                        nombre: snapshot.data().productos[x].nombre,
                        descripcion: snapshot.data().productos[x].descripcion,
                        img: snapshot.data().productos[x].img,
                        restaurante: rest
                    });
                    if (snapshot.data().productos[x + 1] == undefined) {
                        response.send({ productos: lista });
                    }
                }).catch((err) => {
                    response.send({ error: "Error datos del restaurante" });
                });
            }
        }).catch(err => {
            response.send({ error: "Error en los datos de productos de la categoria..." });
        });
    }
});
//# sourceMappingURL=index.js.map