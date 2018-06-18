import { Component, OnInit } from '@angular/core';
import { MyService } from "../../services/service.service";
import { Productos, Categoria,Restaurantes, obtRestaurantes, userSession } from "../../models/models.interface";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { subscribeOn } from 'rxjs/operator/subscribeOn';


@Component({
  selector: 'app-publica',
  templateUrl: './publica.component.html',
  styleUrls: ['./publica.component.css']
})
export class PublicaComponent implements OnInit{

  visibleC=false;  
  visibleH=true;
  visibleCE=false;
  visibleR=false;
  visibleP=false;
  visibleEP=false;
  visibleMC= false;
  visiblePR=false

  constructor(
    private service:MyService,
    private route: ActivatedRoute,
    private router:Router,
  ){}
  ///-------------------///
  ngOnInit() {
    this.visibleH=true;
    this.visibleC=false;  
    this.visibleCE=false;
    this.visibleR=false;
    this.visibleP=false;
    this.visibleEP=false;
    this.visibleMC= false;
    this.visibleP=false;
    this.visiblePR=false
  }
  title = 'app';

  listaProductos:Productos[];
  categorias:Array<string>;
  listaRestaurante:Restaurantes[];
  listaCarrito:Productos[];

  //obtenemos el servici

  Home(){
    this.visibleH=true;
    this.visibleC=false;  
    this.visibleCE=false;
    this.visibleR=false;
    this.visibleP=false;
    this.visibleEP=false;
    this.visibleMC= false;
    this.visibleP=false;
    this.visiblePR=false

    //this.visibleAP=false;
  }

  eliminarProducto(i:number){
    alert("ocurrio un error")
  }

  MostrarMiCarrito(){
    this.service.getUsuario(this.usuario.correo)
    .subscribe(
      res =>{
        console.log(res)
        let respuesta =JSON.parse(JSON.stringify(res))
        this.listaCarrito = respuesta.usuarios.carrito
        console.log(this.listaCarrito)
    })

    this.visibleH=false;
    this.visibleC=false;  
    this.visibleCE=false;
    this.visibleR=false;
    this.visibleP=false;
    this.visibleEP=false;
    this.visibleMC= true;
    this.visiblePR=false;
  }

  i:number
  cant:number
  fecha:"June 16, 2018, 14:00:00 UTC-6"
  usuario = JSON.parse(sessionStorage.getItem("Usuario"));
  tarjetaU:number

  sacarDeCarrito(indice:number){
    this.listaCarrito.splice(indice,1)
    console.log(this.listaCarrito)
    this.service.sacarDeCarrito(this.usuario.correo,this.listaCarrito).subscribe(res=>{
      console.log(res)
      let respuesta= JSON.parse(JSON.stringify(res))
      if(!respuesta.status){
        alert("Ocurrio un error")
      }
    })
  }
  
  crearPedido(){
    
    if(this.tarjetaU==this.usuario.tarjeta.numero){
      for(let prod of this.listaCarrito){
        
        let p=JSON.parse(JSON.stringify(prod))
        let ubicacion ="["+p.ubicacion._latitude+","+p.ubicacion._longitude+"]"
        console.log(p.idProducto,p.cantidad,this.usuario.correo,
          this.fecha,p.nombre,p.precio,p.restaurante,
          p.ubicacion)
        this.service.crearPedidos(p.idProducto,p.cantidad,this.usuario.correo,
        this.fecha,p.nombre,p.precio,p.restaurante,
        ubicacion).subscribe(res=>{
          let respuesta=JSON.parse(JSON.stringify(res))
          console.log(respuesta)
          if(!respuesta.status){
            alert("Ocurrio un error")
          }
          else{
            console.log("inserto")
            this.listaCarrito=[];
            
            this.service.eliminarCarrito(this.usuario.correo)
            .subscribe(res=>{
                console.log(res)
            })
            this.MostrarMiCarrito()

          }
        })
      }

    }
    else{
      alert("Esta tarjeta no coincide con la del usuario")
    }
  }


  AgregarCarrito(producto:Productos){
    //revisar que el session este activado si no mandar a logear
    console.log(producto.id);
    if (this.usuario==null){
      //debe iniciar session
      this.router.navigate([""]);
      console.log(producto.id);
    }
    else{
      let ubicacion=JSON.stringify ([this.usuario.ubicacion._latitude,this.usuario.ubicacion._longitude])
      this.service.agregarCarrito(this.usuario.correo,this.cant,ubicacion,this.fecha,producto.id)
      .subscribe(res=>{
        let respuesta=JSON.parse(JSON.stringify(res))
        console.log(respuesta) 
        if(!respuesta.status){
          alert("Ocurrio un error agregando el producto")
        }
        else{
          alert("Producto agregado")
        }
      })
      //ya inicio session
    }
    //al estar activo se puede guardar en carrito
    

    
  }
  MostrarProductos(){
    this.visibleP= true;
  }
  
  ubicacion:"[0,0]"
  EditarPerfil(){
    console.log(this.usuario.correo,this.usuario.tarjeta.codigo,this.usuario.tarjeta.duenno,this.usuario.tarjeta.numero,this.usuario.tarjeta.proveedor,
    this.usuario.tarjeta.vencimiento,this.usuario.nombre,this.usuario.telefono,this.ubicacion)
    this.service.ModificarComprador(this.usuario.correo,this.usuario.tarjeta.codigo,this.usuario.tarjeta.duenno,this.usuario.tarjeta.numero,this.usuario.tarjeta.proveedor,
      this.usuario.tarjeta.vencimiento,this.usuario.nombre,this.usuario.telefono,this.ubicacion)
      .subscribe(res=>{
        let respuesta=JSON.parse(JSON.stringify(res))
        if(!respuesta.status){
          alert("Existe un dato erroneo")
        }
        else{
          alert("insertado correctamente")
        }
        console.log(res)
    })
    this.visibleH=false;
    this.visibleC=false;  
    this.visibleCE=false;
    this.visibleR=false;
    this.visibleEP=false;
    this.visibleMC= false;
    this.visibleP=true;
    this.visiblePR=false

  }




  MostrarPerfil(){
    console.log(this.usuario)


    this.visiblePR=false    
    this.visibleH=false;
    this.visibleC=false;  
    this.visibleCE=false;
    this.visibleR=false;
    this.visibleEP=false;
    this.visibleMC= false;
    this.visibleP=true;


    

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
    .subscribe(res =>{
        this.listaProductos= res.productos
    })

    this.visibleEP=false;
    this.visibleC=false;
    this.visibleCE=true;
  }
  
  MostrarRestaurante(){
    this.listaRestaurante=[];

    this.service.getRestaurantes()
    .subscribe(res=>{ 

        this.listaRestaurante = res.restaurantes
        console.log(this.listaRestaurante);
    })

    this.visibleEP=false;
    this.visibleC=false;
    this.visibleH=false;
    this.visibleCE=false;
    this.visibleR=true;
  }

  ProductosPorRestaurante(restaurante){
    console.log(restaurante.correo)
    this.listaProductos=[]
    this.service.getProductosPorRestaurante(restaurante.correo)
    .subscribe(res=>{
      if(!res.status){
        console.log(res.status);
        alert("Esta restaurante no tiene productos agregados")
      }
      else{
        this.listaProductos=res.productos;
        console.log(this.listaProductos);
        this.visibleEP=false;
        this.visibleC=false;
        this.visiblePR=true;  
        this.visibleH=false;
        this.visibleCE=false;
        this.visibleR=false;
        this.visibleP=false;
        this.visibleEP=false;
        this.visibleMC=false;
      }

    })
  }
}

