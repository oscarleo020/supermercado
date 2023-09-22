import { Injectable } from '@angular/core';
import { modelProducto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: [modelProducto];
  constructor() {}

  agregar(producto) {
    let carrito: [modelProducto] = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
      carrito.push(producto);
    } else {
      carrito = [producto];
    }
    this.productos = carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}
