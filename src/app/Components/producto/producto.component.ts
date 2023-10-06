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
    debugger;
    // se camptura la lista de productos agregados al carrito de compras
    let carrito: [modelProducto] = JSON.parse(localStorage.getItem('carrito'));
    if (
      carrito && // se valida si existe un carrito creado
      carrito.length > 0 // se valida si el carrito tiene mas de 0 productos agregados
    ) {
      // se valida que el producto seleccionado este en la lista del carrito)
      if (carrito.find((producto) => producto.codigo == this.producto.codigo)) {
        carrito.forEach((element) => {
          // se valida si existe
          if (element.codigo == this.producto.codigo) {
            // si existe se aumenta la cantidad del producto en 1
            element.compra++;
          }
        });
      } else {
        this.producto['compra'] = 1;
        // si no existe se agrega el item a la lista de carrito de comrpas
        carrito.push(this.producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      this.producto['compra'] = 1;
      // si no existe se agrega el item a la lista de carrito de comrpas
      carrito = [this.producto];
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

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
