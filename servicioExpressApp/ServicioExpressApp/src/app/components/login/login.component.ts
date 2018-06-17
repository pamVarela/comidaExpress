import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { MyService } from "../../services/service.service";
import { AthenticationService } from "../../services/Authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private authorization: AthenticationService,  
    private service:MyService
  ) { }

  ngOnInit() {
    //this.valor = this.route.snapshot.params['valor'];
  }
  checkR:boolean
  checkC:boolean
  password:string
  email:string

  userSession={
      username:"",
      email:"",
      contrasenna:""
  }  

  EntrarLibre(){
    this.router.navigate(["/components/publica"]);
  }

  LogIn(){
    this.authorization.login()
      .then((data)=>{

        this.userSession.username = data.user.displayName,
        this.userSession.email = data.user.email
        
        //guardando en local storage
        sessionStorage.setItem("Usuario",JSON.stringify( this.userSession));
        console.log("Guardado con exito");


        this.service.getUsuario(this.userSession.email)
        .subscribe(
          res =>{
            let resultado = JSON.parse(JSON.stringify(res))
            console.log(resultado)
            if(!resultado.status){
              //lo regresa al login
              this.service.getUnRestaurante(this.userSession.email)
              .subscribe(res =>{
                  let resultado = JSON.parse(JSON.stringify(res));
                  if (!resultado.status){
                    sessionStorage.clear();
                    alert("Este correo esta registrado")
                  }
                  else{
                    let userSessionEmpresa={
                      id:resultado.restaurantes.id,
                      contrasenna:resultado.restaurantes.contrasenna,
                      correo:resultado.restaurantes.correo,
                      descripcion:resultado.restaurantes.descripcion,
                      fin:resultado.restaurantes.horario.fin,
                      inicio:resultado.restaurantes.horario.inicio,
                      img:resultado.restaurantes.img,
                      nombre:resultado.restaurantes.nombre,
                      telefono:resultado.restaurantes.telefono,
                      ubicacion: resultado.restaurantes.ubicacion                  
                    }         
                    //guardando en local storage
                    sessionStorage.setItem("Usuario",JSON.stringify(userSessionEmpresa));
                    this.router.navigate(["components/restaurante"]);                  
                  }
              })
            }
            else{

              let userSessionUsuario={
                correo:resultado.usuarios.correo,
                nombre:resultado.usuarios.nombre,
                tarjeta:resultado.usuarios.tarjeta,
                telefono:resultado.usuarios.telefono,
                ubicacion:resultado.usuarios.ubicacion,
                contrasenna:resultado.usuarios.contrasenna
              }
              sessionStorage.setItem("Usuario",JSON.stringify(userSessionUsuario));
              this.router.navigate(["/components/publica"]);
              //aqui se agragan a la clase y session
              }
          });
        console.log("Realizado con exito");
        //obtener datos de firebase para ver si existe
      }).catch(
        (error)=>{
          console.log("Error");
          alert("Ocurrio un error")
      })
  }

  LogInGeneralUsuario(){
    console.log(this.email)
    this.service.getUsuario(this.email)
        .subscribe(
          res =>{
            console.log(res)
            let resultado = JSON.parse(JSON.stringify(res));
            if (!resultado.status){
              alert("Usted no esta registrado")

            }
            else{
              
              if(this.password!=resultado.usuarios.contrasenna || this.email!=resultado.usuarios.correo){
                alert("La contreseña es incorrecta")
              }
              else{

                //guardando en local storage
                let userSessionUsuario={
                  correo:resultado.usuarios.correo,
                  nombre:resultado.usuarios.nombre,
                  tarjeta:resultado.usuarios.tarjeta,
                  telefono:resultado.usuarios.telefono,
                  ubicacion:resultado.usuarios.ubicacion,
                  contrasenna:resultado.usuarios.contrasenna
                }
                sessionStorage.setItem("Usuario",JSON.stringify(userSessionUsuario));
                console.log(sessionStorage.getItem("Usuario"))
                console.log("Guardado con exito");
                this.router.navigate(["/components/publica"]);
            }
          }
        })
  }

  LogInGeneralRestaurante(){
    console.log(this.email)
    this.service.getUnRestaurante(this.email)
        .subscribe(
          res =>{

            let resultado = JSON.parse(JSON.stringify(res));
            console.log(resultado)

            if (!resultado.status){
              alert("Su empresa no se encuentra registrada")

            }
            else{
              if(this.password != resultado.restaurantes.contrasenna || this.email!=resultado.restaurantes.correo){
                alert("Contraseña es incorrecta")
              }
              else{
                let userSessionEmpresa={
                  id:resultado.restaurantes.id,
                  contrasenna:resultado.restaurantes.contrasenna,
                  correo:resultado.restaurantes.correo,
                  descripcion:resultado.restaurantes.descripcion,
                  fin:resultado.restaurantes.horario.fin,
                  inicio:resultado.restaurantes.horario.inicio,
                  img:resultado.restaurantes.img,
                  nombre:resultado.restaurantes.nombre,
                  telefono:resultado.restaurantes.telefono,
                  ubicacion: resultado.restaurantes.ubicacion                  
                }         
                //guardando en local storage
                sessionStorage.setItem("Usuario",JSON.stringify(userSessionEmpresa));
                console.log("Guardado con exito");
                this.router.navigate(["components/restaurante"]);
              }
            }
        })
  }

  LogOut(){
    this.authorization.logout();
    sessionStorage.clear();
  }

  Registrarse( ){
    this.router.navigate(["components/registro"]);
  }

}
/*              let correo = this.userSession.email,
              nombre = this.userSession.username,
              codigo:123,//number,
              dueño:"Jurguen",//string,
              numero:"1234",//string,
              proveedor:"BCR",//string,
              vencimiento:"30/20",//string,
              telefono: "12234123",//string,
              ubicacion:"[1,2]"//string

              this.service.crearUsuarioComprador(
                correo , nombre, codigo , dueño,
                numero , proveedor , vencimiento,
                telefono, ubicacion
              ).subscribe(result=>{                  
                alert({"resultado":resultado.status,res:result});
              });
              */ 