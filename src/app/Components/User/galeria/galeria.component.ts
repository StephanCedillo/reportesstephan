import { Component,OnInit} from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../Model/photo';
import { DatePipe, NgFor } from '@angular/common';
import { FilterService } from '../filter.service';
@Component({
  selector: 'app-galeria',
  imports: [NgFor, DatePipe],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit{
  photos: Photo[] = [];  // Lista de todas las fotos
  filteredPhotos: Photo[] = []; // Lista de fotos filtradas
  searchTitle: string = ''; // Filtro por título
  searchDescription: string = ''; // Filtro por descripción
  searchDate: string = ''; // Filtro por fecha
  searchIsActive: string = ''; // Filtro por estado activo

  constructor(private photoService: PhotoService, private filterService: FilterService) {
    this.photos = this.photoService.getPhotos();
    this.filteredPhotos = [...this.photos];
  }

  
  

  // Método para eliminar una foto
  deletePhoto(photoId: string): void {
    this.photoService.deletePhoto(photoId); // Elimina la foto del servicio
    this.filteredPhotos = this.filteredPhotos.filter(photo => photo.id !== photoId); // Elimina de la lista filtrada
    alert('Foto eliminada correctamente');
  }


  

  

  ngOnInit() {
    this.filterService.filters$.subscribe(filters => this.applyFilters(filters));
  }

  applyFilters(filters: any) {
    this.filteredPhotos = this.photos.filter(photo => {
      const matchesTitle = filters.searchTitle
        ? photo.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
        : true;
  
      const matchesDescription = filters.searchDescription
        ? photo.description.toLowerCase().includes(filters.searchDescription.toLowerCase())
        : true;
  
      const matchesDate = filters.searchDate
        ? new Date(photo.createdAt).toISOString().split('T')[0] === filters.searchDate
        : true;
  
      // Asegurar que searchIsActive se maneje correctamente como booleano o ignorado si es null
      const matchesIsActive = filters.searchIsActive !== null
        ? photo.isActive === filters.searchIsActive
        : true;
  
      return matchesTitle && matchesDescription && matchesDate && matchesIsActive;
    });
  }
  
}
