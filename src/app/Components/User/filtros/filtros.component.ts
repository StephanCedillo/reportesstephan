import { Component, EventEmitter, Output } from '@angular/core';
import { Photo } from '../Model/photo';
import { PhotoService } from '../photo.service';
import { FilterService } from '../filter.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filtros',
  imports: [FormsModule, ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  searchTitle: string = '';
  searchDescription: string = '';
  searchDate: string = '';
  searchIsActive: string = '';
  searchActive: boolean = false;

  constructor(private filterService: FilterService, private router: Router) {}

  applyFilters() {
    
    this.filterService.setFilters({
      searchTitle: this.searchTitle,
      searchDescription: this.searchDescription,
      searchDate: this.searchDate,
      searchIsActive: this.searchIsActive !== '' ? this.searchIsActive === 'true' : null, // Convierte a booleano o null
    });
    this.searchActive = true;

    // Redirigir a la galería después de aplicar los filtros
    this.router.navigate(['/user/galeria']);
  }
  
    deleteFilters() {
      // Restablecer los filtros a su valor inicial
      this.searchTitle = '';
      this.searchDescription = '';
      this.searchDate = '';
      this.searchActive = false;
  
      // Aplicar los filtros vacíos para mostrar todas las fotos
      this.applyFilters();
    }
}
