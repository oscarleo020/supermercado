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
  /**
   * Funcion para iniciar la carga de los productos que se encuentran registrados en el
   * archivo JSON de productos
   */
  async initProductos() {
    /** se valida que no se cuente con una lista de productos en el localStorage */
    if (!localStorage.getItem('listaProductos')) {
      /** al no contar con una lista de productos
       * se genera un llamado get para la captura de la informacion */
      await this.http.get('./assets/json/productos.json').subscribe(
        (response) => {
          /** al tener respuesta afirmativa se almacena los productos en localStoraga para tener
           * persistencia de los datos
           */
          localStorage.setItem('listaProductos', JSON.stringify(response));
          this.listaProductos = JSON.parse(
            localStorage.getItem('listaProductos')
          );
        },
        /** al presentar un error se reportara en la consola del navegador */
        (error) => console.error(error)
      );
    } else {
      /**si ya se cuenta con una lista de productos almacenada se procede a capturarla y guardarla en la variable para ser mostrada en el HTML */
      this.listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }
  }
}
