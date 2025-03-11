export interface Photo {
  id: string; // ID del documento en Firestore
  title: string; // Título de la imagen
  description: string; // Descripción de la imagen
  url: string; 
  team: string;// URL de la imagen en Firebase Storage
  userId?: string; // ID del usuario que subió la imagen
  createdAt: Date; // Fecha de creación
  isActive: boolean; // Estado de activación (si está activo o no)
}
