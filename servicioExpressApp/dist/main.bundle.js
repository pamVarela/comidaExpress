webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".btn{\n\n    width:100%;\n    height:80px;\n    border-color:#fd7e14;\n}\n\n.botonHome{\n\n    width:450px;\n    height:60px;\n    background-color:#D35400; \n    border-color:#fd7e14;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    margin-left:32%; \n    border-radius: 10px;\n}\n\n.imagen{\n    width: \"200px\";\n    height: \"50px\"\n}\n\n.contenedorHome{\n\n    -ms-flex-line-pack: center;\n\n        align-content: center;\n}\n\n.navbar{\n    background-color:#D35400;\n}\n\n@media screen and (max-width:640px){\n    .botonHome{\n        width: 250px;\n        margin-left: 23%; \n    }\n    .contenedorProducto{\n        width: 350px;\n        margin-left: 8%; \n    }\n    \n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <router-outlet>\n\n    </router-outlet>\n</div>\n<"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var service_service_1 = __webpack_require__("./src/app/services/service.service.ts");
var Authentication_service_1 = __webpack_require__("./src/app/services/Authentication.service.ts");
var angularfire2_1 = __webpack_require__("./node_modules/angularfire2/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var database_1 = __webpack_require__("./node_modules/angularfire2/database/index.js");
var auth_1 = __webpack_require__("./node_modules/angularfire2/auth/index.js");
var login_component_1 = __webpack_require__("./src/app/components/login/login.component.ts");
var restaurante_component_1 = __webpack_require__("./src/app/components/restaurante/restaurante.component.ts");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var publica_component_1 = __webpack_require__("./src/app/components/publica/publica.component.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var registro_component_1 = __webpack_require__("./src/app/components/registro/registro.component.ts");
exports.firebaseConfig = {
    apiKey: "AIzaSyD0BCFIaeyZb6voEQYn6hW2DfAz_MnVORk",
    authDomain: "servicioexpress-e4da9.firebaseapp.com",
    databaseURL: "https://servicioexpress-e4da9.firebaseio.com",
    storageBucket: "servicioexpress-e4da9.appspot.com",
    messagingSenderId: "632191827663"
};
var routes = [
    //this.router.navigate(["/system/login"]);
    { path: '', component: login_component_1.LoginComponent },
    { path: 'components/publica', component: publica_component_1.PublicaComponent },
    { path: 'components/restaurante', component: restaurante_component_1.RestauranteComponent },
    { path: 'components/registro', component: registro_component_1.RegistroComponent }
];
var AppRoutingModule = router_1.RouterModule.forRoot(routes, { useHash: true });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                publica_component_1.PublicaComponent,
                restaurante_component_1.RestauranteComponent,
                registro_component_1.RegistroComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                AppRoutingModule,
                http_1.HttpClientModule,
                auth_1.AngularFireAuthModule,
                database_1.AngularFireDatabaseModule,
                angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
                forms_1.FormsModule
            ],
            providers: [service_service_1.MyService, Authentication_service_1.AthenticationService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/components/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".login-clean{\r\n    background:#f1f7fc;\r\n    padding:80px 0\r\n}\r\n.login-clean form{\r\n    max-width:700px;width:90%;\r\n    margin:0 auto;\r\n    background-color:#fff;\r\n    padding:40px;\r\n    border-radius:4px;\r\n    color:#505e6c;\r\n    -webkit-box-shadow:1px 1px 5px rgba(0,0,0,.1);\r\n            box-shadow:1px 1px 5px rgba(0,0,0,.1)\r\n}\r\n.login-clean .illustration{\r\n    text-align:center;\r\n    padding:0 0 20px;font-size:100px;\r\n    color:#f4476b\r\n}\r\n.login-clean form .form-control{\r\n    background:#f7f9fc;border:none;\r\n    border-bottom:1px solid #dfe7f1;\r\n    border-radius:0;-webkit-box-shadow:none;box-shadow:none;\r\n    outline:0;color:inherit;\r\n    text-indent:8px;height:42px\r\n}\r\n.login-clean form .btn-primary{\r\n    background:#f4476b;\r\n    border:none;\r\n    border-radius:4px;\r\n    padding:11px;\r\n    -webkit-box-shadow:none;\r\n            box-shadow:none;\r\n    margin-top:26px;\r\n    text-shadow:none;\r\n    outline:0!important\r\n}\r\n.login-clean form .btn-primary:active,.login-clean form .btn-primary:hover{\r\n    background:#eb3b60\r\n}\r\n.login-clean form .btn-primary:active{\r\n    -webkit-transform:translateY(1px);\r\n            transform:translateY(1px)\r\n}\r\n.login-clean form .forgot{\r\n    display:block;\r\n    text-align:center;\r\n    font-size:12px;\r\n    color:#6f7a85;\r\n    opacity:.9;\r\n    text-decoration:none\r\n}\r\n.login-clean form .forgot:active,.login-clean form .forgot:hover{\r\n    opacity:1;\r\n    text-decoration:none\r\n}"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"login-clean\" style=\"background-color:rgb(201,92,20) ;\">\n    <form method=\"post\">\n        <h2 class=\"sr-only\">Login Form</h2>\n        <div class=\"illustration\"><i class=\"icon ion-android-cart\" style=\"color:rgb(142,145,26);\"></i>\n        </div>\n        <button class=\"btn btn-primary btn-block\" (click)=\"LogIn()\" type=\"submit\" style=\"background-color:rgb(173,63,56);\">\n                <i class=\"typcn typcn-social-google-plus\" style=\"font-size:20px;\"></i>\n                &nbsp; Iniciar sesión con Google\n        </button>\n        <div class=\"form-group\">\n                <input [(ngModel)]=\"email\" class=\"form-control\" type=\"email\"name=\"email\" placeholder=\"Email\" style=\"margin-top:20px;\">\n        </div>\n        <div class=\"form-group\">\n            <input [(ngModel)]=\"password\" class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n        </div>\n            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"LogInGeneralUsuario()\" style=\"background-color:rgb(142,145,26);margin-top:26px;\">Ingresar como usuario</button>    \n            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"LogInGeneralRestaurante()\" style=\"background-color:rgb(142,145,26);margin-top:26px;\">Ingresar como empresa</button>    \n        <!--[(ngModel)]=\"checkR\"    [(ngModel)]=\"checkC\"-->\n           <div class=\"form-group\">      \n            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"Registrarse()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Registrarse</button>\n            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"EntrarLibre()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Ingresar anónimo</button>\n            \n        </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var service_service_1 = __webpack_require__("./src/app/services/service.service.ts");
var Authentication_service_1 = __webpack_require__("./src/app/services/Authentication.service.ts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, authorization, service) {
        this.route = route;
        this.router = router;
        this.authorization = authorization;
        this.service = service;
        this.userSession = {
            username: "",
            email: "",
            contrasenna: ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        //this.valor = this.route.snapshot.params['valor'];
    };
    LoginComponent.prototype.EntrarLibre = function () {
        this.router.navigate(["/components/publica"]);
    };
    LoginComponent.prototype.LogIn = function () {
        var _this = this;
        this.authorization.login()
            .then(function (data) {
            _this.userSession.username = data.user.displayName,
                _this.userSession.email = data.user.email;
            //guardando en local storage
            sessionStorage.setItem("Usuario", JSON.stringify(_this.userSession));
            console.log("Guardado con exito");
            _this.service.getUsuario(_this.userSession.email)
                .subscribe(function (res) {
                var resultado = JSON.parse(JSON.stringify(res));
                console.log(resultado);
                if (!resultado.status) {
                    //lo regresa al login
                    _this.service.getUnRestaurante(_this.userSession.email)
                        .subscribe(function (res) {
                        var resultado = JSON.parse(JSON.stringify(res));
                        if (!resultado.status) {
                            sessionStorage.clear();
                            alert("Este correo esta registrado");
                        }
                        else {
                            var userSessionEmpresa = {
                                id: resultado.restaurantes.id,
                                contrasenna: resultado.restaurantes.contrasenna,
                                correo: resultado.restaurantes.correo,
                                descripcion: resultado.restaurantes.descripcion,
                                fin: resultado.restaurantes.horario.fin,
                                inicio: resultado.restaurantes.horario.inicio,
                                img: resultado.restaurantes.img,
                                nombre: resultado.restaurantes.nombre,
                                telefono: resultado.restaurantes.telefono,
                                ubicacion: resultado.restaurantes.ubicacion
                            };
                            //guardando en local storage
                            sessionStorage.setItem("Usuario", JSON.stringify(userSessionEmpresa));
                            _this.router.navigate(["components/restaurante"]);
                        }
                    });
                }
                else {
                    var userSessionUsuario = {
                        correo: resultado.usuarios.correo,
                        nombre: resultado.usuarios.nombre,
                        tarjeta: resultado.usuarios.tarjeta,
                        telefono: resultado.usuarios.telefono,
                        ubicacion: resultado.usuarios.ubicacion,
                        contrasenna: resultado.usuarios.contrasenna
                    };
                    sessionStorage.setItem("Usuario", JSON.stringify(userSessionUsuario));
                    _this.router.navigate(["/components/publica"]);
                    //aqui se agragan a la clase y session
                }
            });
            console.log("Realizado con exito");
            //obtener datos de firebase para ver si existe
        }).catch(function (error) {
            console.log("Error");
            alert("Ocurrio un error");
        });
    };
    LoginComponent.prototype.LogInGeneralUsuario = function () {
        var _this = this;
        console.log(this.email);
        this.service.getUsuario(this.email)
            .subscribe(function (res) {
            console.log(res);
            var resultado = JSON.parse(JSON.stringify(res));
            if (!resultado.status) {
                alert("Usted no esta registrado");
            }
            else {
                if (_this.password != resultado.usuarios.contrasenna || _this.email != resultado.usuarios.correo) {
                    alert("La contreseña es incorrecta");
                }
                else {
                    //guardando en local storage
                    var userSessionUsuario = {
                        correo: resultado.usuarios.correo,
                        nombre: resultado.usuarios.nombre,
                        tarjeta: resultado.usuarios.tarjeta,
                        telefono: resultado.usuarios.telefono,
                        ubicacion: resultado.usuarios.ubicacion,
                        contrasenna: resultado.usuarios.contrasenna
                    };
                    sessionStorage.setItem("Usuario", JSON.stringify(userSessionUsuario));
                    console.log(sessionStorage.getItem("Usuario"));
                    console.log("Guardado con exito");
                    _this.router.navigate(["/components/publica"]);
                }
            }
        });
    };
    LoginComponent.prototype.LogInGeneralRestaurante = function () {
        var _this = this;
        console.log(this.email);
        this.service.getUnRestaurante(this.email)
            .subscribe(function (res) {
            var resultado = JSON.parse(JSON.stringify(res));
            console.log(resultado);
            if (!resultado.status) {
                alert("Su empresa no se encuentra registrada");
            }
            else {
                if (_this.password != resultado.restaurantes.contrasenna || _this.email != resultado.restaurantes.correo) {
                    alert("Contraseña es incorrecta");
                }
                else {
                    var userSessionEmpresa = {
                        id: resultado.restaurantes.id,
                        contrasenna: resultado.restaurantes.contrasenna,
                        correo: resultado.restaurantes.correo,
                        descripcion: resultado.restaurantes.descripcion,
                        fin: resultado.restaurantes.horario.fin,
                        inicio: resultado.restaurantes.horario.inicio,
                        img: resultado.restaurantes.img,
                        nombre: resultado.restaurantes.nombre,
                        telefono: resultado.restaurantes.telefono,
                        ubicacion: resultado.restaurantes.ubicacion
                    };
                    //guardando en local storage
                    sessionStorage.setItem("Usuario", JSON.stringify(userSessionEmpresa));
                    console.log("Guardado con exito");
                    _this.router.navigate(["components/restaurante"]);
                }
            }
        });
    };
    LoginComponent.prototype.LogOut = function () {
        this.authorization.logout();
        sessionStorage.clear();
    };
    LoginComponent.prototype.Registrarse = function () {
        this.router.navigate(["components/registro"]);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("./src/app/components/login/login.component.html"),
            styles: [__webpack_require__("./src/app/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            Authentication_service_1.AthenticationService,
            service_service_1.MyService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
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


/***/ }),

/***/ "./src/app/components/publica/publica.component.css":
/***/ (function(module, exports) {

module.exports = ".btn{\r\n\r\n    width:100%;\r\n    height:80px;\r\n    border-color:#fd7e14;\r\n}\r\n\r\n.botonHome{\r\n\r\n    width:450px;\r\n    height:60px;\r\n    background-color:rgb(142,145,26); \r\n    border-color:rgb(142,145,26);\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    margin-left:33%; \r\n    border-radius: 10px;\r\n}\r\n\r\n.contenedorPerfil{\r\n\r\n    width:450px;\r\n    height:350px;\r\n    background-color:rgb(142,145,26); \r\n    border-color:rgb(142,145,26);\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    margin-left:33%; \r\n    margin-top: 24px;\r\n    \r\n\r\n\r\n\r\n}\r\n\r\n.cajaEditor{\r\n\r\n\r\n    display: block;\r\n    width: 80%;\r\n    height: 40px;\r\n    padding: .375rem .75rem;\r\n    font-size: 1rem;\r\n    line-height: 1.5;\r\n    color: #495057;\r\n    background-color: #fff;\r\n    background-clip: padding-box;\r\n    border: 1px solid #ced4da;\r\n    border-radius: .15rem;\r\n    margin-left: 30px;\r\n    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;\r\n    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;\r\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\r\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;\r\n\r\n}\r\n\r\n.botonAgregar{\r\n\r\n    width:190px;\r\n    height:40px;\r\n    background-color:rgb(142,145,26); \r\n    border-color:rgb(142,145,26);\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    margin-top:15px;\r\n    margin-left:15%; \r\n    border-radius: 10px;\r\n}\r\n\r\n.informacionProducto{\r\n\r\n\r\n    background: #fd7e14;\r\n}\r\n\r\n.imagen{\r\n    width: \"200px\";\r\n    height: \"50px\"\r\n}\r\n\r\n.contenedorHome{\r\n\r\n    -ms-flex-line-pack: center;\r\n\r\n        align-content: center;\r\n}\r\n\r\n.navbar{\r\n    background-color:#D35400;\r\n}\r\n\r\n.botonEditarPerfil{\r\n\r\n    width:450px;\r\n    height:50px;\r\n    background-color:#D35400;\r\n    border-color:#D35400;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    margin-left:0px; \r\n    border-radius: 5px;\r\n    margin-top: 50px;\r\n    \r\n\r\n}\r\n\r\n@media screen and (max-width:640px){\r\n    .botonHome{\r\n        width: 250px;\r\n        margin-left: 16%; \r\n    }\r\n    .contenedorProducto{\r\n        width: 350px;\r\n        margin-left: 1%; \r\n    }\r\n    .contenedorPerfil{\r\n        width: 290px;\r\n        margin-left: 25px; \r\n    }\r\n    .botonEditarPerfil{\r\n        width: 290px;\r\n        margin-left: 0px; \r\n        \r\n\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/components/publica/publica.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n<nav class=\"navbar navbar-light navbar-expand-md\" >\n        <div class=\"container-fluid\"><a class=\"navbar-brand\" >Comida Express</a><button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#navcol-1\"><span class=\"sr-only\">Toggle navigation</span><span class=\"navbar-toggler-icon\"></span></button>\n            <div class=\"collapse navbar-collapse\"\n                id=\"navcol-1\">\n                <ul class=\"nav navbar-nav\">\n                    <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" (click)=\"Home()\"><i class=\"fa fa-home\"></i>&nbsp; Home</a></li>\n                    <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" (click)=\"MostrarPerfil()\"><i class=\"fa fa-user\"></i>&nbsp; Perfil</a></li>\n                    <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" (click)=\"MostrarMiCarrito()\"><i class=\"fa fa-shopping-cart\"></i>&nbsp; Carrito de compra</a></li>     \n                    <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" href=\"#\"><i class=\"fa fa-shopping-cart\"></i>&nbsp; Salir</a></li>     \n                  </ul>\n            </div>\n        </div>\n      </nav>\n      \n      \n      <div *ngIf=\"visibleMC\">\n        <div class=\"container\">\n            <table class=\"table table-bordered\">\n                <div *ngFor=\"let producto of listaCarrito;let i=index\">\n                    <tr>\n                        <h3 style=\"color: #0056b2\">Pedido {{i+1}}</h3>\n                        <div style=\"background:  #C7D132  \" class=\"container-fluid\">         \n                            <br>\n                            <div  class=\"row\">\n                                <div  >\n                                <input [(ngModel)]=\"producto.cantidad\" type=\"number\" style=\"width: 50px;\" id=\"cantP\" name=\"cantProducto\" value= '{{producto.cantidad}}'>\n                                </div>\n                                <div class=\"col-sm-3 \" style=\"width: 150px; height: 100px;\" >Nombre: {{producto.nombre}} </div>\n                                <div class=\"col-sm-3 \" style=\"width: 150px;\">Precio total:{{producto.cantidad * producto.precio}}</div>\n                                <div class=\"col-sm-3 \" style=\"width: 150px; height: 100px;\" >Nombre encargados: {{producto.nombreRestauran}} </div>\n                                <div class=\"col-sm-3 \" style=\"width: 150px; height: 100px;\" >Email encargados: {{producto.restaurante}} </div>\n                                <div class=\"col-sm-3 \" style=\"width: 150px; height: 100px;\" >ubicacion: [ {{producto.ubicacion._latitude}}, {{producto.ubicacion._longitude}} ] </div>\n                                <div class=\"col-sm-3\" style=\"width: 30px;\"><button (click)=\"sacarDeCarrito(i)\" class=\"botonHome\" type=\"button\" style=\"width: 30px; height: 30px;\" ><i class=\"fa fa-trash\"></i></button></div>\n                                <hr style=\"color: #0056b2;\">    \n                            </div>\n                        </div>  \n                    </tr>\n                </div>\n                <button type=\"button\" class=\"btn btn-primary botonEditarPerfil\" style=\"margin-left: 8px;\"data-toggle=\"modal\" data-target=\"#myModal\">Hacer pedido</button>            \n            </table>\n    \n          <div class=\"container\">\n                  \n                  <div class=\"modal fade\" id=\"myModal\">\n                    <div class=\"modal-dialog\">\n                      <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                          <h4 class=\"modal-title\">Pago</h4>\n                          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                        </div>\n                        \n                      <div class=\"modal-body\">\n                              <h6 style=\"margin-left: 15px;\"> Ingrese el número de tarjeta: </h6>\n                              <input [(ngModel)]=\"tarjetaU\" type=\"number\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value=0000000 > \n                              <br>\n                      </div>\n                        <!-- Modal footer -->\n                        <div class=\"modal-footer\">\n                          <button type=\"button\" class=\"btn btn-danger\" (click)=\"crearPedido()\" style=\"background-color:rgb(142,145,26);  \" data-dismiss=\"modal\">Hacer pedido</button>\n                        </div>\n                        \n                      </div>\n                    </div>\n                  </div>\n                  \n                </div>\n                \n      </div> \n    </div>\n      <div *ngIf=\"visibleH\">\n        <div class=\"contenedorHome\">\n            <br><br>\n            <button (click)=\"MostrarCategorias()\" class=\"botonHome\"  type=\"button\" style=\"margin-top:140px;\" >Categorías</button>\n            <br><br>\n            <button (click)=\"MostrarRestaurante()\" class=\"botonHome\" type=\"button\"  >Restaurantes</button>\n        </div>\n      </div>\n      \n      <div *ngIf=\"visibleC\">\n        <div *ngFor=\"let categoria of categorias; let i=index\">\n              <button (click)=\"MostrarCategoriaElegida(i)\" class=\"botonHome\" style=\"margin-top:20px;\">{{categoria}}</button>\n        </div>    \n      </div>\n      \n      \n      <div *ngIf=\"visibleP\">\n          <div class=\"contenedorPerfil\">\n              <br>\n              <h6 style=\"margin-left: 15px;\"> Nombre: {{usuario.nombre}}</h6>\n              <br>\n              <h6 style=\"margin-left: 15px;\"> Tarjeta: {{usuario.tarjeta.numero}}</h6>\n              <br>\n              <h6 style=\"margin-left: 15px;\"> Teléfono: {{usuario.telefono}}</h6>\n              <br>\n              <h6 style=\"margin-left: 15px;\"> Ubicación: [{{usuario.ubicacion._latitude}},{{usuario.ubicacion._longitude}}]</h6>\n              <button type=\"button\" class=\"btn btn-primary botonEditarPerfil\" data-toggle=\"modal\" data-target=\"#myModal\">Editar</button>\n              \n              <div class=\"container\">\n                  <div class=\"modal fade\" id=\"myModal\"style=\"margin-right: 7%;\">\n                      <div class=\"modal-dialog\">\n                          <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                  <h4 class=\"modal-title\">Editar información</h4>\n                                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                              </div>\n                              <div class=\"modal-body\">\n                                  <h6  style=\"margin-left: 15px;\"> Nombre: </h6>\n                                  <input [(ngModel)]=\"usuario.nombre\" type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"nombreUsuario\" value=\"{{usuario.nombre}}\" > \n                                  <br>\n                                  <h6 style=\"margin-left: 15px;\"> Tarjeta: dueño</h6>\n                                  <input [(ngModel)]=\"usuario.tarjeta.duenno\"type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value={{usuario.tarjeta.duenno}} > \n                                  <br>\n                                  <h6 style=\"margin-left: 15px;\"> Numero Tarjeta: </h6>\n                                  <input [(ngModel)]=\"usuario.tarjeta.numero\"type=\"number\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value={{usuario.tarjeta.numero}} > \n                                  <h6 style=\"margin-left: 15px;\"> Codigo Tarjeta: </h6>\n                                  <input [(ngModel)]=\"usuario.tarjeta.codigo\"type=\"number\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value={{usuario.tarjeta.codigo}} > \n                                  <h6 style=\"margin-left: 15px;\"> Proveedor Tarjeta: </h6>\n                                  <input [(ngModel)]=\"usuario.tarjeta.proveedor\"type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value={{usuario.tarjeta.proveedor}} > \n                                  <h6 style=\"margin-left: 15px;\"> Vencimiento Tarjeta: </h6>\n                                  <input [(ngModel)]=\"usuario.tarjeta.vencimiento\"type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"tarjetaUsuario\" value={{usuario.tarjeta.vencimiento}} > \n                                  <h6 style=\"margin-left: 15px;\"> Teléfono: </h6>\n                                  <input [(ngModel)]=\"usuario.telefono\" type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"telefonoUsuario\" value={{usuario.telefono}} > \n                                  <br>\n                                  <h6 style=\"margin-left: 15px;\"> Ubicación: </h6>\n                                  <input [(ngModel)]=\"ubicacion\" type=\"text\" class=\"cajaEditor\" id=\"usr\" name=\"ubicacionUsuario\" value=\"ubicacion\" >             \n                                  \n                                  \n                                </div>\n                              <div class=\"modal-footer\">\n                                  <button (click)=EditarPerfil() type=\"button\" class=\"btn btn-danger\"  data-dismiss=\"modal\">Editar</button>\n                              </div>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n            \n      \n      \n      <div *ngIf=\"visibleR\">\n        <p> <input type=\"text\" class=\"form-control\" id=\"usr\" value=\"Restaurante\"></p>\n        <div *ngFor=\"let restaurante of listaRestaurante\">\n            <div class=\"article-list\">\n                <div class=\"row articles\">\n                    <div style=\" margin-left: 12%;margin-top:20px;\"><a (click)=\"MostrarRestauranteElegido(i)\">\n                      \n                      \n                      <img class=\"img-fluid\" src=\"{{restaurante.img}}\" width=\"280px\" height= \"200px\"></a>      \n                      <h6 class=\"name\"><br>Nombre: {{restaurante.nombre}}</h6>\n\n                      <button (click)=\"ProductosPorRestaurante(restaurante)\" class=\"botonAgregar\">Ver</button>\n                        \n                    </div>        \n                </div>\n            </div>    \n        </div>    \n      </div>\n      \n      \n      \n      <div *ngIf=\"visibleCE\">\n          <div *ngFor=\"let producto of listaProductos\">   \n              <div class=\"article-list\">\n                  <div class=\"row articles\">\n                      <div style=\"margin-left: 10%; margin-top:20px;\">\n                          <div style=\"margin-left: 10%; margin-top:20px;\"></div>\n                          <img src=\"{{producto.img}}\" width=\"300px\" height= \"200px\">    \n                          <br>\n                          <br>\n                          <h6 ><a href=\"http.google\">Restaurante: {{producto.restaurante.nombre}}</a></h6>\n                          <h6 >Nombre: {{producto.nombre}}</h6>\n                          <h6 >Categoria: {{producto.categoria}}</h6>\n                          <h6 >Descripcion: {{producto.descripcion}}</h6>\n                          <h6 >Precio: {{producto.precio}}</h6>\n                          <input [(ngModel)]=\"cant\" type=\"number\" class=\"cajaEditor\" id=\"cant\" name=\"cantidad\"> \n                          <button (click)=\"AgregarCarrito(producto)\" class=\"botonAgregar\">Agregar</button>\n                      </div>        \n                  </div>\n              </div>\n          </div>\n      </div>\n\n      <div *ngIf=\"visiblePR\">\n        <div *ngFor=\"let producto of listaProductos\">   \n            <div class=\"article-list\">\n                <div class=\"row articles\">\n                    <div style=\"margin-left: 10%; margin-top:20px;\">\n                        <div style=\"margin-left: 10%; margin-top:20px;\"></div>\n                        <img src=\"{{producto.imag}}\" width=\"300px\" height= \"200px\">    \n                        <br>\n                        <br>\n                        <h6 >Nombre: {{producto.nombre}}</h6>\n                        <h6 >Categoria: {{producto.categoria}}</h6>\n                        <h6 >Descripcion: {{producto.descripcion}}</h6>\n                        <h6 >Precio: {{producto.precio}}</h6>\n                        <input [(ngModel)]=\"cant\" type=\"number\" class=\"cajaEditor\" id=\"cant\" name=\"cantidad\"> \n                        <button (click)=\"AgregarCarrito(producto)\" class=\"botonAgregar\">Agregar</button>\n                    </div>        \n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/components/publica/publica.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var service_service_1 = __webpack_require__("./src/app/services/service.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var PublicaComponent = /** @class */ (function () {
    function PublicaComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.visibleC = false;
        this.visibleH = true;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleP = false;
        this.visibleEP = false;
        this.visibleMC = false;
        this.visiblePR = false;
        this.title = 'app';
        this.usuario = JSON.parse(sessionStorage.getItem("Usuario"));
    }
    ///-------------------///
    PublicaComponent.prototype.ngOnInit = function () {
        this.visibleH = true;
        this.visibleC = false;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleP = false;
        this.visibleEP = false;
        this.visibleMC = false;
        this.visibleP = false;
        this.visiblePR = false;
    };
    //obtenemos el servici
    PublicaComponent.prototype.Home = function () {
        this.visibleH = true;
        this.visibleC = false;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleP = false;
        this.visibleEP = false;
        this.visibleMC = false;
        this.visibleP = false;
        this.visiblePR = false;
        //this.visibleAP=false;
    };
    PublicaComponent.prototype.eliminarProducto = function (i) {
        alert("ocurrio un error");
    };
    PublicaComponent.prototype.MostrarMiCarrito = function () {
        var _this = this;
        this.service.getUsuario(this.usuario.correo)
            .subscribe(function (res) {
            console.log(res);
            var respuesta = JSON.parse(JSON.stringify(res));
            _this.listaCarrito = respuesta.usuarios.carrito;
            console.log(_this.listaCarrito);
        });
        this.visibleH = false;
        this.visibleC = false;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleP = false;
        this.visibleEP = false;
        this.visibleMC = true;
        this.visiblePR = false;
    };
    PublicaComponent.prototype.sacarDeCarrito = function (indice) {
        this.listaCarrito.splice(indice, 1);
        console.log(this.listaCarrito);
        this.service.sacarDeCarrito(this.usuario.correo, this.listaCarrito).subscribe(function (res) {
            console.log(res);
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                alert("Ocurrio un error");
            }
        });
    };
    PublicaComponent.prototype.crearPedido = function () {
        var _this = this;
        if (this.tarjetaU == this.usuario.tarjeta.numero) {
            for (var _i = 0, _a = this.listaCarrito; _i < _a.length; _i++) {
                var prod = _a[_i];
                var p = JSON.parse(JSON.stringify(prod));
                var ubicacion = "[" + p.ubicacion._latitude + "," + p.ubicacion._longitude + "]";
                console.log(p.idProducto, p.cantidad, this.usuario.correo, this.fecha, p.nombre, p.precio, p.restaurante, p.ubicacion);
                this.service.crearPedidos(p.idProducto, p.cantidad, this.usuario.correo, this.fecha, p.nombre, p.precio, p.restaurante, ubicacion).subscribe(function (res) {
                    var respuesta = JSON.parse(JSON.stringify(res));
                    console.log(respuesta);
                    if (!respuesta.status) {
                        alert("Ocurrio un error");
                    }
                    else {
                        console.log("inserto");
                        _this.listaCarrito = [];
                        _this.service.eliminarCarrito(_this.usuario.correo)
                            .subscribe(function (res) {
                            console.log(res);
                        });
                        _this.MostrarMiCarrito();
                    }
                });
            }
        }
        else {
            alert("Esta tarjeta no coincide con la del usuario");
        }
    };
    PublicaComponent.prototype.AgregarCarrito = function (producto) {
        //revisar que el session este activado si no mandar a logear
        console.log(producto.id);
        if (this.usuario == null) {
            //debe iniciar session
            this.router.navigate([""]);
            console.log(producto.id);
        }
        else {
            var ubicacion = JSON.stringify([this.usuario.ubicacion._latitude, this.usuario.ubicacion._longitude]);
            this.service.agregarCarrito(this.usuario.correo, this.cant, ubicacion, this.fecha, producto.id)
                .subscribe(function (res) {
                var respuesta = JSON.parse(JSON.stringify(res));
                console.log(respuesta);
                if (!respuesta.status) {
                    alert("Ocurrio un error agregando el producto");
                }
                else {
                    alert("Producto agregado");
                }
            });
            //ya inicio session
        }
        //al estar activo se puede guardar en carrito
    };
    PublicaComponent.prototype.MostrarProductos = function () {
        this.visibleP = true;
    };
    PublicaComponent.prototype.EditarPerfil = function () {
        console.log(this.usuario.correo, this.usuario.tarjeta.codigo, this.usuario.tarjeta.duenno, this.usuario.tarjeta.numero, this.usuario.tarjeta.proveedor, this.usuario.tarjeta.vencimiento, this.usuario.nombre, this.usuario.telefono, this.ubicacion);
        this.service.ModificarComprador(this.usuario.correo, this.usuario.tarjeta.codigo, this.usuario.tarjeta.duenno, this.usuario.tarjeta.numero, this.usuario.tarjeta.proveedor, this.usuario.tarjeta.vencimiento, this.usuario.nombre, this.usuario.telefono, this.ubicacion)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                alert("Existe un dato erroneo");
            }
            else {
                alert("insertado correctamente");
            }
            console.log(res);
        });
        this.visibleH = false;
        this.visibleC = false;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleEP = false;
        this.visibleMC = false;
        this.visibleP = true;
        this.visiblePR = false;
    };
    PublicaComponent.prototype.MostrarPerfil = function () {
        console.log(this.usuario);
        this.visiblePR = false;
        this.visibleH = false;
        this.visibleC = false;
        this.visibleCE = false;
        this.visibleR = false;
        this.visibleEP = false;
        this.visibleMC = false;
        this.visibleP = true;
    };
    PublicaComponent.prototype.MostrarCategorias = function () {
        var _this = this;
        this.categorias = [];
        this.service.getCategorias()
            .subscribe(function (res) {
            var resultado = JSON.parse(JSON.stringify(res));
            _this.categorias = resultado.categorias;
        });
        this.visibleH = false;
        this.visibleC = true;
    };
    PublicaComponent.prototype.MostrarCategoriaElegida = function (indice) {
        var _this = this;
        this.listaProductos = [];
        console.log(this.categorias[indice]);
        this.service.getProductos(this.categorias[indice])
            .subscribe(function (res) {
            _this.listaProductos = res.productos;
        });
        this.visibleEP = false;
        this.visibleC = false;
        this.visibleCE = true;
    };
    PublicaComponent.prototype.MostrarRestaurante = function () {
        var _this = this;
        this.listaRestaurante = [];
        this.service.getRestaurantes()
            .subscribe(function (res) {
            _this.listaRestaurante = res.restaurantes;
            console.log(_this.listaRestaurante);
        });
        this.visibleEP = false;
        this.visibleC = false;
        this.visibleH = false;
        this.visibleCE = false;
        this.visibleR = true;
    };
    PublicaComponent.prototype.ProductosPorRestaurante = function (restaurante) {
        var _this = this;
        console.log(restaurante.correo);
        this.listaProductos = [];
        this.service.getProductosPorRestaurante(restaurante.correo)
            .subscribe(function (res) {
            if (!res.status) {
                console.log(res.status);
                alert("Esta restaurante no tiene productos agregados");
            }
            else {
                _this.listaProductos = res.productos;
                console.log(_this.listaProductos);
                _this.visibleEP = false;
                _this.visibleC = false;
                _this.visiblePR = true;
                _this.visibleH = false;
                _this.visibleCE = false;
                _this.visibleR = false;
                _this.visibleP = false;
                _this.visibleEP = false;
                _this.visibleMC = false;
            }
        });
    };
    PublicaComponent = __decorate([
        core_1.Component({
            selector: 'app-publica',
            template: __webpack_require__("./src/app/components/publica/publica.component.html"),
            styles: [__webpack_require__("./src/app/components/publica/publica.component.css")]
        }),
        __metadata("design:paramtypes", [service_service_1.MyService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], PublicaComponent);
    return PublicaComponent;
}());
exports.PublicaComponent = PublicaComponent;


/***/ }),

/***/ "./src/app/components/registro/registro.component.css":
/***/ (function(module, exports) {

module.exports = ".btn{\r\n\r\n    width:100%;\r\n    height:80px;\r\n    border-color:#fd7e14;\r\n}\r\n\r\n.botonHome{\r\n\r\n    width:450px;\r\n    height:60px;\r\n    background-color:#D35400; \r\n    border-color:#fd7e14;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    margin-left:32%; \r\n    border-radius: 10px;\r\n}\r\n\r\n.imagen{\r\n    width: \"200px\";\r\n    height: \"50px\"\r\n}\r\n\r\n.contenedorHome{\r\n\r\n    -ms-flex-line-pack: center;\r\n\r\n        align-content: center;\r\n}\r\n\r\n.navbar{\r\n    background-color:#D35400;\r\n}\r\n\r\n@media screen and (max-width:640px){\r\n    .botonHome{\r\n        width: 250px;\r\n        margin-left: 23%; \r\n    }\r\n    .contenedorProducto{\r\n        width: 350px;\r\n        margin-left: 8%; \r\n    }\r\n    \r\n}"

/***/ }),

/***/ "./src/app/components/registro/registro.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"visible\">\n    <div class=\"contenedorHome\">    \n                <br><br>\n                <button (click)=\"crearEmpresa()\" class=\"botonHome\"  type=\"button\" style=\"margin-top:140px;\" >Crearme una empresa</button>\n                <br><br>\n                <button (click)=\"crearUsuario()\" class=\"botonHome\" type=\"button\"  >Crearme un usuario</button>\n                <br><br>\n    </div>\n</div>\n\n    <div *ngIf=\"visibleR\">\n        <div class=\"container-fluid\">\n            <div class=\"login-clean\" >\n                <form method=\"post\"  >\n                    <h2 class=\"sr-only\" >Login Form</h2>\n                    <div class=\"illustration\" ><i class=\"icon-user-follow\" style=\"color:#D35400;\"></i></div>\n                        <input class=\"form-control\" [(ngModel)]=correoEmpresa type=\"email\" name=\"email\" placeholder=\"Email\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=nombreEmpresa type=\"text\" name=\"nombre\" placeholder=\"Nombre\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=descripcionEmpresa type=\"descripcion\" name=\"descripcion\" placeholder=\"Descripcion\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=contrasennaEmpresa type=\"password\" name=\"contraseña\" placeholder=\"Password\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=inicio type=\"text\" name=\"horaInicio\" placeholder=\"Hora inicio\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=fin type=\"text\" name=\"horaFinal\" placeholder=\"Hora final\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=telefonoEmpresa type=\"text\" name=\"telefono\" placeholder=\"Teléfono\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=imgEmpresa type=\"text\" name=\"imagen\" placeholder=\"Imagen\" style=\"margin-top:20px;\">\n                        <input class=\"form-control\" [(ngModel)]=ubicacionEmpresa type=\"text\" name=\"ubicacion\" placeholder=\"Ubicación\" style=\"margin-top:20px;\">\n                        <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"SubirImagen()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Subir una imagen</button>\n                    <div class=\"form-group\">\n                            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"insertarEmpresa()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Registrarse</button>\n                            <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"regresar()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Regresar</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"visibleC\">\n\n        <div class=\"container-fluid\">\n\n        <div class=\"login-clean\" >\n            <form method=\"post\" >\n                <h2 class=\"sr-only\" >Login Form</h2>\n                <div class=\"illustration\"><i class=\"icon-user-follow\" style=\"color:#D35400;\"></i></div>\n                    <input class=\"form-control\" [(ngModel)]=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"nombre\" type=\"text\" name=\"nombre\" placeholder=\"Nombre\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"password\" type=\"password\" name=\"contraseña\" placeholder=\"Password\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"numeroTarjeta\" type=\"number\" name=\"numTarjeta\" placeholder=\"Número de tarjeta\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"codigo\" type=\"number\" name=\"codigoTarjeta\" placeholder=\"Código de tarjeta\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"proveedor\" type=\"text\" name=\"proveedor\" placeholder=\"Proveedor bancario\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"vencimiento\" type=\"text\" name=\"vencimiento\" placeholder=\"Vencimiento\" style=\"margin-top:20px;\">          \n                    <input class=\"form-control\" [(ngModel)]=\"telefono\" type=\"number\" name=\"telefono\" placeholder=\"Teléfono\" style=\"margin-top:20px;\">\n                    <input class=\"form-control\" [(ngModel)]=\"ubicacion\" type=\"text\" name=\"ubicacion\" placeholder=\"Ubicación\" style=\"margin-top:20px;\">\n                    <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"AgregarUbicacion()\"  style=\"background-color:rgb(142,145,26);margin-top:15px;\">Agregar ubicacion</button>\n                <div class=\"form-group\">\n                    <button class=\"btn btn-primary btn-block\" (click)=\"insertarUsuario()\" type=\"submit\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Registrarse</button>\n                    <button class=\"btn btn-primary btn-block\" type=\"submit\" (click)=\"regresar()\" style=\"background-color:rgb(142,145,26);margin-top:15px;\">Regresar</button>\n                        \n                </div>\n            </form>\n        </div>\n    </div>\n    </div>\n"

/***/ }),

