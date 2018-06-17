import * as functions from 'firebase-functions';
import { request } from 'https';
import { json } from 'body-parser';
import {GeoPoint} from '@google-cloud/firestore';
import { isUndefined } from 'util';
//CONECTAR a la BD en firebase
//const async = require ('async');
const admin = require ('firebase-admin');

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
function base64MimeType(encoded){
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
function decodeFile(img:string) : {mime:string,file:Buffer}{
    let temp = img.split(',')
    let ret
    ret.mime = base64MimeType(temp[0])
    ret.file = new Buffer(temp[1], 'base64')
    if(ret.mime==undefined || ret.file==undefined)
        return undefined
    ret.type = ret.mime.split('/')[0];
    ret.extension = ret.mime.split('/')[1];
    return ret
}

//hacer validacion de la tupla geopoint
function genGeopoint(tupla:Array<number>, all:boolean) : GeoPoint{
    try{
        if(tupla[0]==0 && tupla[1]==0 && !all)
            return undefined
        return new GeoPoint(tupla[0],tupla[1])
    }
    catch(e){
        return undefined
    }
}

//funcion para subir la imagen decodificandola para despues introducirlo al firebase store
export const subirImagenProducto = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        let keyPlat=req.body.keyPlat //clave de producto
        var img = req.body.img //base64
        var url = req.body.url //url
        if(!isUndefined(img) && !isUndefined(url)){
            res.send({status:false,data:"Solo puede enviar URL o IMG, no ambos"})
            return
        }
        else if(keyPlat==undefined)
            res.send({status:false,data:"Producto no recibido"})
        else if (url!=undefined){
            productos.doc(keyPlat).get().then(snapshot =>{
                if(!snapshot.exists){
                    res.send({status:false,data:"El producto solicitado no existe"})
                }
                else{
                    productos.doc(keyPlat).set({imagen:url},{merge:true})
                    res.send({status:true,data:`La URL del producto ${keyPlat} ha sido modificada a ${url}`})
                }
            }).catch(err =>{res.send({status:false,data:"Error obteniendo el platillo"})})
        }
        else if(img==undefined){
            res.send({status:false,data:"Imagen no valida"})
            return;
        }
        else{
            productos.doc(keyPlat).get().then(snapshot =>{
                if(!snapshot.exists){
                    res.send({status:false,data:"El producto solicitado no existe"})
                    return
                }
                img = decodeFile(img)
                if(img==undefined){
                    res.send({status:false,data:"Archivo invalido"})
                    return
                }
                else if(img.type!='image'){
                    res.send({status:false,data:"El archivo enviado no es una imagen valida"})
                    return
                }
                else{
                    var fileName = keyPlat+'.'+img.extension
                    var file = bucket.file('productos/' + fileName);
                    file.save(
                        img.file,
                        {metadata: {contentType: img.mime}},
                        error => {
                            if (error)
                                res.send({status:false,data:'No se pudo subir la imagen.'});
                            else{
                                let URL = file.metadata.mediaLink
                                productos.doc(keyPlat).set({imagen:URL},{merge:true})
                                res.send({status:true,data:`La URL del platillo ${keyPlat} ahora es ${URL}`});
                            }
                        }
                    );
                }
            }).catch(err =>{res.send({status:false,data:"Error obteniendo el platillo"})})
        }
    } else  res.send({status:false,data:"Solo se admite la peticion de POST"});
})

//endpoint para crear la lista de productos de cada categoria
export const listaCategorias = functions.https.onRequest((request, response) => {
    
    if(request.method == "GET"){
        productos.get().then(snapshot =>{
            var item = {};
            snapshot.forEach( doc => {
                item[doc.data().categoria] = true;
            });
            response.send({categorias:Object.keys(item)});
        })
        .catch(err =>{
            response.send({error: "Error al obtener datos"})
        })
    }
}); 

          
                
//endpoint para la consulta de los productos de una categoria 
export const getListaProductosCategoria = functions.https.onRequest((request,response) => {
    if(request.method == "GET"){
        //request.body.name
        if(request.query.categoria == undefined){
            response.send({error: "Error al traer datos del Query"});
        }
        productos.where("categoria","==", request.query.categoria).get().then(snapshot =>{
            var lista = [];
            for (let x = 0 ; snapshot.docs[x] != undefined; x++){
                let producto = snapshot.docs[x];
                restaurante.where("correo","==",snapshot.docs[x].data().restaurante).get().then(rest =>{  
                    for(let y=0; rest.docs[y]!=undefined; y++){
                        var restauran
                        restauran = {id: rest.docs[y].data().correo, nombre: rest.docs[y].data().nombre}  
                        lista.push ({
                            id:producto.id,
                            nombre:producto.data().nombre,
                            descripcion: producto.data().descripcion,                    
                            img: producto.data().imagen,
                            precio: producto.data().precio,
                            categoria: request.query.categoria,
                            restaurante: restauran
                        })
                        
                    }
                    if(snapshot.docs[x+1] == undefined){
                        response.send({productos: lista});
                    }
                   
                }).catch((err) => {
                response.send({error: "Error datos del restaurante"});
                });
                
            }    
        }).catch (err => {
            console.log(err)
            response.send({error: "Error en los datos de productos de la categoria..." + JSON.stringify(err)});
        });
    }

});

