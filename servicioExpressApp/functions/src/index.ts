import * as functions from 'firebase-functions';
import { request } from 'https';

//CONECTAR a la BD en firebase
//const async = require ('async');
const admin = require ('firebase-admin');

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

//crea usuario
export const crearUsuario = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        restaurante.add(
            {
                nombre:request.body.nombre,
                descripcion:request.body.descripcion,
                ubicacion:request.body.ubicacion
            });
        response.send({status:true,data:"Insertado"})
    }
});

//obtiene los restaurantes
export const getRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "GET"){
        restaurante.get().then(snapshot =>{
            var listaRestaurantes = [];
            snapshot.forEach( restaurante =>{
                listaRestaurantes.push(restaurante.id);
            })
            response.send({id:listaRestaurantes});
        }).catch(err=>{
            response.send({error:"Error al cargar datos"});
        })
    }
});  
//crear restaurante
export const crearRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        restaurante.add(
            {
                descripcion:request.body.descripcion,
                nombre:request.body.nombre,
                ubicacion:request.body.ubicacion
            });
        response.send({status:true,data:"Insertado"})
    }
});
//modificar datos
export const modificarRestaurante = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        restaurante.doc(request.body.id).set(
            {
                descripcion: request.body.descripcion,
                nombre: request.body.nombre,
                ubicacion: request.body.ubicacion
            },{merge:true});
            response.send({status:"Editado exitoso"})
        }
    else{
        response.send({status:"Error en post"})
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

//crear categoria
export const crearCategoria = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        if(request.body.id==undefined){
           response.send({error: "El body se encuentra vacio"});
        } 
        var list=[]
        categorias.doc(request.body.id).set({
            productos: list
        });
        response.send({Status: "insertada"});
    }
});
//eliminar categoria
export const eliminarCategoria = functions.https.onRequest((request, response) => {
    if(request.method == "POST"){
        if(request.body.id==undefined){
            response.send({error: "el body se encuentra vacio"});
        } 
        categorias.doc(request.body.id).delete().then(function(){
            response.send({status:true,data:"eliminado"});
        })
    }
    else{
        response.send({status:"Error en post"})
    }
});


/*
export const subirImagenPlat = functions.https.onRequest((request, response) => {
    if (request.method === 'POST') {
        let keyPlat=request.body.keyPlat //clave de platillo
        var img = request.body.img //base64
        if(keyPlat==undefined || img==undefined || !Buffer.from(img, 'base64').toString('base64')===img){
            response.send({status:false,data:"Platillo o imagen no valido"})
            return;
        }
        platillos.doc(keyPlat).get().then(snapshot =>{
            if(!snapshot.exists){
                response.send({status:false,data:"El platillo solicitado no existe"})
                return
            }
            var mimeType = 'image/jpeg',
            fileName = keyPlat+'.jpg',
            imageBuffer = new Buffer(img, 'base64');
            var file = bucket.file('platillos/' + fileName);
            file.save(imageBuffer,{
                metadata: {contentType: mimeType}}, 
                error => {
                if (error) {
                    response.send({status:false,data:'No se pudo subir la imagen.'});
                }
                file.acl.add({
                    entity: 'allUsers',
                    role: gcs.acl.READER_ROLE //gcs ->'@google-cloud/storage'
                    },
                    function(err, aclObject) {
                        if (!err){
                            let URL = "https://storage.googleapis.com/designexpresstec.appspot.com/" + file.id;
                            platillos.doc(keyPlat).set({imagen:URL},{merge:true})
                            response.send({status:true,data:URL});
                        }
                        else
                            response.send({status:false,data:"No se pudieron establecer los servicios: " + err});
                    });
            });
        }).catch(err =>{response.send({status:false,data:"Error obteniendo el platillo"})})
    } else  response.send({status:false,data:"Solo se admite POST"});
})
*/
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
export const getListaProductosCategoria = functions.https.onRequest((request,response) => {
    if(request.method == "GET"){
        //request.body.name
        if(request.query.categoria==undefined){
            response.send({error: "Error al traer datos"});
        }
        categorias.doc(request.query.categoria).get().then(snapshot =>{
            var lista = [];
            for (let x = 0 ; snapshot.data().productos[x] != undefined; x++){

                restaurante.doc(snapshot.data().productos[x].restaurante).get().then(restaurante =>{
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
