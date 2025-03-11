import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuActive: boolean = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
      this.menuActive = false; // Cierra el menú después de hacer clic en un enlace en móviles
    }
  }
}