//crear un producto
 export const crearProducto=functions.https.onRequest((request,response)=>{
    if(request.method == "POST"){
        let nombre = request.body.nombre, 
        categoria = request.body.categoria,
        descripcion = request.body.descripcion,
        rest = request.body.restaurante,
        img = request.body.imagen,
        precio=request.body.precio
            //se debe validar que el restaurante exista.  
        if (rest == undefined || nombre == undefined || descripcion == undefined){
                response.send({msjError: "Hay un dato que se encuentra indefinido..."})
        }else {      
            productos.add({
                categoria: categoria,
                nombre: nombre,
                descripcion: descripcion,
                imagen: img,
                restaurante: rest,
                precio: precio
            }).then(res =>{
                response.send({status:true,mensaje: "Se ha creado la insercion de producto...", producto: res.id});
            }).catch(err=>{
                response.send({status:false,msjError: "Error en la inserción..."});
            })
           
        }
    }else{
        response.send({status:false,msjError: "La peticion tiene que ser un POST"});
    }
}); 

//modificar producto
export const modificarProducto = functions.https.onRequest((request,response)=>{
    if(request.method == "POST"){

        productos.doc(request.body.id).set({

            categoria: request.body.categoria,
            nombre: request.body.nombre,
            descripcion: request.body.descripcion,
            imagen: request.body.imagen,
            restaurante: request.body.restaurante,
            precio: request.body.precio

        }).then(res => {
            response.send({status:true,msj:"Se ha modificado el producto"});
        }).catch(err => {
            response.send({status:false,msj:"Error...en la modificacion de datos"});
        })
        
    }
})

//eliminar a producto
export const eliminarProducto = functions.https.onRequest((request,response)=>{
    if(request.method == "POST"){
        productos.doc(request.body.id).delete()
        response.send({status:true,data:"Se ha eliminado el producto"});
        
    }else{
        response.send({status:true,data:"La peticion debe ser un POST"});
    }
})

