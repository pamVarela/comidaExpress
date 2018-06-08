import * as functions from 'firebase-functions';
import { request } from 'https';
import { json } from 'body-parser';
import { GeoPoint } from '@google-cloud/firestore';
import { isUndefined } from 'util';
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
function decodeFile(img: string): { mime: string, file: Buffer } {
    let temp = img.split(',')
    let ret
    ret.mime = base64MimeType(temp[0])
    ret.file = new Buffer(temp[1], 'base64')
    if (ret.mime == undefined || ret.file == undefined)
        return undefined
    ret.type = ret.mime.split('/')[0];
    ret.extension = ret.mime.split('/')[1];
    return ret
}

//hacer validacion de la tupla geopoint
function genGeopoint(tupla: Array<number>, all: boolean): GeoPoint {
    try {
        if (tupla[0] == 0 && tupla[1] == 0 && !all)
            return undefined
        return new GeoPoint(tupla[0], tupla[1])
    }
    catch (e) {
        return undefined
    }
}

//funcion para subir la imagen decodificandola para despues introducirlo al firebase store
export const subirImagenProducto = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        let keyPlat = req.body.keyPlat //clave de producto
        var img = req.body.img //base64
        var url = req.body.url //url
        if (!isUndefined(img) && !isUndefined(url)) {
            res.send({ status: false, data: "Solo puede enviar URL o IMG, no ambos" })
            return
        }
        else if (keyPlat == undefined)
            res.send({ status: false, data: "Producto no recibido" })
        else if (url != undefined) {
            productos.doc(keyPlat).get().then(snapshot => {
                if (!snapshot.exists) {
                    res.send({ status: false, data: "El producto solicitado no existe" })
                }
                else {
                    productos.doc(keyPlat).set({ imagen: url }, { merge: true })
                    res.send({ status: true, data: `La URL del producto ${keyPlat} ha sido modificada a ${url}` })
                }
            }).catch(err => { res.send({ status: false, data: "Error obteniendo el platillo" }) })
        }
        else if (img == undefined) {
            res.send({ status: false, data: "Imagen no valida" })
            return;
        }
        else {
            productos.doc(keyPlat).get().then(snapshot => {
                if (!snapshot.exists) {
                    res.send({ status: false, data: "El producto solicitado no existe" })
                    return
                }
                img = decodeFile(img)
                if (img == undefined) {
                    res.send({ status: false, data: "Archivo invalido" })
                    return
                }
                else if (img.type != 'image') {
                    res.send({ status: false, data: "El archivo enviado no es una imagen valida" })
                    return
                }
                else {
                    var fileName = keyPlat + '.' + img.extension
                    var file = bucket.file('productos/' + fileName);
                    file.save(
                        img.file,
                        { metadata: { contentType: img.mime } },
                        error => {
                            if (error)
                                res.send({ status: false, data: 'No se pudo subir la imagen.' });
                            else {
                                let URL = file.metadata.mediaLink
                                productos.doc(keyPlat).set({ imagen: URL }, { merge: true })
                                res.send({ status: true, data: `La URL del platillo ${keyPlat} ahora es ${URL}` });
                            }
                        }
                    );
                }
            }).catch(err => { res.send({ status: false, data: "Error obteniendo el platillo" }) })
        }
    } else res.send({ status: false, data: "Solo se admite la peticion de POST" });
})

//crear la lista de productos de cada categoria
export const listaCategorias = functions.https.onRequest((request, response) => {

    if (request.method == "GET") {
        productos.get().then(snapshot => {
            var item = {};
            snapshot.forEach(doc => {
                item[doc.data().categoria] = true;
            });
            response.send({ categorias: Object.keys(item) });
        })
            .catch(err => {
                response.send({ error: "Error al obtener datos" })
            })
    }
});

//consulta de los productos de una categoria
export const getListaProductosCategoria = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        //request.body.name
        if (request.query.categoria == undefined) {
            response.send({ error: "Debe ingresar el campo de texto" });
        }
        productos.where("categoria", "==", request.query.categoria).get().then(snapshot => {
            if (snapshot.empty) {
                response.send({ error: "No hay categorias de lo elegido" });
            } else {
                var lista = [];
                for (let x = 0; snapshot.docs[x] != undefined; x++) {

                    let producto = snapshot.docs[x].data();

                    restaurante.doc(snapshot.docs[x].data().restaurante).get().then(restaurante => {
                        var rest;
                        rest = { id: restaurante.id, nombre: restaurante.data().nombre }

                        lista.push({
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            imagen: producto.imagen,
                            precio: producto.precio,
                            restaurante: rest
                        })
                        if (snapshot.docs[x + 1] == undefined) {
                            response.send({ productos: lista });
                        }

                    }).catch((err) => {
                        response.send({ error: "Error datos del restaurante" });
                    });

                }
            }

        }).catch((err) => {
            console.log(err)
            response.send({ error: "Error en los datos de los productos de la categoria..." });
        });
    }

});