/***/ "./src/app/components/registro/registro.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var service_service_1 = __webpack_require__("./src/app/services/service.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var RegistroComponent = /** @class */ (function () {
    function RegistroComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        //vistas
        this.visibleR = false;
        this.visibleC = false;
        this.visible = true;
        //valores globales para el usuario
        this.email = "";
        this.nombre = "";
        this.password = "";
        this.numeroTarjeta = "";
        this.telefono = "";
        this.ubicacion = "";
        this.proveedor = "";
        this.vencimiento = "";
        this.correoEmpresa = "";
        this.descripcionEmpresa = "";
        this.imgEmpresa = "";
        this.nombreEmpresa = "";
        this.telefonoEmpresa = "";
        this.ubicacionEmpresa = "";
        this.contrasennaEmpresa = "";
    }
    RegistroComponent.prototype.ngOnInit = function () {
    };
    RegistroComponent.prototype.crearUsuario = function () {
        this.visibleR = false;
        this.visibleC = true;
        this.visible = false;
    };
    //insertando usaurio comprador
    RegistroComponent.prototype.insertarUsuario = function () {
        var _this = this;
        this.service.getUsuario(this.email)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            console.log(respuesta);
            if (respuesta.status) {
                alert("El usuario ya esta registrado. Regrese al login principal");
            }
            else {
                _this.service.crearUsuarioComprador(_this.email, _this.nombre, _this.codigo, _this.nombre, _this.numeroTarjeta, _this.proveedor, _this.vencimiento, _this.telefono, _this.ubicacion, _this.password)
                    .subscribe(function (res) {
                    console.log(res);
                    var respuesta = JSON.parse(JSON.stringify(res));
                    if (respuesta.status) {
                        alert("El usuario se inserto exitosamente");
                        _this.router.navigate([""]);
                    }
                    else {
                        alert("Ocurrio un error al intentar insertarlo");
                    }
                });
            }
        });
    };
    RegistroComponent.prototype.regresar = function () {
        this.router.navigate([""]);
    };
    RegistroComponent.prototype.crearEmpresa = function () {
        this.visibleR = true;
        this.visibleC = false;
        this.visible = false;
    };
    RegistroComponent.prototype.insertarEmpresa = function () {
        var _this = this;
        console.log(this.email);
        //calida si existe restaurante en la base
        this.service.getUnRestaurante(this.correoEmpresa)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            console.log(respuesta.restaurantes);
            if (respuesta.restaurantes != undefined) {
                alert("Esta empresa ya esta registrada. Regrese al login principal");
            }
            else {
                //crea empresa si no se ha agreagdo una antes          
                _this.service.crearEmpresa(_this.fin, _this.inicio, _this.correoEmpresa, _this.descripcionEmpresa, _this.imgEmpresa, _this.nombreEmpresa, _this.telefonoEmpresa, _this.ubicacionEmpresa, _this.contrasennaEmpresa)
                    .subscribe(function (res) {
                    var respuesta = JSON.parse(JSON.stringify(res));
                    if (respuesta.status) {
                        alert("El usuario se inserto exitosamente");
                        _this.router.navigate([""]);
                    }
                    else {
                        alert("Ocurrio un error al intentar insertarlo");
                    }
                });
            }
        });
    };
    RegistroComponent = __decorate([
        core_1.Component({
            selector: 'app-registro',
            template: __webpack_require__("./src/app/components/registro/registro.component.html"),
            styles: [__webpack_require__("./src/app/components/registro/registro.component.css")]
        }),
        __metadata("design:paramtypes", [service_service_1.MyService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], RegistroComponent);
    return RegistroComponent;
}());
exports.RegistroComponent = RegistroComponent;


