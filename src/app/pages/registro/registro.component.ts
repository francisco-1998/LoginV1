import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UsuarioModel } from "../../models/usuario.model";
import {AuthService} from '../../services/auth.service';
import  Swal  from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  remember = false;


  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  sendRegister(fR: NgForm) {
    if (fR.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });

    Swal.showLoading();

    this.auth.newUser(this.usuario).subscribe((resp) => {
      // console.log(resp);
      Swal.close();
      if(this.remember) {
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    },(err) => {
        // console.log(err.error.error.message);
        Swal.fire({
          title: 'Error durante el registro',
          text: err.error.error.message,
          icon: 'error'
        });
    });
  }
}
