import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuActivo = 'inicio';
  productoServ;
  admin;
  constructor(private router: Router) {
    if (localStorage.getItem('admin')) {
      this.admin = true;
    }
  }
  //! Funcion cuando dan click en el menu Inicio
  inicio() {
    // se activa el menu inicio
    this.menuActivo = 'inicio';
    // se navega al menu inicio
    this.router.navigate(['']);
  }
  //! Funcion cuando dan click en el menu Productos
  productos() {
    // se activa el menu productos
    this.menuActivo = 'productos';
    // se navega a la lista de los productos
    this.router.navigate(['/productos']);
  }
  //! Funcion cuando dan click en el menu Administracion
  administracion() {
    // Se valida que el usuario este logeado
    if (!localStorage.getItem('admin')) {
      // si no esta logeado se envia alerta que primero tiene que ingresar los datos del administrador
      Swal.fire({
        title: 'Solo usuarios administradores pueden ingresar.',
        icon: 'warning',
      });
      return;
    }
    //Se activa el menu administracion
    this.menuActivo = 'administracion';
    /**
     * Se navega a al componente listaProductos que es el mismod e carrito de compras
     * pero con el parametro de administrador para que no muestre las opciones del
     * carrito de compras si no la del administrador
     */

    this.router.navigate(['/listaproductos'], {
      queryParams: { nav: 'administrador' },
    });
  }

  carrito() {
    // se valida que el usuario tenga productos agregados en el carrito
    let carrito = localStorage.getItem('carrito');
    if (carrito) {
      /**
       * si tiene productos se envia a la listaProductos con el parametro carrito
       * para que el capture la informacion del localStora de la lista de los productos
       * agregados al carrito de compra
       */
      this.router.navigate(['/listaproductos'], {
        queryParams: { nav: 'carrito' },
      });
      // y se retorna la funcion para que no continue
      return;
    }
    // al no tener productos en el carrito se notifica al usuario con una alerta
    Swal.fire({
      title: 'Alerta',
      icon: 'info',
      text: 'No tiene productos en el carrito',
    });
  }
  login() {
    // se navega al componente login
    this.router.navigate(['/login']);
  }
}
