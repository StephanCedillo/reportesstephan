import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { User, AuthError,prodErrorMap,debugErrorMap} from 'firebase/auth'; // Importa FirebaseError
import { FirebaseError } from 'firebase/app';  // Asegúrate de importar FirebaseError

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Registrar un nuevo usuario con correo y contraseña
  async registerWithEmail(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      return userCredential.user;
    } catch (error: unknown) { // Define el tipo de error como unknown
      if (error instanceof FirebaseError) { // Verifica si el error es una instancia de FirebaseError
        if (error.code === 'auth/email-already-in-use') {
          console.error('Este correo ya está en uso. Intenta con otro.');
          throw new Error('Este correo ya está en uso.');
        }
      } else {
        console.error('Error en registro:', error);
      }
      throw error;  // Si no es un error esperado, lo lanzamos tal cual.
    }
  }

  // Iniciar sesión con correo y contraseña
  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      return userCredential.user;
    } catch (error: unknown) { // Define el tipo de error como unknown
      if (error instanceof FirebaseError) { // Verifica si el error es una instancia de FirebaseError
        if (error.code === 'auth/invalid-credential') {
          console.error('Credenciales inválidas. Verifica tu correo y contraseña.');
          throw new Error('Credenciales inválidas.');
        }
      } else {
        console.error('Error en inicio de sesión:', error);
      }
      throw error;  // Si no es un error esperado, lo lanzamos tal cual.
    }
  }

  // Iniciar sesión con Google
  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('✅ Usuario autenticado:', result.user);
      return result.user;
    } catch (error: unknown) { // Define el tipo de error como unknown
      if (error instanceof FirebaseError) { // Verifica si el error es una instancia de FirebaseError
        if (error.code === 'auth/popup-closed-by-user') {
          console.error('El usuario cerró el popup antes de completar el inicio de sesión.');
          throw new Error('El usuario cerró el popup antes de completar el inicio de sesión.');
        }
      } else {
        console.error('❌ Error en autenticación:', error);
      }
      throw error;  // Si no es un error esperado, lo lanzamos tal cual.
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('👋 Usuario cerró sesión');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
