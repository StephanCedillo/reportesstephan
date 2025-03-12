// src/app/components/photo-detail/photo-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../photo.service';
import { Photo } from '../../Model/photo';  // Importa el modelo Photo
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-photo-detail',
  imports: [DatePipe,FormsModule, CommonModule],
  standalone: true,
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.css'
})
export class PhotoDetailComponent implements OnInit {
  photoSelected: Photo | null = null;  // Foto seleccionada, inicialmente es null
  isEditing: boolean = false;  // Para saber si estamos en modo edición

  // Variables temporales para editar
  tempTitle: string = '';
  tempDescription: string = '';
  tempTeam: string = '';
  tempIsActive: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService  // Inyectamos el servicio para obtener las fotos
  ) {}

  ngOnInit(): void {
    // Obtiene el ID de la URL y carga la foto correspondiente
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];  // Obtiene el ID de la foto desde la URL
      this.photoSelected = this.photoService.getPhotoById(id);  // Obtiene la foto a través del servicio

      if (!this.photoSelected) {
        this.router.navigate(['not-found']);  // Redirige a una página de error si no existe la foto
      } else {
        // Cargar las propiedades en variables temporales cuando estamos en modo vista
        this.tempTitle = this.photoSelected.title;
        this.tempDescription = this.photoSelected.description;
        this.tempTeam = this.photoSelected.team;
        this.tempIsActive = this.photoSelected.isActive;
      }
    });
  }

  editPhoto(): void {
    if (this.photoSelected) {
      // Cambiar a modo edición
      this.isEditing = true;
      // Cargar los valores actuales en las variables temporales
      this.tempTitle = this.photoSelected.title;
      this.tempDescription = this.photoSelected.description;
      this.tempTeam = this.photoSelected.team;
      this.tempIsActive = this.photoSelected.isActive;
    }
  }

  cancelEdit(): void {
    // Volver al modo de vista sin guardar cambios
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.photoSelected) {
      // Actualizar la foto con los valores de las variables temporales
      this.photoSelected.title = this.tempTitle;
      this.photoSelected.description = this.tempDescription;
      this.photoSelected.team = this.tempTeam;
      this.photoSelected.isActive = this.tempIsActive;

      // Guardar los cambios
      this.photoService.updatePhoto(this.photoSelected);

      // Volver al modo de vista
      this.isEditing = false;
    }
  }
}