//crea usuario
export const crearUsuario = functions.https.onRequest((request, response) => {
    console.log(request.method)
    if(request.method == "POST"){
        let tarjeta={
            codigo:request.body.codigo,
            duenno:request.body.duenno,
            numero:request.body.numero,
            proveedor:request.body.proveedor,
            vencimiento:request.body.vencimiento,
        }
        let carrito = [],

        nombre = request.body.nombre,
        //{"codigo":123, "dueño":Jurguen,"numero":12345, "proveedor":BCR,"vencimiento":09/22}
        telefono = request.body.telefono,
        correo = request.body.correo,
        ubicacion = genGeopoint(JSON.parse(request.body.ubicacion),true),
        contrasenna =request.body.contrasenna
        
        if ( tarjeta.codigo == undefined || tarjeta.duenno == undefined
            || tarjeta.numero == undefined || tarjeta.proveedor == undefined 
            || tarjeta.vencimiento == undefined || correo == undefined
            || nombre == undefined || contrasenna==undefined
            || telefono == undefined || ubicacion == undefined){
            response.send({msjError: "Hay un dato que se encuentra indefinido..."
            ,correo:correo, nombre:nombre, codigo:tarjeta.codigo,
            duenno:tarjeta.duenno, numero:tarjeta.numero,
            proveedor:tarjeta.proveedor, contrasenna:contrasenna
            ,v:tarjeta.vencimiento, ubicacion:ubicacion, telefono:telefono
        })
        }else {
        
            compradores.doc(correo).set(
            {
                nombre : nombre,
                carrito:carrito,
                tarjeta : tarjeta,
                telefono : telefono,
                ubicacion : ubicacion,
                contrasenna: contrasenna    
                }).then(res =>{
                    response.send({mensaje: "Se ha creado la insercion de producto...", producto: res.id});
                }).catch(err=>{
                    response.send({msjError: "Error en la inserción..."});
                })
            
        response.send({status:true,data:"Insertado"})
        }
    }
    else{
        response.send({status:false, Error:"Metodo es post"})
    }
});
//obtener usuario
export const getUsuario = functions.https.onRequest((request, response) => {
    if(request.method == "GET"){
        //obtener usuario de firebase por correo.
        if (request.query.correo == undefined){
            response.send({error:"error datos indefinidos"})
        }
        else{
            compradores.doc(request.query.correo).get().then(usuario =>{
            if(!usuario.exists){
                response.send({status:false,data:"El usuario no existe"})
                return
            }
            var compita= {
                correo: request.query.correo,
                carrito: usuario.data().carrito,
                nombre: usuario.data().nombre,
                tarjeta: usuario.data().tarjeta,
                telefono:usuario.data().telefono,
                ubicacion:usuario.data().ubicacion,
                contrasenna:usuario.data().contrasenna
            }
            response.send({status: true, usuarios:compita})
            })
        }
    }
    else{
        response.send({error:"error datos indefinidos"})
    }
});
//obtenerun restaurante
export const getUnRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "GET"){
        if (request.query.correo == undefined){
            response.send({status:false,error:"error datos indefinidos"})
        }
        else{
            console.log(request.query.correo)
            restaurante.where("correo","==", request.query.correo).get().then(rest =>{
                if(rest.empty){
                    response.send({status:false})
                }
                else{
                    for(let x = 0; rest.docs[x] != undefined; x++){
                        var restaurantico=   
                        {   
                            id:rest.docs[x].id,
                            correo:rest.docs[x].data().correo,
                            descripcion:rest.docs[x].data().descripcion,
                            horario:rest.docs[x].data().horario,
                            img:rest.docs[x].data().img,
                            nombre:rest.docs[x].data().nombre,
                            telefono:rest.docs[x].data().telefono,
                            ubicacion:rest.docs[x].data().ubicacion,
                            contrasenna:rest.docs[x].data().contrasenna
                        }
                        
                    }
                }
                    response.send({status:true,restaurantes: restaurantico});
                }).catch(err=>{
                response.send({status:false,error:"Error al cargar datos"});
            })
        }
        
    }
});  

//obtiene los restaurantes
export const getRestaurantes = functions.https.onRequest((request, response) => {
    if(request.method == "GET"){
        restaurante.get().then(snapshot =>{

            var listaRestaurantes = [];
            snapshot.forEach( restaurante =>{      
                listaRestaurantes.push(restaurante.data());
            })
            response.send({restaurantes:listaRestaurantes});
           
        }).catch(err=>{
            response.send({error:"Error al cargar datos"});
        })
    }
});  

//crear restaurante
export const crearRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        let horario={
            fin: request.body.fin,
            inicio:request.body.inicio
        }

        let nombre = request.body.nombre, 
        descripcion = request.body.descripcion,
        telefono=request.body.telefono,
        img = request.body.imagen,
        correo=request.body.correo,
        contrasenna=request.body.contrasenna,
        ubicacion = genGeopoint(JSON.parse(request.body.ubicacion),true);

        if(nombre == undefined || descripcion == undefined|| ubicacion == undefined){
            
        response.send({error:"Hay algún dato indefinido..."});
        }else{
            restaurante.add(
                {
                    correo:correo,
                    descripcion:descripcion,
                    horario:horario,
                    img:img,
                    nombre:nombre,
                    telefono:telefono,
                    ubicacion:ubicacion,
                    contrasenna:contrasenna
                }).then(ref => {
                    response.send({status:true, data: ref.id})
                }).catch(err =>{
                    response.send({status:false, data:"Error...en la inserción"})
                })
           
        }
        
    }else{
        response.send({error: "La solicitud debe ser un POST"});
    }
});
//modificar datos
export const modificarRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        let horario={
            fin:request.body.fin,
            inicio:request.body.inicio,    
        }
        let ubicacion=genGeopoint(JSON.parse(request.body.ubicacion),true)
        restaurante.doc(request.body.id).set(
            {
                contrasenna:request.body.contrasenna,
                correo:request.body.correo,
                descripcion:request.body.descripcion,
                img:request.body.img,
                horario:horario,
                nombre:request.body.nombre,
                telefono:request.body.telefono,
                ubicacion:ubicacion
            },{merge:true});
            response.send({status:true,mensaje: "Modificacion exitosa!"})
        }
    else{
        response.send({status:false,msj:"Error en post"})
    }
});
//eliminar resturante.
export const eliminarRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        restaurante.doc(request.body.id).delete().then(function(){
            response.send({status:true,data:"eliminado"});
        })
    }
    else{
        response.send({status:"Error en post"})
    }
});

