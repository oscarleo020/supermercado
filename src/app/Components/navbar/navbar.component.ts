import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuActivo = 'inicio';
  productoServ;
  admin
  constructor(
    private router: Router,
  ) {
    if (localStorage.getItem('admin')) {
      this.admin = true;
    }
  }

  ngOnInit(): void {}

  inicio() {
    this.menuActivo = 'inicio';
    this.router.navigate(['']);
  }

  productos() {
    this.menuActivo = 'productos';
    this.router.navigate(['/productos']);
  }

  administracion() {
    if (!localStorage.getItem('admin')) {
      Swal.fire({
        title: 'Solo usuarios administradores pueden ingresar.',
        icon: 'warning',
      });
      return;
    }
    this.menuActivo = 'administracion';
    this.router.navigate(['/listaproductos'], {
      queryParams: { nav: 'administrador' },
    });
  }

  carrito() {
    let carrito = localStorage.getItem('carrito');
    if (carrito) {
      this.router.navigate(['/listaproductos'], {
        queryParams: { nav: 'carrito' },
      });
      return
    }
    Swal.fire({
      title:"Alerta",
      icon:"info",
      text:"No tiene productos en el carrito"
    })
  }
  login() {
    this.router.navigate(['/login']);
  }
}