/***/ }),

/***/ "./src/app/components/restaurante/restaurante.component.css":
/***/ (function(module, exports) {

module.exports = "body {\r\n    background-image: url('Cocina-italiana.7ce49211a856714c020d.jpg');\r\n}\r\n\r\n.contenedorProducto{\r\n\r\n\r\n    margin-top:15px;\r\n    background-color:rgb(142,145,26);\r\n    width:330px;\r\n    margin-left:15px;\r\n\r\n}\r\n\r\n.cajaEditor{\r\n\r\n    width: 85%;\r\n    margin-left: 10%; \r\n\r\n}\r\n\r\n.botonEditar{\r\n    background-color:rgb(142,145,26);\r\n    border-color:rgb(142,145,26); \r\n    margin-left: 0px;\r\n\r\n\r\n}\r\n\r\n.botonAgregarProducto{\r\n\r\n    background-color:rgb(142,145,26); \r\n    margin-left: 0%; \r\n    border-radius: 4px; \r\n    border-color: rgb(142,145,26); \r\n    width: 350px;\r\n\r\n}\r\n\r\n.botonModal{\r\n    background-color:rgb(142,145,26); \r\n    border-color: rgb(142,145,26); \r\n\r\n}\r\n\r\n.botonEliminar{\r\n    background-color:rgb(142,145,26); border-color:rgb(142,145,26); margin-left: 170px;\r\n}\r\n\r\n.login-clean{\r\n    background:#f1f7fc;\r\n    padding:80px 0\r\n}\r\n\r\n.login-clean form{\r\n    max-width:700px;width:90%;\r\n    margin:0 auto;\r\n    background-color:#fff;\r\n    padding:40px;\r\n    border-radius:4px;\r\n    color:#505e6c;\r\n    -webkit-box-shadow:1px 1px 5px rgba(0,0,0,.1);\r\n            box-shadow:1px 1px 5px rgba(0,0,0,.1)\r\n}\r\n\r\n.login-clean .illustration{\r\n    text-align:center;\r\n    padding:0 0 20px;font-size:100px;\r\n    color:#f4476b\r\n}\r\n\r\n.login-clean form .form-control{\r\n    background:#f7f9fc;border:none;\r\n    border-bottom:1px solid #dfe7f1;\r\n    border-radius:0;-webkit-box-shadow:none;box-shadow:none;\r\n    outline:0;color:inherit;\r\n    text-indent:8px;height:42px\r\n}\r\n\r\n.login-clean form .btn-primary{\r\n    background:#f4476b;\r\n    border:none;\r\n    border-radius:4px;\r\n    padding:11px;\r\n    -webkit-box-shadow:none;\r\n            box-shadow:none;\r\n    margin-top:26px;\r\n    text-shadow:none;\r\n    outline:0!important\r\n}\r\n\r\n.login-clean form .btn-primary:active,.login-clean form .btn-primary:hover{\r\n    background:#eb3b60\r\n}\r\n\r\n.login-clean form .btn-primary:active{\r\n    -webkit-transform:translateY(1px);\r\n            transform:translateY(1px)\r\n}\r\n\r\n.login-clean form .forgot{\r\n    display:block;\r\n    text-align:center;\r\n    font-size:12px;\r\n    color:#6f7a85;\r\n    opacity:.9;\r\n    text-decoration:none\r\n}\r\n\r\n.login-clean form .forgot:active,.login-clean form .forgot:hover{\r\n    opacity:1;\r\n    text-decoration:none\r\n}"

/***/ }),

