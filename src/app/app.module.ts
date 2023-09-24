import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ProductosComponent } from './Pages/productos/productos.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { ListaProductosComponent } from './Pages/lista-productos/lista-productos.component';
import { MatTableModule } from '@angular/material/table';
import { DetallesComponent } from './Pages/detalles/detalles.component';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    ProductosComponent,
    ProductoComponent,
    ListaProductosComponent,
    DetallesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgbModule,
    HttpClientModule,
    MatBadgeModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
