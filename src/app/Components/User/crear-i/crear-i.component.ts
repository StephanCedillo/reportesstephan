import { Component } from '@angular/core';
import { CameraComponent } from '../camera/camera.component';
import { PhotoService } from '../photo.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-i',
  imports: [CameraComponent,FormsModule],
  templateUrl: './crear-i.component.html',
  styleUrl: './crear-i.component.css'
})
export class CrearIComponent {
  imgUrl: string = ''; // Imagen capturada
  photoData = {
    title: '',
    team: '',
    description: '',
    isActive: null as boolean | null
  };

  constructor(private photoService: PhotoService, private router: Router) {}

  // Esta función se ejecuta cuando la foto es capturada
  onPhotoCaptured(photoUrl: string): void {
    this.imgUrl = photoUrl; // Actualiza la URL de la imagen
  }

  // Subir la foto al servidor o servicio
  uploadPhoto(): void {
    // Validación de campos antes de subir la foto
    if (!this.imgUrl || !this.photoData.title || !this.photoData.team || !this.photoData.description || this.photoData.isActive === null) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
  
    const userId = 'default-user';
  
    
    const isActive: boolean = this.photoData.isActive ?? false; 
this.photoService.addPhoto(this.imgUrl, this.photoData.title, this.photoData.description, this.photoData.team, isActive, userId);

    // Limpiar el formulario
    this.photoData = { title: '', team: '', description: '', isActive: null as boolean | null };
    this.imgUrl = '';
    alert('Foto subida correctamente');
    
    this.router.navigate(['/user/galeria']);
  }
  
  
  
}
