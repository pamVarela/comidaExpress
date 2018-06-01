"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firestore_1 = require("@google-cloud/firestore");
const util_1 = require("util");
//CONECTAR a la BD en firebase
//const async = require ('async');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
var bucket = admin.storage().bucket();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
var compradores = db.collection("compradores");
var productos = db.collection("productos");
var restaurante = db.collection("restaurantes");
var pedidos = db.collection("pedidos");
//pasarlo a base64
function base64MimeType(encoded) {
    var result = null;
    if (typeof encoded !== 'string') {
        return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
}
//decodificar el archivo
function decodeFile(img) {
    let temp = img.split(',');
    let ret;
    ret.mime = base64MimeType(temp[0]);
    ret.file = new Buffer(temp[1], 'base64');
    if (ret.mime == undefined || ret.file == undefined)
        return undefined;
    ret.type = ret.mime.split('/')[0];
    ret.extension = ret.mime.split('/')[1];
    return ret;
}
//hacer validacion de la tupla geopoint
function genGeopoint(tupla, all) {
    try {
        if (tupla[0] == 0 && tupla[1] == 0 && !all)
            return undefined;
        return new firestore_1.GeoPoint(tupla[0], tupla[1]);
    }
    catch (e) {
        return undefined;
    }
}
//funcion para subir la imagen decodificandola para despues introducirlo al firebase store
exports.subirImagenProducto = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        let keyPlat = req.body.keyPlat; //clave de producto
        var img = req.body.img; //base64
        var url = req.body.url; //url
        if (!util_1.isUndefined(img) && !util_1.isUndefined(url)) {
            res.send({ status: false, data: "Solo puede enviar URL o IMG, no ambos" });
            return;
        }
        else if (keyPlat == undefined)
            res.send({ status: false, data: "Producto no recibido" });
        else if (url != undefined) {
            productos.doc(keyPlat).get().then(snapshot => {
                if (!snapshot.exists) {
                    res.send({ status: false, data: "El producto solicitado no existe" });
                }
                else {
                    productos.doc(keyPlat).set({ imagen: url }, { merge: true });
                    res.send({ status: true, data: `La URL del producto ${keyPlat} ha sido modificada a ${url}` });
                }
            }).catch(err => { res.send({ status: false, data: "Error obteniendo el platillo" }); });
        }
        else if (img == undefined) {
            res.send({ status: false, data: "Imagen no valida" });
            return;
        }
        else {
            productos.doc(keyPlat).get().then(snapshot => {
                if (!snapshot.exists) {
                    res.send({ status: false, data: "El producto solicitado no existe" });
                    return;
                }
                img = decodeFile(img);
                if (img == undefined) {
                    res.send({ status: false, data: "Archivo invalido" });
                    return;
                }
                else if (img.type != 'image') {
                    res.send({ status: false, data: "El archivo enviado no es una imagen valida" });
                    return;
                }
                else {
                    var fileName = keyPlat + '.' + img.extension;
                    var file = bucket.file('productos/' + fileName);
                    file.save(img.file, { metadata: { contentType: img.mime } }, error => {
                        if (error)
                            res.send({ status: false, data: 'No se pudo subir la imagen.' });
                        else {
                            let URL = file.metadata.mediaLink;
                            productos.doc(keyPlat).set({ imagen: URL }, { merge: true });
                            res.send({ status: true, data: `La URL del platillo ${keyPlat} ahora es ${URL}` });
                        }
                    });
                }
            }).catch(err => { res.send({ status: false, data: "Error obteniendo el platillo" }); });
        }
    }
    else
        res.send({ status: false, data: "Solo se admite la peticion de POST" });
});
//endpoint para crear la lista de productos de cada categoria
exports.listaCategorias = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        productos.get().then(snapshot => {
            var item = {};
            snapshot.forEach(doc => {
                item[doc.data().categoria] = true;
            });
            response.send({ categorias: Object.keys(item) });
        })
            .catch(err => {
            response.send({ error: "Error al obtener datos" });
        });
    }
});
//endpoint para la consulta de los productos de una categoria
exports.getListaProductosCategoria = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        //request.body.name
        if (request.query.categoria == undefined) {
            response.send({ error: "Error al traer datos" });
        }
        productos.where("categoria", "==", request.query.categoria).get().then(snapshot => {
            var lista = [];
            for (let x = 0; snapshot.docs[x].data() != undefined; x++) {
                let producto = snapshot.docs[x].data();
                restaurante.doc(snapshot.docs[x].data().restaurante).get().then(restaurante => {
                    var rest;
                    rest = { id: restaurante.id, nombre: restaurante.data().nombre };
                    lista.push({
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        img: producto.imagen,
                        restaurante: rest
                    });
                    if (snapshot.docs[x + 1] == undefined) {
                        response.send({ productos: lista });
                    }
                }).catch((err) => {
                    response.send({ error: "Error datos del restaurante" });
                });
            }
        }).catch(err => {
            console.log(err);
            response.send({ error: "Error en los datos de productos de la categoria..." + JSON.stringify(err) });
        });
    }
});
//crear un producto
exports.crearProducto = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let nombre = request.body.nombre, categoria = request.body.categoria, descripcion = request.body.descripcion, rest = request.body.restaurante, img = request.body.imagen;
        //se debe validar que el restaurante exista.  
        if (rest == undefined || nombre == undefined || descripcion == undefined) {
            response.send({ msjError: "Hay un dato que se encuentra indefinido..." });
        }
        else {
            productos.add({
                categoria: categoria,
                nombre: nombre,
                descripcion: descripcion,
                imagen: img,
                restaurante: rest
            }).then(res => {
                response.send({ mensaje: "Se ha creado la insercion de producto...", producto: res.id });
            }).catch(err => {
                response.send({ msjError: "Error en la inserción..." });
            });
        }
    }
    else {
        response.send({ msjError: "La peticion tiene que ser un POST" });
    }
});
//modificar producto
exports.modificarProducto = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        productos.doc(request.body.id).set({
            categoria: request.body.categoria,
            nombre: request.body.nombre,
            descripcion: request.body.descripcion,
            imagen: request.body.imagen,
            restaurante: request.body.restaurante,
            precio: request.body.precio
        }).then(res => {
            response.send({ msj: "Se ha modificado el producto" });
        }).catch(err => {
            response.send({ msj: "Error...en la modificacion de datos" });
        });
    }
});
//eliminar a producto
exports.eliminarProducto = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        productos.doc(request.body.id).delete();
        response.send({ status: true, data: "Se ha eliminado el producto" });
    }
    else {
        response.send({ status: true, data: "La peticion debe ser un POST" });
    }
});
//crea usuario
exports.crearUsuario = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.add({
            nombre: request.body.nombre,
            descripcion: request.body.descripcion,
            ubicacion: request.body.ubicacion
        });
        response.send({ status: true, data: "Insertado" });
    }
});
//obtiene los restaurantes
exports.getRestaurantes = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        restaurante.get().then(snapshot => {
            var listaRestaurantes = [];
            snapshot.forEach(restaurante => {
                listaRestaurantes.push({ nombre: restaurante.data().nombre, imagen: restaurante.data().img });
            });
            response.send({ restaurantes: listaRestaurantes });
        }).catch(err => {
            response.send({ error: "Error al cargar datos" });
        });
    }
});
//crear restaurante
exports.crearRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let nombre = request.body.nombre, descripcion = request.body.descripcion, ubicacion = genGeopoint(JSON.parse(request.body.ubicacion), true);
        if (nombre == undefined || descripcion == undefined || ubicacion == undefined) {
            response.send({ error: "Hay algún dato indefinido..." });
        }
        else {
            restaurante.add({
                descripcion: descripcion,
                nombre: nombre,
                ubicacion: ubicacion,
            }).then(ref => {
                response.send({ status: true, data: ref.id });
            }).catch(err => {
                response.send({ status: false, data: "Error...en la inserción" });
            });
        }
    }
    else {
        response.send({ error: "La solicitud debe ser un POST" });
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
        response.send({ mensaje: "Modificacion exitosa!" });
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
//funcion para agregar un producto al carrito
exports.agregarProductoCarrito = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let product = request.body.claveProducto;
        productos.doc(product).get().then(prod => {
            if (!prod.exists) {
                response.send({ msjError: "No existe el producto" });
            }
            else {
                //falta validar fecha y horarios del restaurante
                let cant = parseInt(request.body.cantidad, 10), fecha = new Date(request.body.fecha), ubicacion = genGeopoint(JSON.parse(request.body.ubicacion), true), correo = request.body.claveComprador;
                if (cant == undefined || fecha == undefined || ubicacion == undefined || correo == undefined) {
                    response.send({ msj: "Error.. Hay un dato indefinido" });
                }
                else {
                    compradores.doc(correo).get().then(comp => {
                        if (!comp.exists) {
                            response.send({ msj: "No existe el usuario" });
                        }
                        else {
                            let carrito = comp.data().carrito;
                            if (carrito[prod.id] == undefined) {
                                carrito[prod.id] = {
                                    cantidad: cant,
                                    fecha: fecha,
                                    ubicacion: ubicacion
                                };
                                compradores.doc(correo).update({
                                    carrito: carrito
                                }).then(() => {
                                    response.send({ msj: "El producto ha sido agregado en el carrito" });
                                }).catch(err => {
                                    response.send({ msj: "Error...el producto no ha sido agregado en el carrito" });
                                });
                            }
                            else {
                                response.send({ msjError: "El platillo ya se encuentra dentro del carrito" });
                            }
                        }
                    }).catch(err => {
                        console.log(err);
                        response.send({ msj: "Error...No se encontro el comprador!" });
                    });
                }
            }
        }).catch(err => {
            response.send({ msj: "Error...No se encontró el producto!" });
        });
    }
    else {
        response.send({ msj: "La peticion tiene que ser un POST" });
    }
});
//# sourceMappingURL=index.js.map