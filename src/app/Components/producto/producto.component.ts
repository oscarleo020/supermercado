import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelProducto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  @Input() producto: modelProducto;
  constructor(
    private router: Router,
    private ProductoService: ProductosService
  ) {}
  ngOnInit(): void {}

  agregar() {
    this.ProductoService.agregar(this.producto);
  }
  detalles() {
    this.router.navigate(['/detalle']);
  }
}
