import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1";
  private apiKey = "AIzaSyDwkzieedTKGYuxTac8QRDntGFaon5rpqw";
  userIdToken: string;

  constructor(private http: HttpClient) {
    this.getUserIdToken();
  }

  //Funcion para realizar el registro
  newUser(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.contrasena,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData)
      .pipe(
        map((resp) => {
          console.log("Entramos al map de RXJS");
          this.storeUserIdToken(resp["idToken"]);
          return resp;
        })
      );
  }

  //Funcion para el login
  login(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.contrasena,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map((resp) => {
        this.storeUserIdToken(resp['idToken']);
        return resp;
      })
    );
  }

  //Funcion para guardar el token en localStorage
  private storeUserIdToken(idToken: string) {
    this.userIdToken = idToken;
    localStorage.setItem("token", idToken);
  }

  //Funcion para obtener el token en localStorage
  private getUserIdToken() {
    if (localStorage.getItem("token")) {
      this.userIdToken = localStorage.getItem("token");
    } else {
      this.userIdToken = "";
    }
  }

  isAuth(): boolean {
    if(this.userIdToken.length > 2) {

      return true;
    }
  }


  logout() {
    localStorage.removeItem('token');
  }
}
