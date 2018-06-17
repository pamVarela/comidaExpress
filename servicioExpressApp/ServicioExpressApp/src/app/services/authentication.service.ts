
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService, SocialUser } from "angularx-social-login";
import { auth } from "firebase";


@Injectable()  
export class AthenticationService{
    constructor(public afAuth: AngularFireAuth) {
    }
    login() {
        //viene un provider google porque firebase es dde google esto permite hacerlo m'as directo
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    logout() {
        this.afAuth.auth.signOut();
    }
}