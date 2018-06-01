
import { Component } from '@angular/core';
import { MyService } from "./services/service.service";
import { Productos, Categoria,Restaurantes, obtRestaurantes } from "./models/models.interface";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  listaProductos:Productos[];
  categorias:Array<string>;
  listaRestaurante:Restaurantes[];
 
  visibleC=false;  
  visibleH=true;
  visibleCE=false;
  visibleR=false;
  //obtenemos el servicio
  constructor(private service:MyService){ }

  Home(){
    this.visibleH=true;
    this.visibleC=false;
    this.visibleCE=false;
  }
  MostrarCategorias(){
    this.categorias=[]
    this.service.getCategorias()
    .subscribe(
      res =>{
        let resultado = JSON.parse(JSON.stringify(res))
        this.categorias= resultado.categorias;
      });

    this.visibleH=false;
    this.visibleC=true;
  }

  MostrarCategoriaElegida(indice:number){
    this.listaProductos=[];
    console.log(this.categorias[indice]);
    this.service.getProductos(this.categorias[indice])
    //esta metiendo lo que el mae manda
    .subscribe(
      res =>{
        this.listaProductos = res.productos
        console.log(this.listaProductos);
      }
    )

    
    this.visibleC=false;
    this.visibleCE=true;
  }
  
  MostrarRestaurante(){
    this.listaRestaurante=[];

    this.service.getRestaurantes()
    .subscribe(
      res=>{ 
        this.listaRestaurante = res.restaurantes
        console.log(this.listaRestaurante);
      }
    )


    this.visibleC=false;
    this.visibleH=false;
    this.visibleCE=false;
    this.visibleR=true;
  }
}