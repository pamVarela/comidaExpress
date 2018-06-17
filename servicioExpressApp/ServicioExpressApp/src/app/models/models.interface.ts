import { Observable } from "rxjs/Observable";


export interface Categoria {
    productos:Productos[]
}

export interface Categoria1 {
    status:"",
    productos:Productos[]
}

export interface Productos{
    id: string,
    nombre: string,
    descripcion: string,
    img:string,
    precio:number,
    categoria: string,
    restaurante:
    {
        id: string,
        nombre: string
    }
}

export interface obtRestaurantes{
    restaurantes: Restaurantes[]
}

export interface Restaurantes{
    descripcion: string,
    nombre: string,
    imagen: string,
    ubicacion: string
}

export class userSession{
    nombre:string
    correo:string
}

export class userInfo{
    carrito:{}
    nombre:string
    correo:string    
    tarjeta:
    {
        codigo:number,
        dueño:string,
        numero:string,
        proveedor:string,
        vencimiento:string
    }
    teléfono:string
    ubicación:string
}
