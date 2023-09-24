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

  // funcion para agregar un nuevo producto al carrito de compras
  agregar() {
    this.producto['compra'] = 1;
    // se camptura la lista de productos agregados al carrito de compras
    let carrito: [modelProducto] = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
      //si el carrito de compras tiene productos
      carrito.forEach((element) => {
        // se valida si existe
        if (element.codigo == this.producto.codigo) {
          // si existe se aumenta la cantidad del producto en 1
          element.compra++;
        } else {
          // si no existe se agrega el item a la lista de carrito de comrpas
          carrito.push(this.producto);
        }
      });
    } else {
      // si no existe se agrega el item a la lista de carrito de comrpas
      carrito = [this.producto];
    }

    this.productos = carrito;
    // se guardan los cambios en el carrito de comrpas en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // se envia un modal informando que el producto se guardo en el carrito
    Swal.fire({
      title: 'Agregado!',
      text: 'Nuevo producto agregado al carrito',
      icon: 'info',
      timer: 2000,
      confirmButtonText: 'Continuar',
    });
  }
  detalles() {
    // se almacena el producto en el localStorage para ser mostrado en la ventada detalles
    localStorage.setItem('producto', JSON.stringify(this.producto));
    // se navega a la ventada detalles para mostrar la informacion del producto
    this.router.navigate(['/detalles']);
  }
}
