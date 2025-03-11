import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { FirebaseError } from 'firebase/app';  // Ya tienes esto importado
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  emailLogin: string = '';
  passwordLogin: string = '';
  user: User | null = null;
  errorMessage: string = '';  // Para mostrar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  // Registrar un nuevo usuario con correo y contraseña
  async register() {
    try {
      this.user = await this.authService.registerWithEmail(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {  // Usamos FirebaseError aquí
        this.errorMessage = error.message;  // FirebaseError tiene la propiedad message
      } else {
        this.errorMessage = 'Error desconocido al registrar';
      }
    }
  }

}
