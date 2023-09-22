import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  listaProductos: any;
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.initProductos();
  }

  async initProductos() {
    await this.http.get('./assets/json/productos.json').subscribe(
      (response) => {
        this.listaProductos = response;
      },
      (error) => console.error(error)
    );
  }
}
