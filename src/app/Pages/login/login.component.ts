import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user;
  pass;

  constructor(private router: Router) {}
/**
 * !Funcion login
 * Funcion para validacion de las credenciales del usuario administrador
 * estas credenciales estan quemadas con los valores 'admin'
 */
  login() {
    localStorage.removeItem('producto');
    localStorage.setItem('admin', 'true');
    //!Aqui se valida usuario y contraseña
    if (this.user == 'admin' && this.pass == 'admin') {
      // al validar que el usuario y contraseña son correctos se navega al componente de listaProductos con el parametro administrador para motrar las opciones de este
      this.router.navigate(['/listaproductos'], {
        queryParams: { nav: 'administrador' },
      });
    }
  }
}
