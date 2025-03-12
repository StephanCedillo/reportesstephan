import { Injectable } from '@angular/core';
import { Photo } from './Model/photo';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photos: Photo[] = [];

  addPhoto(imgUrl: string, title: string, description: string, team: string, isActive: boolean, userId: string): void {
    // Asegúrate de que 'team' esté incluido aquí
    console.log('Subiendo foto con los siguientes datos:', { imgUrl, title, description, team, isActive, userId });
  
    const newPhoto: Photo = {
      id: uuidv4(), // Genera un ID único
      title,
      description, // Asegúrate de que 'description' sea incluido
      team,         // Asegúrate de que 'team' sea incluido
      url: imgUrl,
      userId,       // Ahora se incluye userId
      isActive,     // Asegúrate de que 'isActive' sea incluido
      createdAt: new Date() // Guarda la fecha actual
    };
  
    this.photos.unshift(newPhoto); // Agregar al inicio de la lista
    console.log('Nueva foto agregada:', newPhoto);
  }
  
  

  getPhotos(): Photo[] {
    return this.photos;
  }
  getPhotoById(id: string): Photo | null {
    return this.photos.find(photo => photo.id === id) || null; // Asegúrate de que 'id' sea un campo único en tu modelo
  }
  

  updatePhoto(updatedPhoto: Photo): void {
    const index = this.photos.findIndex(photo => photo.id === updatedPhoto.id);
    if (index !== -1) {
      // Actualizar los filtros junto con los demás campos
      this.photos[index] = updatedPhoto;
      console.log('Foto actualizada:', updatedPhoto);
    }
  }
  deletePhoto(photoId: string): void {
    const index = this.photos.findIndex(photo => photo.id === photoId);
    if (index !== -1) {
      this.photos.splice(index, 1);  // Elimina la foto de la lista
      console.log(`Foto con ID ${photoId} eliminada`);
    }
  }
  
  
}
