import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor() { }

  private async checkPermissions(): Promise<boolean> {
    // Si estamos en la web, no necesitamos permisos
    if (this.isWeb()) {
      return true;
    }

    // En dispositivos móviles, verificamos los permisos
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted' || permissions.photos !== 'granted') {
      const request = await Camera.requestPermissions();
      return request.camera === 'granted' && request.photos === 'granted';
    }
    return true;
  }

  private isWeb(): boolean {
    return typeof window !== 'undefined' && window.document !== undefined;
  }

  async takePicture(): Promise<string> {
    // Primero, verificamos los permisos
    const hasPermissions = await this.checkPermissions();
    if (!hasPermissions) {
      throw new Error('Permisos de cámara no otorgados');
    }

    // Si estamos en la web, usamos un enfoque alternativo
    if (this.isWeb()) {
      return this.takePictureWeb();
    } else {
      return this.takePictureMobile();
    }
  }

  private async takePictureWeb(): Promise<string> {
    // Creamos un input de tipo archivo
    return new Promise<string>((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string); // Devolvemos la imagen en formato base64
          };
          reader.readAsDataURL(file);
        } else {
          reject('No se seleccionó ningún archivo');
        }
      };
      input.click(); // Simula un clic para abrir el selector de archivos
    });
  }

  private async takePictureMobile(): Promise<string> {
    // Usamos el complemento de Capacitor para capturar la foto en dispositivos móviles
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const imageUrl = image.webPath;
    if (imageUrl) {
      return imageUrl; // Devolvemos la URL de la imagen
    } else {
      throw new Error('Error al tomar la foto');
    }
  }
}