/***/ "./src/app/components/restaurante/restaurante.component.html":
/***/ (function(module, exports) {

module.exports = "\n<body><nav class=\"navbar navbar-light navbar-expand-md\" style=\"background-color:#D35400  ;\">\n  <div class=\"container-fluid\"><a class=\"navbar-brand\" href=\"#\">Comida Express</a><button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#navcol-1\"><span class=\"sr-only\">Toggle navigation</span><span class=\"navbar-toggler-icon\"></span></button>\n      <div class=\"collapse navbar-collapse\"\n          id=\"navcol-1\">\n          <ul class=\"nav navbar-nav\">\n              <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" (click)=\"obtenerPerfil()\"><i class=\"fa fa-home\"></i>&nbsp; Home</a></li>\n              <li class=\"nav-item\" role=\"presentation\" ><a class=\"nav-link active\" (click)=\"mostrarProductos()\"><i class=\"icon-social-dropbox\"></i>&nbsp; Mis productos</a></li>\n              <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" (click)=\"mostrarPedidos()\"><i class=\"typcn typcn-clipboard\"></i>&nbsp;Mis pedidos</a></li>\n              <li class=\"nav-item\" role=\"presentation\"><a class=\"nav-link active\" href=\"#\"><i class=\"typcn typcn-chevron-right-outline\"></i>&nbsp;Salir</a></li>\n          </ul>\n      </div>\n  </div>\n</nav>\n\n\n<div *ngIf=visibleP>\n  <div class=\"album py-5 bg-light\"  >\n          <div class=\"container\">\n              <button type=\"button\" data-toggle=\"modal\" data-target=\"#myModal2\" class=\"btn btn-primary botonAgregarProducto\" >Agregar producto</button>                  \n              <div class=\"modal\" id=\"myModal2\">\n                  <div class=\"modal-dialog\">\n                      <div class=\"modal-content\">\n                          <div class=\"modal-header\">\n                              <h4 class=\"modal-title\">Agregar producto</h4>\n                              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                          </div>\n                          <div class=\"modal-body\">\n                              <h6 style=\"margin-left: 15px;\">Nombre: </h6>\n                              <input [(ngModel)]=\"nuevoNombre\" type=\"text\" class=\"cajaEditor\" id=\"agregarNombreP\" name=\"nombreP\"  > \n                              <br><br><h6 style=\"margin-left: 15px;\">Descripcion: </h6>\n                              <input [(ngModel)]=\"nuevoDescripcion\" type=\"text\" class=\"cajaEditor\" id=\"agregarDescripcionP\" name=\"descripcionP\" > \n                              <br><br><h6 style=\"margin-left: 15px;\">Precio: </h6>\n                              <input [(ngModel)]=\"nuevoPrecio\" type=\"text\" class=\"cajaEditor\" id=\"agregarPrecioP\" name=\"precioP\"  > \n                              <br><br><h6 style=\"margin-left: 15px;\">Categoría: </h6>\n                              <input [(ngModel)]=\"nuevoCategoria\" type=\"text\" class=\"cajaEditor\" id=\"agregarCategoriaP\" name=\"categoriaP\"  > \n                              <br><br><h6 style=\"margin-left: 15px;\"> Imagen: </h6>\n                              <input [(ngModel)]=\"nuevoImagen\" type=\"text\" class=\"cajaEditor\" id=\"imagenProducto\" name=\"imagenP\"  > \n                              \n                          </div>\n                          <div class=\"modal-footer\">\n                              <button type=\"button\" class=\"btn btn-danger botonModal\" (click)=\"insertarProducto()\" data-dismiss=\"modal\" style=\"margin-right: 25px; \">Agregar</button>\n                          </div>              \n                      </div>\n                  </div>\n              </div>       \n          </div>\n                \n      <div class=\"container\" style=\"margin-top: 20px;\">\n          <div class=\"row\">\n              <div *ngFor=\"let producto of listaProductos; let i=index\" class=\"col-md-4\">\n                  <div class=\"card mb-4 box-shadow\">\n                      <div class=\"card-body \">\n                          <h5 class=\"card-title\" >{{producto.nombre}}</h5>\n                          <p class=\"card-text\">Categoría: {{producto.categoria}}</p> \n                          <img  src=\"{{producto.imag}}\" width=\"50\" height=\"50\"> \n                          <p class=\"card-text\">Descripción: {{producto.descripcion}}</p>\n                          <p class=\"card-text\">Precio: ¢{{producto.precio}}</p> \n                          <div class=\"d-flex\">\n                              <button type=\"button\" (click)= \"eliminarProducto(i)\" class=\"btn btn-sm btn-danger botonEliminar\"  >Eliminar</button>\n                              <button type=\"button\" (click)= \"abrirVentanaEditar(i)\" class=\"btn btn-sm btn-danger botonEditar\"  >Editar</button>\n                          </div>\n                      </div>                    \n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>   \n\n<div *ngIf=visibleEP>\n        <div class=\"container-fluid\">\n            <div class=\"login-clean\" >\n                <form method=\"post\"  >\n                    <h2 class=\"sr-only\" >Editando</h2>\n                        <div class=\"illustration\" ><i class=\"icon-user-follow\" style=\"color:#D35400;\"></i></div>\n                        <h6 style=\"margin-left: 15px;\"> Nombre: </h6>\n                        <input [(ngModel)]=\"nombre\" type=\"text\" class=\"cajaEditor\" id=\"nombreProducto\" name=\"nombreP\" value=\"{{nombre}}\"  > \n                        <br><br><h6 style=\"margin-left: 15px;\"> Categoría: </h6>\n                        <input [(ngModel)]=\"categoria\" type=\"text\" class=\"cajaEditor\" id=\"nombreCategoria\" name=\"nombreC\" value={{categoria}} > \n                        <br><br><h6 style=\"margin-left: 15px;\"> Descripcion: </h6>\n                        <input [(ngModel)]=\"descripcion\" type=\"text\" class=\"cajaEditor\" id=\"descripcionProducto\" name=\"descripcionP\" value=\"{{descripcion}}\" > \n                        <br><br><h6 style=\"margin-left: 15px;\"> Precio: </h6>\n                        <input [(ngModel)]=\"precio\" type=\"text\" class=\"cajaEditor\" id=\"precioProducto\" name=\"precioP\" value=\"{{precio}}\"> \n                        <br><br><h6 style=\"margin-left: 15px;\"> Imagen: </h6>\n                        <input [(ngModel)]=\"imag\" type=\"text\" class=\"cajaEditor\" id=\"imagenProducto\" name=\"imagenP\" value=\"{{imag}}\"> \n                    <div>\n                      <br><br>\n                      <button type=\"button\" (click)= \"editarProducto()\" class=\"btn btn-danger botonModal\" data-dismiss=\"modal\" >Editar</button>\n                      <button type=\"button\" (click)= \"regresar()\" class=\"btn btn-danger botonModal\" data-dismiss=\"modal\" >Regresar</button>\n                      \n                    </div>\n                </form>\n            </div>\n        </div>\n  </div>  \n  \n\n<div *ngIf=visibleH>\n  <div class=\"container\">\n      <br><br>\n      <div class=\"card\" style=\"width:100%;\">          \n          <div class=\"card-body\">\n              <h3 style=\"margin-left: 130px;\"><i>Restaurante: {{userSession.nombre}}</i></h3>\n              \n              <h5 style=\"margin-left: 130px;margin-top:20px;\">Descripción:  <small>{{userSession.descripcion}}</small></h5>\n              <h5 style=\"margin-left: 130px;margin-top:20px;\">Correo: <small>{{userSession.correo}}</small></h5>\n              <h5 style=\"margin-left: 130px;margin-top:20px;\">Horario: <small><br>Abrimos: {{userSession.inicio}} <br>Cerramos: {{userSession.fin}}</small></h5>\n              <h5 style=\"margin-left: 130px;margin-top:20px;\">Telefono: <small>{{userSession.telefono}}</small></h5>\n              <img style=\"margin-left: 130px;margin-top:20px;\" src=\"{{userSession.img}}\">\n              <h5 style=\"margin-left: 130px;margin-top:20px;\">Ubicación: <small>{{userSession.ubicacion}}</small></h5>\n              <br>\n              <div class=\"container\" style=\"margin-left: 115px;\">\n              </div>\n              <div class=\"container\">\n                  <div class=\"modal\" id=\"myModal3\">\n                      <div class=\"modal-dialog\">\n                          <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                  <h4 class=\"modal-title\">Editar informacion del restaurante</h4>\n                                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                              </div>\n                              <div class=\"modal-body\">\n                                  <h6 style=\"margin-left: 15px;\"> Nombre: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  value= \"{{userSession.nombre}}\" [(ngModel)]=\"userSession.nombre\" id=\"nombreRestaurante\" name=\"nombreR\"  > \n\n                                  <h6 style=\"margin-left: 15px;\"> Contraseña: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.contrasenna\" id=\"contrasennaRestaurante\" name=\"contrasennaR\" placeholder= \"{{userSession.contrasenna}}\" value=\"{{userSession.contrasenna}}\" > \n\n                                  <br><br><h6 style=\"margin-left: 15px;\"> Descripcion: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.descripcion\" id=\"descripcionRestaurante\" name=\"descripcionR\" placeholder= \"{{userSession.descripcion}}\" value=\"{{userSession.correo}}\" > \n                                  \n\n                                  <br><br><h6 style=\"margin-left: 15px;\"> Correo: </h6>\n                                  <input type=\"email\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.correo\" id=\"emailRestaurante\" name=\"emailR\" placeholder= \"{{userSession.correo}}\" value=\"{{userSession.correo}}\" > \n                                  \n                                  <br><br><h6 style=\"margin-left: 15px;\"> Hora inicio: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.inicio\" id=\"horaInicioRestaurante\" name=\"horaInicioR\" placeholder=\"{{userSession.inicio}}\" value=\"{{userSession.inicio}}\"> \n                                  \n                                  <br><br><h6 style=\"margin-left: 15px;\"> Hora final: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.fin\" id=\"horaFinalRestaurante\" name=\"horaFinalR\" placeholder=\"{{userSession.fin}}\" value=\"{{userSession.fin}}\" > \n                  \n                                  <br><br><h6 style=\"margin-left: 15px;\"> Teléfono: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.telefono\" id=\"telefonoRestaurante\" name=\"telefonoR\" placeholder=\"{{userSession.telefono}}\" value=\"{{userSession.telefono}}\" > \n                                  \n                                  <br><br><h6 style=\"margin-left: 15px;\"> Imagen: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"userSession.img\" id=\"imagenRestaurante\" name=\"imagenR\" placeholder=\"{{userSession.img}}\" value=\"{{userSession.img}}\"> \n                                  \n                                  <br><br><h6 style=\"margin-left: 15px;\"> Ubicación: </h6>\n                                  <input type=\"text\" class=\"cajaEditor\"  [(ngModel)]=\"ubicacion\" id=\"ubicacionRestaurante\" name=\"ubicacionR\" placeholder=\"[0,0]\" value=\"ubicacion\" > \n                                  \n                                  <br><br><button class=\"btn btn-danger botonModal\" style=\"margin-left:42px; width: 398px;\"data-dismiss=\"modal\" (click)=\"editarPerfil()\">Editar Perfil</button>\n                                  \n                              </div>\n                          </div>\n                      </div>\n                  </div>  \n              </div>\n              <br><br><button type=\"button\" class=\"btn btn-danger botonModal\"  style=\"margin-left:10%;width: 80%\" data-toggle=\"modal\" data-target=\"#myModal3\">Editar información</button>                        \n          </div>\n      </div>\n      <br>\n  </div>        \n</div>\n\n<div *ngIf=visiblePe>\n<div class=\"album py-5 bg-light\">\n  <div class=\"container\" style=\"margin-top: 20px;\">\n      <div class=\"row\">\n          <div *ngFor=\"let pedido of listaPedidos; let i=index\" class=\"col-md-4\">\n              <div class=\"card mb-4 box-shadow\">\n                  <div class=\"card-body \">\n\n                      \n                      <h5 class=\"card-title\">Pedido de: {{pedido.nombre}}</h5>\n \n                      <h5 class=\"card-title\">Correo: {{pedido.correo}}</h5>\n                      <p class=\"card-title\">Descripcion: {{pedido.descripcion}}</p>\n\n                      <p class=\"card-text\">Categoría: {{pedido.categoria}}</p> \n                      <p class=\"card-text\">Cantidad: {{pedido.cantidad}}</p>\n                      <p class=\"card-text\">Precio por unidad: {{pedido.precio}}</p>\n                      <p class=\"card-text\">Total: {{pedido.precio * pedido.cantidad}}</p>\n                      <p class=\"card-text\">Fecha: {{pedido.fecha}}</p> \n                      <p class=\"card-text\">Estado: {{pedido.estado.proceso}}</p>     \n                      <p class=\"card-text\">Ubicación: {{pedido.ubicacion._latitude + \" \" +pedido.ubicacion._longitude }}</p>        \n                      <button type=\"button\" (click)=\"aceptarRechazarPedido(i,0)\" style=\"margin-left:20px; width: 150px;\" class=\"btn btn-danger botonModal\" data-dismiss=\"modal\">Rechazar</button>\n                      <button type=\"button\" (click)=\"aceptarRechazarPedido(i,1)\" style=\"margin-left:20px; width: 150px;\" class=\"btn btn-danger botonModal\" data-dismiss=\"modal\">Aceptar</button>\n                      <button type=\"button\" (click)=\"aceptarRechazarPedido(i,2)\" style=\"margin-left:20px; width: 150px;\" class=\"btn btn-danger botonModal\" data-dismiss=\"modal\">Entregar</button>\n                  </div>                    \n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n</div>   \n</body>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/components/restaurante/restaurante.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var service_service_1 = __webpack_require__("./src/app/services/service.service.ts");
var RestauranteComponent = /** @class */ (function () {
    function RestauranteComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.visibleP = false;
        this.visibleH = true;
        this.visiblePe = false;
        this.visibleEP = false;
    }
    RestauranteComponent.prototype.ngOnInit = function () {
        this.userSession = JSON.parse(sessionStorage.getItem("Usuario"));
        console.log(this.userSession);
    };
    RestauranteComponent.prototype.mostrarPedidos = function () {
        var _this = this;
        this.visibleP = false;
        this.visibleH = false;
        this.visiblePe = true;
        this.visibleEP = false;
        this.service.getPedidos(this.userSession.correo)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                alert("No tiene pedidos pendientes");
            }
            else {
                _this.listaPedidos = respuesta.productos;
                console.log(_this.listaPedidos);
            }
        });
    };
    RestauranteComponent.prototype.aceptarRechazarPedido = function (pedido, opt) {
        var _this = this;
        var proceso = "";
        if (opt == 1) {
            proceso = "aceptado";
        }
        else if (opt == 0) {
            proceso = "rechazado";
        }
        else {
            proceso = "entregado";
        }
        this.service.aceptarRechazarPedido(this.listaPedidos[pedido].id, proceso).subscribe(function (res) {
            var resultado = JSON.parse(JSON.stringify(res));
            if (!resultado.status) {
                alert("Ocurrio un error");
            }
            else {
                alert("Estado cambiado");
            }
            _this.mostrarPedidos();
        });
    };
    RestauranteComponent.prototype.mostrarProductos = function () {
        var _this = this;
        this.visibleP = true;
        this.visibleH = false;
        this.visiblePe = false;
        this.visibleEP = false;
        this.service.getProductosPorRestaurante(this.userSession.correo).subscribe(function (res) {
            if (!res.status) {
                alert("Error al cargar productos");
            }
            else {
                _this.listaProductos = res.productos;
                console.log(_this.listaProductos);
            }
        });
    };
    RestauranteComponent.prototype.abrirVentanaEditar = function (index) {
        this.visibleP = false;
        this.visibleH = false;
        this.visiblePe = false;
        this.visibleEP = true;
        this.id = this.listaProductos[index].id,
            this.categoria = this.listaProductos[index].categoria;
        this.descripcion = this.listaProductos[index].descripcion;
        this.precio = this.listaProductos[index].precio;
        //this.imag=this.listaProductos[index].imag
        this.nombre = this.listaProductos[index].nombre;
        this.index = index;
        console.log(this.id + this.categoria + this.descripcion + this.precio + this.imag + this.nombre + this.index);
    };
    RestauranteComponent.prototype.insertarProducto = function () {
        var _this = this;
        console.log(this.nuevoCategoria, this.nuevoDescripcion, this.nuevoPrecio, this.nuevoImagen, this.nuevoNombre, this.userSession.correo);
        this.service.insertarProducto(this.nuevoCategoria, this.nuevoDescripcion, this.nuevoPrecio, this.nuevoImagen, this.nuevoNombre, this.userSession.correo)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                console.log(res);
                alert("No se pudo insertar. Verifique sus datos por favor");
            }
            else {
                _this.mostrarProductos();
            }
        });
    };
    RestauranteComponent.prototype.regresar = function () {
        this.mostrarProductos();
    };
    RestauranteComponent.prototype.editarProducto = function () {
        var _this = this;
        this.service.modificarProducto(this.id, this.categoria, this.descripcion, this.precio, this.imag, this.nombre, this.userSession.correo)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                alert("Error al intentar hacer esta operacion");
            }
            else {
                _this.mostrarProductos();
            }
        });
    };
    RestauranteComponent.prototype.eliminarProducto = function (indice) {
        var _this = this;
        this.service.eliminarProducto(this.listaProductos[indice].id).subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            if (!respuesta.status) {
                alert("ocurrio un error");
            }
            else {
                _this.mostrarProductos();
            }
        });
    };
    RestauranteComponent.prototype.obtenerPerfil = function () {
        this.visibleP = false;
        this.visibleH = true;
        this.visiblePe = false;
    };
    RestauranteComponent.prototype.editarPerfil = function () {
        var _this = this;
        var ubicacion = "[" + this.userSession.ubicacion._latitude + "," + this.userSession.ubicacion._longitude + "]";
        console.log(this.userSession.id, this.userSession.contrasenna, this.userSession.correo, this.userSession.descripcion, this.userSession.fin, this.userSession.inicio, this.userSession.img, this.userSession.nombre, this.userSession.telefono, ubicacion);
        this.service.modificarEmpresa(this.userSession.id, this.userSession.contrasenna, this.userSession.correo, this.userSession.descripcion, this.userSession.fin, this.userSession.inicio, this.userSession.img, this.userSession.nombre, this.userSession.telefono, ubicacion)
            .subscribe(function (res) {
            var respuesta = JSON.parse(JSON.stringify(res));
            console.log(respuesta);
            if (!respuesta.status) {
                alert("Uno de los datos esta insertado de manera incorrecta");
            }
            else {
                alert("Restaurante modificado");
                //guardando en local storage
                sessionStorage.setItem("Usuario", JSON.stringify(_this.userSession));
            }
        });
    };
    RestauranteComponent = __decorate([
        core_1.Component({
            selector: 'app-restaurante',
            template: __webpack_require__("./src/app/components/restaurante/restaurante.component.html"),
            styles: [__webpack_require__("./src/app/components/restaurante/restaurante.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            service_service_1.MyService])
    ], RestauranteComponent);
    return RestauranteComponent;
}());
exports.RestauranteComponent = RestauranteComponent;


/***/ }),

