import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuActivo = 'inicio';
  productoServ;
  constructor(
    private router: Router,
    public PoductosService: ProductosService
  ) {
    // this.productoServ = this.PoductosService;
  }

  ngOnInit(): void {
    this.menuActivo = localStorage.getItem('menu');
    console.log(this.router.url);
  }

  inicio() {
    localStorage.setItem('menu', 'inicio');
    this.router.navigate(['']);
    console.log('navega');
    console.log(this.router.url);
  }

  productos() {
    localStorage.setItem('menu', 'productos');
    this.router.navigate(['/productos']);
    console.log('navega');
    console.log(this.router.url);
  }

  administracion() {
    localStorage.setItem('menu', 'administracion');
    this.router.navigate(['/administracion']);
    console.log('navega');
    console.log(this.router.url);
  }
  carrito() {
    this.router.navigate(['/carrito']);
    console.log('carrito');
    console.log(this.router.url);
  }
}
