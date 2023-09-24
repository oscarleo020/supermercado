import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelProducto } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  @Input() producto: modelProducto;
  productos: [modelProducto];
  constructor(private router: Router) {}
  ngOnInit(): void {}

  agregar() {
    this.producto['compra'] = 1;
    let carrito: [modelProducto] = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
      carrito.forEach((element) => {
        if (element.codigo == this.producto.codigo) {
          element.compra++;
        } else {
          carrito.push(this.producto);
        }
      });
    } else {
      carrito = [this.producto];
    }
    this.productos = carrito;
    localStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
      title: 'Agregado!',
      text: 'Nuevo producto agregado al carrito',
      icon: 'info',
      timer: 2000,
      confirmButtonText: 'Continuar',
    });
  }
  detalles() {
    localStorage.setItem('producto', JSON.stringify(this.producto));
    this.router.navigate(['/detalles']);
  }
}
