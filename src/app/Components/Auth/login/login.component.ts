import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { FirebaseError } from 'firebase/app';  // Ya tienes esto importado
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf,  RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailLogin: string = '';
  passwordLogin: string = '';
  user: User | null = null;
  errorMessage: string = '';  // Para mostrar el mensaje de error
  isLoginActive = true; // Track which form (login or signup) is active

toggleForm(formType: string): void {
  const loginForm = document.querySelector('.login');
  const signupForm = document.querySelector('.signup');

  if (formType === 'login') {
    loginForm?.classList.remove('slide-up');
    signupForm?.classList.add('slide-up');
  } else {
    signupForm?.classList.remove('slide-up');
    loginForm?.classList.add('slide-up');
  }
}

  constructor(private authService: AuthService, private router: Router) {}

  // Registrar un nuevo usuario con correo y contraseña
  async register() {
    try {
      this.user = await this.authService.registerWithEmail(this.email, this.password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {  // Usamos FirebaseError aquí
        this.errorMessage = error.message;  // FirebaseError tiene la propiedad message
      } else {
        this.errorMessage = 'Error desconocido al registrar';
      }
    }
  }

  // Iniciar sesión con correo y contraseña
  async login() {
    try {
      this.user = await this.authService.loginWithEmail(this.emailLogin, this.passwordLogin);
      this.router.navigate(['/user']);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al iniciar sesión';
      }
    }
  }

  // Iniciar sesión con Google
  async loginWithGoogle() {
    try {
      this.user = await this.authService.loginWithGoogle();
      this.router.navigate(['/user/galeria']);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al autenticar con Google';
      }
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.authService.logout();
      this.user = null;  // Limpiar el usuario después de cerrar sesión
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Error desconocido al cerrar sesión';
      }
    }
  }
}