//funcion para agregar un producto al carrito

function enHorario(pedido: Date, horario: {inicio,fin}): boolean {
    let dia = pedido.getDay()
    let min = (pedido.getHours() * 60) + pedido.getMinutes()
    //console.log(min)
    //console.log(horario.inicio + " " + horario.fin)
    let aceptado: boolean = false
    
    if (horario.inicio <= min && horario.fin >= min){
           aceptado = true
            
    }
    return aceptado
}

export const agregarProductoCarrito = functions.https.onRequest((request, response) => {

    if (request.method == "POST") {

        let product = request.body.claveProducto

        productos.doc(product).get().then(prod => {
            let nombre=prod.data().nombre,
            precio=prod.data().precio
            console.log(nombre+"Hola")
            if (!prod.exists) {
                response.send({ status:false,msjError: "No existe el producto" });
            } else {

                let cant = parseInt(request.body.cantidad, 10),
                    fecha = new Date(request.body.fecha),
                    ubicacion = genGeopoint(JSON.parse(request.body.ubicacion), true),
                    correo = request.body.claveComprador

                    console.log(fecha)

                if (cant == undefined || fecha == undefined || ubicacion == undefined || correo == undefined) {
                    response.send({status:false, msj: "Error.. Hay un dato indefinido" });

                } else {
                    restaurante.where("correo","==", prod.data().restaurante).get().then(rest =>{
                        if(rest.empty){
                            response.send({status:false, msj:"No existe el restaurante"})
                        }
                        else{
                            //if ((enHorario(fecha, rest.docs[0].data().horario)) != true) {
                              //  console.log("false")
                                //response.send({ msjError: "No puede ya que el restaurante esta cerrado a esta hora" });
                            //}
                            // else {
                            let restauran= rest.docs[0].data().correo,
                            nombreR= rest.docs[0].data().nombre
                            console.log(restauran)
                            compradores.doc(correo).get().then(comp => {
                                if (!comp.exists) {
                                    response.send({ status:false, msj: "No existe el usuario" });
                                } else {
                                    let carrito = comp.data().carrito;
                                    
                                    
                                        let producto = {
                                            idProducto:request.body.claveProducto,
                                            precio:precio,
                                            nombre:nombre,
                                            cantidad: cant,
                                            fecha: fecha,
                                            ubicacion: ubicacion,
                                            restaurante: restauran,
                                            nombreRestauran:nombreR  
                                        }
                                        carrito.push(producto)
                                        
                                        compradores.doc(correo).update({
                                            carrito: carrito
                                        }).then(() => {
                                            response.send({ status:true,msj: "El producto ha sido agregado en el carrito" })
                                        }).catch(err => {
                                            response.send({ status:false,msj: "Error...el producto no ha sido agregado en el carrito" })
                                        })
                                    }
                                }).catch(err => {
                                console.log(err)
                                response.send({status:false, msj: "Error...En los datos del comprador!" });
                            })
                            //}
                        }
                        
                    }).catch(err => {
                        response.send({status:false, msj: "Error.. En los datos del restaurante!" });

                    })

                }

            }
        }).catch(err => {
            response.send({ msj: "Error...No se encontró el producto!" });
        })

    } else {
        response.send({ msj: "La peticion tiene que ser un POST" })
    }
});

//funcion para obtener los productos de un restaurante
export const getProductosPorRestaurante = functions.https.onRequest((request,response)=>{

    if(request.method == "GET"){
        let correo = request.query.correo
        if (correo == undefined){
            response.send({status:false,msj: "El dato esta indefinido" })
        }else{
            var listaP = [];
            productos.where("restaurante", "==", correo).get().then(prod =>{
                if(prod.empty){
                    response.send({ status:false,msj: "Hay error en los productos" })
                }else{
                  
                    for(let x = 0; prod.docs[x] != undefined; x++){

                        let prods = prod.docs[x].data();

                        listaP.push({
                            id:prod.docs[x].id,
                            nombre: prods.nombre,
                            descripcion:prods.descripcion,
                            categoria: prods.categoria,
                            precio: prods.precio,
                            imag: prods.imagen
    
                        })
                        if (prod.docs[x+1] == undefined) {
                            response.send({status:true, productos: listaP });
                        }
                    }
                }
                

            }).catch((err)=>{
                console.log(err)
                response.send({status:false,msj:"Error en los productos al buscar restaurante..."})
            })
        }
                                                                           
    }else{
        response.send({status:false, msj: "La petición tiene que ser un GET" })
    }
});



