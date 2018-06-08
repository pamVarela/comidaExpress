import { Observable } from "rxjs/Observable";



export interface Categoria {
    productos:Productos[]
}
export interface Productos{
    nombre: string,
    descripcion: string,
    imagen:string,
    precio: number;
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