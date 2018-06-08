import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Productos, Categoria, obtRestaurantes,Restaurantes } from "../models/models.interface";

@Injectable()
export class MyService{
    /*injectando el servicios client a nuuestro servicios
    para usar nuestras funciones mas directamente*/ 
    
    //url:string="https://servicioexpress-e4da9.firebaseapp.com/"
    url:string="http://localhost:5000/"
    constructor(private service:HttpClient){ }
    
    public getProductos( categoria: string){
        let data={"categoria":categoria};
        return this.service.get<Categoria>(this.url+"getListaProductosCategoria",{params:data})
    }
    
    public getCategorias(){
        return this.service.get<string>(this.url+"ListaCategorias")
    }

    public getRestaurantes(){
        return this.service.get<obtRestaurantes>(this.url+"GetRestaurantes")
    }
}