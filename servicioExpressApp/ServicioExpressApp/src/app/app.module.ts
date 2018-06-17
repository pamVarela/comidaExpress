import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MyService } from "./services/service.service";
import { AthenticationService} from './services/Authentication.service';

import { AngularFireModule } from 'angularfire2';
import {Routes, RouterModule} from "@angular/router";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './components/login/login.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { AppComponent } from './app.component';
import { PublicaComponent } from './components/publica/publica.component';


import { FormsModule } from  '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';

export const firebaseConfig = {
  apiKey: "AIzaSyD0BCFIaeyZb6voEQYn6hW2DfAz_MnVORk",
  authDomain: "servicioexpress-e4da9.firebaseapp.com",
  databaseURL: "https://servicioexpress-e4da9.firebaseio.com",
  storageBucket: "servicioexpress-e4da9.appspot.com",
  messagingSenderId: "632191827663"
}

const routes: Routes = [
  //this.router.navigate(["/system/login"]);
  {path:'',component :LoginComponent},
  {path:'components/publica',component :PublicaComponent},
  {path:'components/restaurante',component :RestauranteComponent},
  {path:'components/registro',component :RegistroComponent}

];

const AppRoutingModule = RouterModule.forRoot(routes,{useHash:true});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicaComponent,
    RestauranteComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule 
        
  ],
  providers: [MyService,AthenticationService],
  bootstrap: [AppComponent]
})




export class AppModule { }

