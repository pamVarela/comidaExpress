import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from '../../app.module';
import { RouterTestingModule} from '@angular/router/testing';

import { MyService } from '../../services/service.service';
import { PublicaComponent} from '../publica/publica.component';
import { RestauranteComponent} from '../restaurante/restaurante.component';
import { RegistroComponent} from '../registro/registro.component';

import { AthenticationService } from '../../services/Authentication.service';


const routes: Routes = [
  //this.router.navigate(["/system/login"]);
  {path:'',component :LoginComponent},
  {path:'components/publica',component :PublicaComponent},
  {path:'components/restaurante',component :RestauranteComponent},
  {path:'components/registro',component :RegistroComponent}

];

const AppRoutingModule = RouterModule.forRoot(routes,{useHash:true});

describe('LoginComponent', () => {
  let component: LoginComponent;
  //con referencia al html y login component
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent,
        PublicaComponent,
        RestauranteComponent,
        RegistroComponent
      ],
      
      imports: [
        BrowserModule,
        HttpClientModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        FormsModule,
        RouterTestingModule
      ],
      providers:[MyService,AthenticationService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prueba login comprador', () => {
    component.email="Jurguen.r.r@gmail.com"
    component.password="123"
    component.LogInGeneralUsuario()
    console.log(component.userSession.email+"a la verga")
    expect(component.userSession.email.length).toBeGreaterThan(0)
  });

  it('prueba login comprador erroneo', () => {
    component.email="Jurguen.r@gmail.com"
    component.password="123"
    component.LogInGeneralUsuario()
    console.log(component.userSession.email)
    expect(component.userSession.email.length).toBeGreaterThan(0)
  });


});
