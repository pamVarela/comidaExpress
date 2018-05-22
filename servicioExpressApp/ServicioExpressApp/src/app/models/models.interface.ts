import { Observable } from "rxjs/Observable";



export interface Categoria {
    productos:Productos[]
}
export interface Productos{
    nombre: String,
    descripcion: String,
    img:String,
    restaurante:
    {
        id: String,
        nombre: String
    }
}
export interface obtRestaurantes{
    id:Array<string>
}

export interface Restaurantes{
    descripcion: string
    nombre: string
    ubicacion: string
}