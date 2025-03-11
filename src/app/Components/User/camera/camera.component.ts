import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CameraService } from '../camera.service';
import { PhotoService } from '../photo.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  @Output() photoCaptured = new EventEmitter<string>(); // Emitir la imagen capturada

  cameraService = inject(CameraService);
  photoService = inject(PhotoService);
  imgUrl: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = '';

    try {
      this.loading = true;
      this.imgUrl = await this.cameraService.takePicture();

      if (!this.imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }

      this.photoCaptured.emit(this.imgUrl); // Emitimos la URL de la imagen

      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imgUrl = '';
      this.loading = false;
    }
  }
}
