import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyService } from '../../services/service.service';
import { Categoria,Categoria1, Productos } from '../../models/models.interface';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private service:MyService) { }
  
  visibleP=false;  
  visibleH=true;
  visiblePe=false;
  visibleEP=false;  
  userSession
  ubicacion: ""
  listaPedidos:Categoria
  listaProductos:Productos[]
  index:number


  ngOnInit() {
    this.userSession=JSON.parse(sessionStorage.getItem("Usuario"));
    console.log(this.userSession)
  }
  

  mostrarPedidos(){
    this.visibleP=false;  
    this.visibleH=false;
    this.visiblePe=true;
    this.visibleEP=false;   
    
    this.service.getPedidos(this.userSession.correo)
    .subscribe(res=>{
      let respuesta=JSON.parse(JSON.stringify(res))
      if(!respuesta.status){
        alert("No tiene pedidos pendientes")
      } 
      else{
        this.listaPedidos=respuesta.productos
        console.log(this.listaPedidos)
      }
    })
  }
  
  aceptarRechazarPedido(pedido:number,opt:number){
    let proceso=""
    if(opt==1){
      proceso="aceptado";
    }
    else if(opt==0){
      proceso="rechazado";
    }
    else{
      proceso="entregado";
    }

      this.service.aceptarRechazarPedido(this.listaPedidos[pedido].id,proceso).subscribe(res=>{
        let resultado=JSON.parse(JSON.stringify(res))
        if(!resultado.status){
          alert("Ocurrio un error")
        }
        else{
          alert("Estado cambiado")
        }
        this.mostrarPedidos()
    })
  }

  mostrarProductos(){
    this.visibleP=true;  
    this.visibleH=false;
    this.visiblePe=false; 
    this.visibleEP=false;   
     
    this.service.getProductosPorRestaurante(this.userSession.correo).subscribe(res=>{
      if(!res.status){
        alert("Error al cargar productos")
      }
      else{
        this.listaProductos=res.productos
        console.log(this.listaProductos)
      }
    })
  }
//insertar nuevo producto
  nuevoNombre
  nuevoCategoria
  nuevoDescripcion
  nuevoPrecio
  nuevoImagen
//editar producto
  id
  categoria
  descripcion
  precio
  imag
  nombre

  abrirVentanaEditar(index:number){
    this.visibleP=false;  
    this.visibleH=false;
    this.visiblePe=false; 
    this.visibleEP=true; 
    this.id=this.listaProductos[index].id,
    this.categoria=this.listaProductos[index].categoria
    this.descripcion=this.listaProductos[index].descripcion
    this.precio=this.listaProductos[index].precio
    //this.imag=this.listaProductos[index].imag
    this.nombre=this.listaProductos[index].nombre
    this.index=index

    console.log(
      this.id+ this.categoria+ this.descripcion+ this.precio+ this.imag+this.nombre+this.index
    )
  }

  insertarProducto(){
    console.log(this.nuevoCategoria, this.nuevoDescripcion, this.nuevoPrecio, this.nuevoImagen,this.nuevoNombre,this.userSession.correo)
    this.service.insertarProducto(this.nuevoCategoria, this.nuevoDescripcion, this.nuevoPrecio, this.nuevoImagen,this.nuevoNombre,this.userSession.correo)
    .subscribe(res=>{
      let respuesta=JSON.parse(JSON.stringify(res))
      if(!respuesta.status){
        console.log(res)
        alert("No se pudo insertar. Verifique sus datos por favor")
      }
      else{
        this.mostrarProductos()
      }
    })
  }

  regresar(){
    this.mostrarProductos()
  }

  editarProducto(){
    this.service.modificarProducto(
      this.id, this.categoria, this.descripcion, this.precio, this.imag, this.nombre,this.userSession.correo)
      .subscribe(res=>{
        let respuesta=JSON.parse(JSON.stringify(res))  
        if (!respuesta.status){
          alert("Error al intentar hacer esta operacion")
        }
        else{
          this.mostrarProductos()
        }
      })
    }

  eliminarProducto(indice:number){
    this.service.eliminarProducto(this.listaProductos[indice].id).subscribe(res=>{
      let respuesta= JSON.parse(JSON.stringify(res))
      if (!respuesta.status){
        alert("ocurrio un error")
      }
      else{
        this.mostrarProductos()
      }
    })
  }

  obtenerPerfil(){
    this.visibleP=false;  
    this.visibleH=true;
    this.visiblePe=false;  
  
  }

  editarPerfil(){
      let ubicacion="["+this.userSession.ubicacion._latitude+","+this.userSession.ubicacion._longitude+"]"
      console.log(this.userSession.id,this.userSession.contrasenna,this.userSession.correo, this.userSession.descripcion, this.userSession.fin,
        this.userSession.inicio,this.userSession.img,this.userSession.nombre, this.userSession.telefono, ubicacion)

    this.service.modificarEmpresa(this.userSession.id,this.userSession.contrasenna,this.userSession.correo, this.userSession.descripcion, this.userSession.fin,
      this.userSession.inicio,this.userSession.img,this.userSession.nombre, this.userSession.telefono, ubicacion)
    .subscribe(res=>{
      let respuesta= JSON.parse(JSON.stringify(res))
      console.log(respuesta)
      if(!respuesta.status){
        alert("Uno de los datos esta insertado de manera incorrecta")
      }
      else{                
        alert("Restaurante modificado")
        //guardando en local storage
        sessionStorage.setItem("Usuario",JSON.stringify(this.userSession));
      }
    })
  }
}