//crear un producto
export const crearProducto = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let nombre = request.body.nombre,
            categoria = request.body.categoria,
            descripcion = request.body.descripcion,
            rest = request.body.restaurante,
            precio = parseInt(request.body.precio),
            img = request.body.imagen;
        //se debe validar que el restaurante exista.  
        if (rest == undefined || nombre == undefined || descripcion == undefined) {
            response.send({ msjError: "Hay un dato que se encuentra indefinido..." })
        } else {
            productos.add({
                categoria: categoria,
                nombre: nombre,
                descripcion: descripcion,
                imagen: img,
                restaurante: rest,
                precio: precio
            }).then(res => {
                response.send({ mensaje: "Se ha creado la insercion de producto...", producto: res.id });
            }).catch(err => {
                response.send({ msjError: "Error en la inserción..." });
            })

        }
    } else {
        response.send({ msjError: "La peticion tiene que ser un POST" });
    }
});

//modificar producto
export const modificarProducto = functions.https.onRequest((request, response) => {
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
        })

    }
})

//eliminar a producto
export const eliminarProducto = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        productos.doc(request.body.id).delete()
        response.send({ status: true, data: "Se ha eliminado el producto" });

    } else {
        response.send({ status: true, data: "La peticion debe ser un POST" });
    }
})

//crear el comprador
export const crearComprador = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let tarjeta = {codigo: parseInt(request.body.codigo),
                       dueño: request.body.dueno,
                       vencimiento: parseInt(request.body.vencimiento),
                       numero: request.body.numero,
                       proveedor: request.body.proveedor}
        var carrito = [];
        compradores.add(
            {  
                carrito: carrito,
                nombre: request.body.nombre,
                ubicacion: genGeopoint(JSON.parse(request.body.ubicacion),true),
                telefono: request.body.telefono, 
                tarjeta: tarjeta
            }
        );
        response.send({ status: true, data: "Se creó el comprador." })
    }else{
        response.send({ status: true, data: "La petición debe ser un POST" })
    }
});

//modificar el comprador
export const modificarComprador = functions.https.onRequest((request, response)=>{
    if (request.method == "POST") {
        let tarjeta = {codigo: parseInt(request.body.codigo),
            dueño: request.body.dueno,
            vencimiento: parseInt(request.body.vencimiento),
            numero: request.body.numero,
            proveedor: request.body.proveedor}

        compradores.doc(request.body.correo).set(
            {           
                nombre: request.body.nombre,
                ubicacion: genGeopoint(JSON.parse(request.body.ubicacion),true),
                telefono: request.body.telefono, 
                tarjeta: tarjeta

            }, { merge: true });
        response.send({ mensaje: "Modificacion exitosa del comprador!" })
    }
    else {
        response.send({ status: "La petición tiene que ser un POST" })
    }
})

//obtiene la informacion del comprador
export const getInformacionComprador = functions.https.onRequest((request, response)=>{
    
    if (request.method == "GET") {
        
        compradores.doc(request.query.correo).get().then( comp =>{   
              
            var comprador = [];
    
            comprador.push({
                nombre: comp.data().nombre,
                telefono: comp.data().telefono,
                ubicacion: comp.data().ubicacion,
                tarjeta: comp.data().tarjeta
            })

            response.send({ comprador: comprador})
        }).catch(err =>{
            response.send({ msj: "Error al extraer los datos"})
        })
        
    }
    else {
        response.send({ msj: "La petición tiene que ser un GET" })
    }
})
//obtiene los restaurantes
export const getRestaurantes = functions.https.onRequest((request, response) => {
    if (request.method == "GET") {
        restaurante.get().then(snapshot => {

            var listaRestaurantes = [];
            snapshot.forEach(restaurante => {

                listaRestaurantes.push({ nombre: restaurante.data().nombre, imagen: restaurante.data().img });
            })
            response.send({ restaurantes: listaRestaurantes });

        }).catch(err => {
            response.send({ error: "Error al cargar datos" });
        })
    }
});

