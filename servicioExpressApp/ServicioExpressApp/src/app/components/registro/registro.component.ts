import { Component, OnInit } from '@angular/core';
import { MyService } from "../../services/service.service";
import { Productos, Categoria,Restaurantes, obtRestaurantes } from "../../models/models.interface";
import {Router, ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private service:MyService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  }
  //vistas
  visibleR=false;
  visibleC= false;
  visible = true;
  //valores globales para el usuario
  email=""
  nombre=""
  password=""
  numeroTarjeta=""
  telefono=""
  ubicacion=""
  codigo
  proveedor=""
  vencimiento=""


//datos empresa
  fin:""
  inicio:""
  correoEmpresa=""
  descripcionEmpresa=""
  imgEmpresa=""
  nombreEmpresa=""
  telefonoEmpresa=""
  ubicacionEmpresa=""
  contrasennaEmpresa=""
  crearUsuario(){
    this.visibleR=false;
    this.visibleC= true;
    this.visible = false;
  }

  //insertando usaurio comprador
  insertarUsuario(){  
    this.service.getUsuario(this.email)
    .subscribe(res=>
    {
      let respuesta= JSON.parse(JSON.stringify(res));
      console.log(respuesta)
      if (respuesta.status){
        alert("El usuario ya esta registrado. Regrese al login principal")
      }

      else{      
        this.service.crearUsuarioComprador(
          this.email , this.nombre, this.codigo ,this.nombre,this.numeroTarjeta,
          this.proveedor, this.vencimiento,this.telefono, this.ubicacion,this.password)
          .subscribe( res=>
          {
            console.log(res)
            let respuesta= JSON.parse(JSON.stringify(res))
            if(respuesta.status){
              alert("El usuario se inserto exitosamente");
              this.router.navigate([""]);
            }
            else{
              alert("Ocurrio un error al intentar insertarlo");
            }
        });
      }

    })
  }

  regresar(){
    this.router.navigate([""]);
  }

  crearEmpresa(){
    this.visibleR=true;
    this.visibleC= false;
    this.visible = false;
  }
  

  insertarEmpresa(){  
    console.log(this.email)
    //calida si existe restaurante en la base
    this.service.getUnRestaurante(this.correoEmpresa)
    .subscribe(res=>{
        let respuesta= JSON.parse(JSON.stringify(res))
        console.log(respuesta.restaurantes)
        if (respuesta.restaurantes!=undefined){
          alert("Esta empresa ya esta registrada. Regrese al login principal");
        }
        else{
          //crea empresa si no se ha agreagdo una antes          
          this.service.crearEmpresa(
            this.fin,this.inicio,this.correoEmpresa,this.descripcionEmpresa,
            this.imgEmpresa,this.nombreEmpresa,this.telefonoEmpresa,
            this.ubicacionEmpresa,this.contrasennaEmpresa
          )
          .subscribe( res=>
          {
            let respuesta= JSON.parse(JSON.stringify(res))
            if(respuesta.status){
              alert("El usuario se inserto exitosamente");
              this.router.navigate([""]);
            }
            else{
              alert("Ocurrio un error al intentar insertarlo");
            }
          });
        }
    })
  }
  
}