//obtener pedidos restaurante
export const getPedidosPorRestaurante = functions.https.onRequest((request,response)=>{

    if(request.method == "GET"){
        let correo = request.query.correo
        if (correo == undefined){
            response.send({status:false,msj: "El dato esta indefinido" })
        }else{
            var listaP = [];
            pedidos.where("restaurante", "==", correo).get().then(prod =>{
                if(prod.empty){
                    response.send({ status:false,msj: "Hay error en los productos" })
                }else{
                  
                    for(let x = 0; prod.docs[x] != undefined; x++){

                        let prods = prod.docs[x].data();

                        listaP.push({
                            id:prod.docs[x].id,
                            cantidad: prods.cantidad,
                            correo:prods.correo,
                            estado:prods.estado,
                            nombre: prods.nombre,
                            fecha:prods.fecha,
                            descripcion:prods.descripcion,
                            categoria: prods.categoria,
                            precio: prods.precio,
                            ubicacion:prods.ubicacion
                        })
                        if (prod.docs[x+1] == undefined) {
                            response.send({status:true, productos: listaP });
                        }
                    }
                }
                

            }).catch((err)=>{
                console.log(err)
                response.send({status:false,msj:"Error en los productos al buscar restaurante..."})
            })
        }
                                                                           
    }else{
        response.send({status:false, msj: "La petición tiene que ser un GET" })
    }
});

//modificar pedido
export const aceptarRechazarEntregarPedido = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        
        pedidos.doc(request.body.id).get().then(ped =>{
            let estado={
                proceso: request.body.proceso
            }
            pedidos.doc(request.body.id).set(
            {
                cantidad:ped.data().cantidad,
                categoria:ped.data().categoria,
                correo:ped.data().correo,
                descripcion:ped.data().descripcion,
                estado:estado,
                fecha:ped.data().fecha,
                nombre:ped.data().nombre,
                precio:ped.data().precio,
                restaurante:ped.data().restaurante,
                ubicacion:ped.data().ubicacion

            },{merge:true});
            response.send({status:true,mensaje: "Modificacion exitosa!"})
        })
    }
    else{
        response.send({status:false,msj:"Error en post"})
    }
});

export const crearPedidos = functions.https.onRequest((request,response)=>{
    if(request.method == "POST"){
        productos.doc(request.body.id).get().then(prod =>{
            let categoria=prod.data().categoria,
            descripcion=prod.data().descripcion,
            fecha = new Date(request.body.fecha),
            estado={
                proceso:"Sin asignar"
            }
            let ubicacion = genGeopoint(JSON.parse(request.body.ubicacion),true)
            console.log(request.body.restauranteCorreo)
            console.log(estado,prod.data().categoria+"Datitos"+ubicacion+prod.data().descripcion)
            pedidos.doc().set(
                {
                    cantidad : request.body.cantidad,
                    estado:estado,
                    categoria:categoria,
                    correo:request.body.correo,
                    descripcion:descripcion,
                    fecha:fecha,
                    nombre:request.body.nombre,
                    precio:request.body.precio,
                    restaurante:request.body.restauranteCorreo,
                    ubicacion:ubicacion
            })
            response.send({status:true,mensaje: "Se ha creado la insercion de producto..."});
        }).catch(error=>{
            response.send({status:false, msj:"Error al obtener productos",
                    cantidad : request.body.cantidad,
                    correo:request.body.correo,
                    fecha:request.body.fecha,
                    nombre:request.body.nombre,
                    precio:request.body.precio,
                    restaurante:request.body.restauranteCorreo,
        })
        })
    }
})

export const modificarCarrito = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        let carrito=[]
        compradores.doc(request.body.correo).update({
            carrito: carrito
        }).then(() => {
            response.send({ msj: "El producto ha sido agregado en el carrito" })
        }).catch(err => {
            response.send({ msj: "Error...el producto no ha sido agregado en el carrito" })
        })
    }
});

export const modificarUsuario = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        let ubicacion=genGeopoint(JSON.parse(request.body.ubicacion),true)
        let tarjeta={
            codigo:request.body.codigo,
            duenno:request.body.duenno,
            numero:request.body.numero,
            proveedor:request.body.proveedor,
            vencimiento:request.body.vencimiento,
        }
        compradores.doc(request.body.correo).update(
        {
                tarjeta:tarjeta,
                nombre:request.body.nombre,
                telefono:request.body.telefono,
                ubicacion:ubicacion
            
        }).then(() => {
            response.send({status:true, msj: "El producto ha sido agregado en el carrito" })
        }).catch(err => {
            response.send({ status:false,msj: "Error...el producto no ha sido agregado en el carrito" })
        })
    }
});