//crear restaurante
export const crearRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        let nombre = request.body.nombre,
            correo = request.body.correo,
            descripcion = request.body.descripcion,
            inicio = request.body.inicio,
            final = request.body.final,
            ubicacion = genGeopoint(JSON.parse(request.body.ubicacion), true);

        if (nombre == undefined || correo == undefined || descripcion == undefined
             || ubicacion == undefined || inicio == undefined || final == undefined) {
            response.send({ error: "Hay algún dato indefinido..." });
        } else {
            restaurante.add(
                {
                    correo : correo,
                    descripcion: descripcion,
                    nombre: nombre,
                    ubicacion: ubicacion,
                    horario: {inicio: inicio, final: final}

                }).then(ref => {
                    response.send({ status: true, data: ref.id })
                }).catch(err => {
                    response.send({ status: false, data: "Error...en la inserción" })
                })

        }

    } else {
        response.send({ error: "La solicitud debe ser un POST" });
    }
});
//modificar datos
export const modificarRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.doc(request.body.id).set(
            {           
                nombre: request.body.nombre,
                descripcion: request.body.descripcion,
                ubicacion: request.body.ubicacion,
                inicio: request.body.inicio,
                final: request.body.final,

            }, { merge: true });
        response.send({ mensaje: "Modificacion exitosa!" })
    }
    else {
        response.send({ status: "Error en post" })
    }
});
//eliminar resturante.
export const eliminarRestaurante = functions.https.onRequest((request, response) => {
    if (request.method == "POST") {
        restaurante.doc(request.body.id).delete().then(function () {
            response.send({ status: true, data: "eliminado" });
        })
    }
    else {
        response.send({ status: "Error en post" })
    }
});

//funcion para agregar un producto al carrito
export const agregarProductoCarrito = functions.https.onRequest((request, response) => {

    if (request.method == "POST") {
        let product = request.body.claveProducto
        productos.doc(product).get().then(prod => {
            if (!prod.exists) {
                response.send({ msjError: "No existe el producto" });
            } else {
                //falta validar fecha y horarios del restaurante
                let cant = parseInt(request.body.cantidad, 10),
                    fecha = new Date(request.body.fecha),
                    ubicacion = genGeopoint(JSON.parse(request.body.ubicacion), true),
                    correo = request.body.claveComprador
                if (cant == undefined || fecha == undefined || ubicacion == undefined || correo == undefined) {
                    response.send({ msj: "Error.. Hay un dato indefinido" });

                } else {
                    compradores.doc(correo).get().then(comp => {
                        if (!comp.exists) {
                            response.send({ msj: "No existe el usuario" });
                        } else {
                            let carrito = comp.data().carrito;
                            if (carrito[prod.id] == undefined) {
                                carrito[prod.id] = {
                                    cantidad: cant,
                                    fecha: fecha,
                                    ubicacion: ubicacion
                                }
                                compradores.doc(correo).update({
                                    carrito: carrito
                                }).then(() => {
                                    response.send({ msj: "El producto ha sido agregado en el carrito" })
                                }).catch(err => {
                                    response.send({ msj: "Error...el producto no ha sido agregado en el carrito" })
                                })
                            } else {
                                response.send({ msjError: "El platillo ya se encuentra dentro del carrito" });

                            }

                        }
                    }).catch(err => {
                        console.log(err)
                        response.send({ msj: "Error...No se encontro el comprador!" });
                    })
                }

            }
        }).catch(err => {
            response.send({ msj: "Error...No se encontró el producto!" });
        })

    } else {
        response.send({ msj: "La peticion tiene que ser un POST" })
    }
})

