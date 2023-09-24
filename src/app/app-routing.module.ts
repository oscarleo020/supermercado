import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ProductosComponent } from './Pages/productos/productos.component';
import { ListaProductosComponent } from './Pages/lista-productos/lista-productos.component';
import { DetallesComponent } from './Pages/detalles/detalles.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full",
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path:'productos',
    component:ProductosComponent
  },
  {
    path:'listaproductos',
    component:ListaProductosComponent
  },
  {
    path:'detalles',
    component:DetallesComponent
  },
  {
    path:'login',
    component:LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
