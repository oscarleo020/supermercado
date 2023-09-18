import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  inicio(){
    this.router.navigate([""])
    console.log("navega");
  }

  productos(){
    this.router.navigate(["/productos"])
    console.log("navega");
  }

  administracion(){
      this.router.navigate(["/"])
      console.log("navega");
      
  }
}
