import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { modelProducto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {
  origen = 'detalles';
  checkDescuento: boolean = false;
  titleCancelar = 'Cancelar';
  // se crean las variables necesarias para los campos input y la validacion del origen
  producto;
  titulo;
  imagen;
  codigo;
  cantidad;
  stock;
  nombre;
  descripcion;
  categoria;
  valor;
  descuento;
  editar: boolean = true;
  settings;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    /**
     * se valida el origen de donde viene la navegacion para poder validar que informacion
     * se precarga en los input
     */
    this.route.queryParams.subscribe((params: Params) => {
      this.origen = params['nav'];
    });

    if (this.origen == 'editar') {
      /**
       * !si el origen es editar
       * se cambia el titulo del boton de cancelar a volver
       */
      this.titleCancelar = 'Volver';
      // se activan los inputs
      this.editar = false;
      //se trae la informacion del producto seleccionado y almacenado en el localStorage
      this.producto = JSON.parse(localStorage.getItem('producto'));

      if (this.producto) {
        //si existe un producto se carga la informacion en las variables para mostrarlos en el HTML
        this.titulo = 'Creación de Producto';
        this.nombre = this.producto.nombre;
        this.cantidad = this.producto.cantidad;
        this.codigo = this.producto.codigo;
        this.descripcion = this.producto.descripcion;
        this.descuento = this.producto.descuento;
        this.categoria = this.producto.categoria;
        this.imagen = this.producto.imagen;
        this.valor = this.producto.valor;
        this.stock = this.producto.stock;
        if (this.descuento > 0) {
          // se el producto tiene un descuento se activa el check de descuento
          this.checkDescuento = true;
        }
      }
    } else if (this.origen == 'nuevo') {
      /**
       * !si el origen es nuevo
       * no se precarga ninguna informacion en las variables a mostar en el html
       * se activa los input para poder suministrar informacion
       */
      this.editar = false;
      // se cambia el titulo del boton cancelar a Cancelar
      this.titleCancelar = 'Cancelar';
      // se inicializa la variable producto como un nuevo producto con las caracteristicas del modelo ModelProducto
      this.producto = new modelProducto();
      // se inicia el idCategoria en 1
      this.producto.idCategoria = 1;
      // se carga una imagen de prueba
      this.imagen =
        'https://us.123rf.com/450wm/iconisa/iconisa1710/iconisa171002344/87284862-imagen-archivo-vector-línea-icono-signo-ilustración-sobre-fondo-blanco-trazos-editables.jpg?ver';
    } else {
      /**
       * !si el origen no es nuevo o adminstrador
       */
      // se cambia el titulo del boton cancelar a Cancelar
      this.titleCancelar = 'Volver';
      // se carga la informacion del producto seleccionado del localStorage
      this.producto = JSON.parse(localStorage.getItem('producto'));
      if (this.producto) {
        //si existe un producto se carga la informacion en las variables para mostrarlos en el HTML
        this.titulo = 'Creación de Producto';
        this.nombre = this.producto.nombre;
        this.cantidad = this.producto.cantidad;
        this.codigo = this.producto.codigo;
        this.descripcion = this.producto.descripcion;
        this.descuento = this.producto.descuento;
        this.categoria = this.producto.categoria;
        this.imagen = this.producto.imagen;
        this.valor = this.producto.valor;
        this.stock = this.producto.stock;
        if (this.descuento > 0) {
          this.checkDescuento = true;
        }
      }
    }
  }
  //! Funcion para guardar los cambios al editar o crear un producto
  guardar() {
    // se inicia una constante temporar del producto seleccionado
    const temProducto: modelProducto = this.producto;
    //se guarda en el temporar los datos de cada variable del HTML
    temProducto.nombre = this.nombre;
    temProducto.stock = this.cantidad;
    temProducto.codigo = this.codigo;
    temProducto.descripcion = this.descripcion;
    temProducto.descuento = this.descuento;
    /**
     * al seleccionar una categoria, el id de la categoria es enviada en String
     * para ello usamos el parseInt para cambiarlo a number
     */
    temProducto.idCategoria = parseInt(this.producto.idCategoria);
    temProducto.imagen = this.imagen;
    temProducto.valor = this.valor;
    temProducto.stock = this.stock;

    //se llama la lista de los productos del localStorage

    let listProductos = JSON.parse(localStorage.getItem('listaProductos'));
    // se filta de la lista de producto donde el codigo del producto no sea el producto a modificar o guardar
    const tempListaProductos = listProductos.filter(
      (item) => item.codigo != this.producto.codigo
    );
    // se agrega a la lista de productos el nuevo producto o el producto editado
    tempListaProductos.push(temProducto);
    // se guarda la lista en el localStorage
    localStorage.setItem('listaProductos', JSON.stringify(tempListaProductos));
    // se navega a la lista de productos disponible
    this.router.navigate(['/productos']);
  }

  cancelar() {
    // se remueve el producto seleccionado para modificar o ver
    localStorage.removeItem('producto');
    // se navega a la lista de productos disponible
    this.router.navigate(['/productos']);
  }


}
