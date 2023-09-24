import { Component, OnInit } from '@angular/core';
import { modelProducto } from 'src/app/models/producto.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  listaProductos;
  total = 0;
  origen = 'carrito';
  title;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    /** se valida si en la navegacion se envia un parametro de origen la cual se almacena en la
     * variable Origen
     */
    this.route.queryParams.subscribe((params: Params) => {
      this.origen = params['nav'];
    });

    if (this.origen == 'administrador') {
      /** si el origen de navegacion es por el menu administrador
       * se genera el cambio del titulo a 'Lista de Productos'
       * y se trae todo los productos registrados del localStorage
       */
      this.title = 'Lista de Productos';
      this.listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    } else {
      /** si el origen no es administrador se cambia el titulo a carrito de compra
       * y se trae los productos agregados al carrito de compras
       */
      this.title = 'Carrito de Compra';
      this.listaProductos = JSON.parse(localStorage.getItem('carrito'));
    }
    /**funcion para totalizar el valor de la compra */
    this.totalcompra();
  }

  /**Funcion para aumentar la cantidad de los productos en el carrito */
  more(item) {
    /** se valida que la cantidad de productos a comprar no sea superior
     * al stock disponible del producto
     */
    if (this.listaProductos[item].stock != this.listaProductos[item].compra) {
      /** Al no ser mayor o igual se aumenta la cantidad a comprar */
      this.listaProductos[item].compra++;
      localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
      /** se totaliza el valor total de la compra */
      this.totalcompra();
    }
  }
  remove(item) {
    /** se valida que la cantidad a comprar no menor a 0 */
    if (this.listaProductos[item].compra > 0) {
      /** al no ser mejor a 0 se remueve un item a la cantidad de compra */
      this.listaProductos[item].compra--;
      localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
      /** se totaliza el valor total de la compra */
      this.totalcompra();
    }
  }

  totalcompra() {
    /** se inicia la variable en 0  */
    this.total = 0;
    /** se recore en un ciclo For los elementos del carrito de compra
     * con esto se multiplica la cantidad seleccionada con el valor unitario para tener
     * el total del producto y se suman al Total final de la compra en la variable Total inicada en 0
     */
    this.listaProductos.forEach((element: modelProducto) => {
      this.total =
        this.total +
        element.compra *
          (element.descuento > 0 ? element.descuento : element.valor);
    });
    console.log(this.total);
  }

  async comprar() {
    /** se solicita mediante un Modal la direccion de envio de los productos */
    await Swal.fire({
      title: 'Ingrese la dirección de envio de sus productos!',
      html:
        '<div class="form-group">' +
        '<input id="input-field" type="text" class="form-control" />' +
        '</div>',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    // se elimina del localStorage los productos agregados al carrito de compra
    localStorage.removeItem('carrito');
    // y se redireciona a la lista de productos disponibles para comprar
    this.router.navigate(['/productos']);
  }

  eliminarProducto(item) {
    //! esta funcion solo esta disponible si el origen es administrador
    /**
     * se envia una notificacion por medio de un modal informando que se
     * elliminara el producto del localStorage
     */
    Swal.fire({
      title: 'Desea Continuar',
      text: 'Esta acción eliminará de forma permanente el producto',
      icon: 'info',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    }).then((response) => {
      if (response.isConfirmed) {
        /** Si el administrador da click en ok se procede a eliminar el producto de la lista */
        this.listaProductos = this.listaProductos.filter(
          (producto) => producto.codigo != item.codigo
        );
        localStorage.setItem(
          'listaProductos',
          JSON.stringify(this.listaProductos)
        );
      }
    });
  }

  modificarProducto(producto) {
    /** se almacena el producto seleccionado en el localStorage para poder
     * poder ser leido en los campos del componente detalles
      */
    localStorage.setItem('producto', JSON.stringify(producto));
    /** se navega al copmponente detalles con origen de editar con el fin de
     * que el componente detalles active los campos de input
     */
    this.router.navigate(['/detalles'], { queryParams: { nav: 'editar' } });
  }

  crearProducto() {
    /** 
     * se navega al componente detalles con el origen nuevo con el fin que no genere una 
     * pregarga de la informacion almacenada en el localStorage
     */
    this.router.navigate(['/detalles'], { queryParams: { nav: 'nuevo' } });
  }
}