//funcion para cuando se hace el pedido
export const hacerPedido = functions.https.onRequest((request, response) => {

    if (request.method == "POST") {
        let correo = request.body.correo;
        console.log(correo);
        if (correo == undefined) {
            response.send({ msj: "Debe ingresar en el campo de texto del correo" })
        } else {
            compradores.doc(correo).get().then(comp => {

                if (comp.exists) {
                    let carrito = comp.data().carrito;
                    let guardar = (correo, carrito) => {
                        compradores.doc(correo).set(
                            { carrito: carrito },
                            { merge: true })
                    }
                    let keys = Object.keys(carrito)
                    if (keys.length == 0) {
                        response.send({ status: false, msj:"No hay pedidos" })
                    } else {
                        for (let c = 0; c < keys.length; c++) {
                            productos.doc(keys[c]).get().then(producto => {

                                if (producto.exists) {
                                    let est = { proceso: "pendiente" };
                                    pedidos.add({
                                        correo: correo,
                                        restaurante: producto.data().restaurante,
                                        categoria: producto.data().categoria,
                                        nombre: producto.data().nombre,
                                        precio: producto.data().precio,
                                        descripcion: producto.data().descripcion,
                                        ubicacion: carrito[keys[c]].ubicacion,
                                        fecha: carrito[keys[c]].fecha,
                                        cantidad: carrito[keys[c]].cantidad,
                                        estado: est
                                    }).then(ref => {
                                        console.log({
                                            correo: correo,
                                            restaurante: producto.data().restaurante,
                                            categoria: producto.data().categoria,
                                            nombre: producto.data().nombre,
                                            precio: producto.data().precio,
                                            descripcion: producto.data().descripcion,
                                            ubicacion: carrito[keys[c]].ubicacion,
                                            fecha: carrito[keys[c]].fecha,
                                            cantidad: carrito[keys[c]].cantidad,
                                            estado: est
                                        })
                                        delete carrito[keys[c]];
                                        if (Object.keys(carrito).length == 0) {
                                            guardar(correo, carrito)
                                            response.send({ status: true, msj: `Se insertaron ${c} pedidos` })
                                        }

                                    }).catch(err => {
                                        guardar(correo, carrito)
                                        response.send({ status: false, msj: "Error...al procesar los pedidos" })
                                    })
                                } else {
                                    guardar(correo, carrito)
                                    response.send({ error: "No existe el producto..." })
                                }
                            }).catch(err => {
                                guardar(correo, carrito)
                                console.log(err)
                                response.send({ error: "Error en los datos del producto" })
                            })
                        }
                    }
                } else {
                    response.send({ msj: "No existe el comprador..." })
                }
            }).catch(err => {
                console.log(err)
                response.send({ error: "Error en los datos del producto..." })
            })

        }
    }

    else {
        response.send({ msj: "La petición tiene que ser un POST" })
    }
})

//funcion para eliminar un producto del carrito
export const eliminarProductoCarrito = functions.https.onRequest((request,response)=>{

    if(request.method == "POST"){
      let correo = request.body.correo;
      let producto = request.body.producto;
      if(correo == undefined || producto == undefined){
          response.send({msj: "Hay un o más datos indefinidos"})
      }else{
        compradores.doc(correo).get().then(comprador => {
            if(comprador.exists){
                let carrito = comprador.data().carrito;
                if(carrito[producto] == undefined){
                    response.send({msj: "El producto en el carrito esta indefinido"})
                }else{
                    delete(carrito[producto])
                    response.send({msj: `El producto ${producto} en el carrito se eliminó`})  
                    compradores.doc(correo).update({
                        carrito: carrito
                    })                 
                }
            }else{
                response.send({msj: "El correo no existe"})
            }
         
        })
      }
   
    }else{
        response.send({msjError: "La peticion tiene que ser un POST"});
    }


})

//funcion para obtener los pedidos de mi restaurante
export const getPedidosRestaurante = functions.https.onRequest((request,response)=>{

    if(request.method == "GET"){
        let claveRest = request.query.claveRest;
        if(claveRest == undefined){
            response.send({msj: "El dato de correo esta indefinido"})
        }else{
            var listaPedidos = []
            pedidos.where("restaurante", "==", claveRest).get().then(pedido =>{
                if(pedido.empty){
                   response.send({msj:"No existe el pedido"})
                }else{
                    var listaPedidos = [];
                    for(let x = 0; pedido.docs[x] != undefined; x++){
                        let ped = pedido.docs[x].data();
                        listaPedidos.push({
                        correo: ped.correo,
                        nombre: ped.nombre,
                        categoria : ped.categoria,
                        ubicacion: ped.ubicacion,
                        cantidad: ped.cantidad,
                        precio : ped.precio,
                        fecha: ped.fecha
                        })
                        if (pedido.docs[x + 1] == undefined) {
                            response.send({ pedidos: listaPedidos });
                        }
                    }
                }   
            }).catch(err => {
                response.send({mensajeError: "La clave del restaurante no existe"})
            })

        }
    }else{
        response.send({msj: "La peticion tiene ser GET"})
    }

})

