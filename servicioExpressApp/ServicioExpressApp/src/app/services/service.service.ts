import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Productos, Categoria1,Categoria, obtRestaurantes,Restaurantes } from "../models/models.interface";

@Injectable()
export class MyService{
    /*injectando el servicios client a nuuestro servicios
    para usar nuestras funciones mas directamente*/ 
    url:string="http://localhost:5000/"
    constructor(private service:HttpClient){ }
    
    public getProductos( categoria: string){
        let data={"categoria":categoria};
        console.log(categoria)
        return this.service.get<Categoria>(this.url+"getListaProductosCategoria",{params:data})
    }
    
    public getProductosPorRestaurante( correo: string){
        let data={"correo":correo};
        return this.service.get<Categoria1>(this.url+"getProductosPorRestaurante",{params:data})
    }

    public eliminarProducto(id:string){
        return this.service.post(this.url+"eliminarProducto",{id:id})
    }

    public modificarProducto(id:string,categoria:string, descripcion:string, precio:number, imagen:string,nombre:string,restaurante:string){
        
        return this.service.post(this.url+"modificarProducto",{
            id:id,
            categoria: categoria,
            nombre:nombre,
            descripcion: descripcion,
            imagen: imagen,
            restaurante: restaurante,
            precio: precio
        })
    }

    public insertarProducto(categoria:string, descripcion:string, precio:number, imagen:string,nombre:string,restaurante:string){
        return this.service.post(this.url+"crearProducto",{
            categoria: categoria,
            nombre:nombre,
            descripcion: descripcion,
            imagen: imagen,
            restaurante: restaurante,
            precio: precio})
    }

    public getCategorias(){
        return this.service.get<string>(this.url+"ListaCategorias")
    }

    public getRestaurantes(){
        return this.service.get<obtRestaurantes>(this.url+"GetRestaurantes")
    }
    

    public crearPedidos(id:string,cantidad:number,correo:string,fecha:string,nombre:string,precio:number,
            restauranteCorreo:string,ubicacion:string
    ){
        return this.service.post(this.url+"/crearPedidos",{
            id:id,
            cantidad:cantidad,
            correo:correo,
            fecha:fecha,
            nombre:nombre,
            precio:precio,
            restauranteCorreo:restauranteCorreo,
            ubicacion:ubicacion
        })
    }

    public getPedidos(correo:string){
        let data= {correo:correo}
        return this.service.get(this.url+"getPedidosPorRestaurante",{params:data})
    }

    public aceptarRechazarPedido(id:string,proceso:string){
        return this.service.post(this.url +"aceptarRechazarEntregarPedido",{
            id:id,
            proceso:proceso})
    }

    public getUsuario(correo:string){
        let data={"correo":correo}
        return this.service.get(this.url+"getUsuario",{params:data})
    }

    public eliminarCarrito(correo:string){
        return this.service.post(this.url+"modificarCarrito",{
            correo:correo
        })
    }

    public agregarCarrito(claveComprador:string,cantidad:number,ubicacion:string,fecha:string,claveProducto:string){
        return this.service.post(this.url+"agregarProductoCarrito",{
            claveComprador:claveComprador,
            cantidad:cantidad,
            ubicacion:ubicacion,
            fecha:fecha,
            claveProducto:claveProducto
        })
    }

    public crearUsuarioComprador(
        correo:string , nombre:string, codigo:number , duenno:string,numero:string,
        proveedor:string , vencimiento:string,telefono:string, ubicacion:string,contrasenna:string){
        console.log({
            correo:correo,
            nombre:nombre,
            codigo:codigo,
            duenno:duenno,
            numero:numero,
            proveedor:proveedor,
            vencimiento:vencimiento,
            telefono:telefono,
            ubicacion:ubicacion,
            contrasenna:contrasenna
        })
        return this.service.post(this.url+"crearUsuario",{
            correo:correo,
            nombre:nombre,
            codigo:codigo,
            duenno:duenno,
            numero:numero,
            proveedor:proveedor,
            vencimiento:vencimiento,
            telefono:telefono,
            ubicacion:ubicacion,
            contrasenna:contrasenna
        })
    }

    public modificarEmpresa(id:string,contrasenna:string,correo:string, descripcion:string, fin:string,
            inicio:string,img:string,nombre:string, telefono:string, ubicacion:string){
        return this.service.post(this.url+"ModificarRestaurante",{
            id:id,
            contrasenna:contrasenna,
            correo:correo,
            descripcion:descripcion,
            fin:fin,
            inicio:inicio,
            img:img,
            nombre:nombre,
            telefono:telefono,
            ubicacion:ubicacion})
    }

    public crearEmpresa(
        fin:string, inicio:string, nombre:string, descripcion:string,
        telefono:string,imagen:string, correo:string, ubicacion:string,contrasenna:string
    ){
        return this.service.post(this.url+"CrearRestaurantes",
        {
            fin: fin,
            inicio:inicio,
            nombre:nombre, 
            descripcion:descripcion,
            telefono:telefono,
            imagen: imagen,
            correo:correo,
            ubicacion:ubicacion,
            contrasenna:contrasenna
        })

    }
    public getUnRestaurante(correo:string){
        let data={"correo":correo}
        return this.service.get(this.url+"getUnRestaurante",{params:data})   
    }
    public ModificarComprador(correo:string,codigo:string,duenno:string,numero:number,proveedor:string,vencimiento:string,nombre:string,telefono:string,ubicacion:string){
        return this.service.post(this.url+"modificarUsuario",{
            correo:correo,
            codigo:codigo,
            duenno:duenno,
            numero:numero,
            proveedor:proveedor,
            vencimiento:vencimiento,
            nombre:nombre,
            telefono:telefono,
            ubicacion:ubicacion
        })
    }
}

