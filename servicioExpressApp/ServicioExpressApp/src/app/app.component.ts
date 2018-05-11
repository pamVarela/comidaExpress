import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  categorias=["carnes", "Queques", "Bebidas", "Comida Verde"];
  restaurantes=["Dingos", "KFC", "Chinitos"];
  visibleC=false;
  visibleH=true;
  visibleCE=false;
  visibleR=false;
  productos=[{nombre:"nombre del producto #1", descripcion:"descripcion #1", restaurante:[{nombre: "nombre restaurante"}]},{nombre:"nombre del producto #1", descripcion:"descripcion #1", restaurante:[{nombre: "nombre restaurante"}]},{nombre:"nombre del producto #1", descripcion:"descripcion #1", restaurante:[{nombre: "nombre restaurante"}]}];
  

  Home(){
    this.visibleH=true;
    this.visibleC=false;
    this.visibleCE=false;
  }
  MostrarCategorias(){
    //this.categorias=[]
    this.visibleH=false;
    this.visibleC=true;
  }

  MostrarCategoriaElegida(){
    //this.productos=[];
    this.visibleC=false;
    this.visibleCE=true;
  }
  MostrarRestaurante(){
    this.visibleC=false;
    this.visibleH=false;
    this.visibleCE=false;
    this.visibleR=true;
  }
}