/***/ "./src/app/services/Authentication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var auth_1 = __webpack_require__("./node_modules/angularfire2/auth/index.js");
var firebase_1 = __webpack_require__("./node_modules/firebase/dist/index.cjs.js");
var AthenticationService = /** @class */ (function () {
    function AthenticationService(afAuth) {
        this.afAuth = afAuth;
    }
    AthenticationService.prototype.login = function () {
        //viene un provider google porque firebase es dde google esto permite hacerlo m'as directo
        return this.afAuth.auth.signInWithPopup(new firebase_1.auth.GoogleAuthProvider());
    };
    AthenticationService.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    AthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_1.AngularFireAuth])
    ], AthenticationService);
    return AthenticationService;
}());
exports.AthenticationService = AthenticationService;


/***/ }),

/***/ "./src/app/services/service.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var MyService = /** @class */ (function () {
    function MyService(service) {
        this.service = service;
        /*injectando el servicios client a nuuestro servicios
        para usar nuestras funciones mas directamente*/
        this.url = "http://localhost:5000/";
    }
    MyService.prototype.getProductos = function (categoria) {
        var data = { "categoria": categoria };
        console.log(categoria);
        return this.service.get(this.url + "getListaProductosCategoria", { params: data });
    };
    MyService.prototype.getProductosPorRestaurante = function (correo) {
        var data = { "correo": correo };
        return this.service.get(this.url + "getProductosPorRestaurante", { params: data });
    };
    MyService.prototype.eliminarProducto = function (id) {
        return this.service.post(this.url + "eliminarProducto", { id: id });
    };
    MyService.prototype.modificarProducto = function (id, categoria, descripcion, precio, imagen, nombre, restaurante) {
        return this.service.post(this.url + "modificarProducto", {
            id: id,
            categoria: categoria,
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
            restaurante: restaurante,
            precio: precio
        });
    };
    MyService.prototype.insertarProducto = function (categoria, descripcion, precio, imagen, nombre, restaurante) {
        return this.service.post(this.url + "crearProducto", {
            categoria: categoria,
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
            restaurante: restaurante,
            precio: precio
        });
    };
    MyService.prototype.getCategorias = function () {
        return this.service.get(this.url + "ListaCategorias");
    };
    MyService.prototype.getRestaurantes = function () {
        return this.service.get(this.url + "GetRestaurantes");
    };
    MyService.prototype.crearPedidos = function (id, cantidad, correo, fecha, nombre, precio, restauranteCorreo, ubicacion) {
        return this.service.post(this.url + "/crearPedidos", {
            id: id,
            cantidad: cantidad,
            correo: correo,
            fecha: fecha,
            nombre: nombre,
            precio: precio,
            restauranteCorreo: restauranteCorreo,
            ubicacion: ubicacion
        });
    };
    MyService.prototype.getPedidos = function (correo) {
        var data = { correo: correo };
        return this.service.get(this.url + "getPedidosPorRestaurante", { params: data });
    };
    MyService.prototype.aceptarRechazarPedido = function (id, proceso) {
        return this.service.post(this.url + "aceptarRechazarEntregarPedido", {
            id: id,
            proceso: proceso
        });
    };
    MyService.prototype.getUsuario = function (correo) {
        var data = { "correo": correo };
        return this.service.get(this.url + "getUsuario", { params: data });
    };
    MyService.prototype.eliminarCarrito = function (correo) {
        return this.service.post(this.url + "modificarCarrito", {
            correo: correo
        });
    };
    MyService.prototype.agregarCarrito = function (claveComprador, cantidad, ubicacion, fecha, claveProducto) {
        return this.service.post(this.url + "agregarProductoCarrito", {
            claveComprador: claveComprador,
            cantidad: cantidad,
            ubicacion: ubicacion,
            fecha: fecha,
            claveProducto: claveProducto
        });
    };
    MyService.prototype.crearUsuarioComprador = function (correo, nombre, codigo, duenno, numero, proveedor, vencimiento, telefono, ubicacion, contrasenna) {
        console.log({
            correo: correo,
            nombre: nombre,
            codigo: codigo,
            duenno: duenno,
            numero: numero,
            proveedor: proveedor,
            vencimiento: vencimiento,
            telefono: telefono,
            ubicacion: ubicacion,
            contrasenna: contrasenna
        });
        return this.service.post(this.url + "crearUsuario", {
            correo: correo,
            nombre: nombre,
            codigo: codigo,
            duenno: duenno,
            numero: numero,
            proveedor: proveedor,
            vencimiento: vencimiento,
            telefono: telefono,
            ubicacion: ubicacion,
            contrasenna: contrasenna
        });
    };
    MyService.prototype.modificarEmpresa = function (id, contrasenna, correo, descripcion, fin, inicio, img, nombre, telefono, ubicacion) {
        return this.service.post(this.url + "ModificarRestaurante", {
            id: id,
            contrasenna: contrasenna,
            correo: correo,
            descripcion: descripcion,
            fin: fin,
            inicio: inicio,
            img: img,
            nombre: nombre,
            telefono: telefono,
            ubicacion: ubicacion
        });
    };
    MyService.prototype.crearEmpresa = function (fin, inicio, nombre, descripcion, telefono, imagen, correo, ubicacion, contrasenna) {
        return this.service.post(this.url + "CrearRestaurantes", {
            fin: fin,
            inicio: inicio,
            nombre: nombre,
            descripcion: descripcion,
            telefono: telefono,
            imagen: imagen,
            correo: correo,
            ubicacion: ubicacion,
            contrasenna: contrasenna
        });
    };
    MyService.prototype.getUnRestaurante = function (correo) {
        var data = { "correo": correo };
        return this.service.get(this.url + "getUnRestaurante", { params: data });
    };
    MyService.prototype.ModificarComprador = function (correo, codigo, duenno, numero, proveedor, vencimiento, nombre, telefono, ubicacion) {
        return this.service.post(this.url + "modificarUsuario", {
            correo: correo,
            codigo: codigo,
            duenno: duenno,
            numero: numero,
            proveedor: proveedor,
            vencimiento: vencimiento,
            nombre: nombre,
            telefono: telefono,
            ubicacion: ubicacion
        });
    };
    MyService.prototype.sacarDeCarrito = function (correo, carrito) {
        return this.service.post(this.url + "eliminarDelCarrito", {
            correo: correo,
            carrito: carrito
        });
    };
    MyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MyService);
    return MyService;
}());
exports.MyService = MyService;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDUevvD6dpiMbvh-sXaCgX66Bs9WMn3ZXQ",
        authDomain: "comidasexpress17.firebaseapp.com",
        databaseURL: "https://comidasexpress17.firebaseio.com",
        projectId: "comidasexpress17",
        storageBucket: "comidasexpress17.appspot.com",
        messagingSenderId: "283451118691"
    }
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map