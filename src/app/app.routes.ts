
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { PanelComponent } from './Components/User/panel/panel.component';
import { RegisterComponent} from './Components/Auth/register/register.component';

import { GaleriaComponent } from './Components/User/galeria/galeria.component';
import { CrearIComponent } from './Components/User/crear-i/crear-i.component';
import { FiltrosComponent } from './Components/User/filtros/filtros.component';
import { DescargarPDFComponent } from './Components/User/descargar-pdf/descargar-pdf.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: PanelComponent,
    children: [{path: 'galeria', component: GaleriaComponent},
    { path: 'crear-i', component: CrearIComponent},
    { path: 'filtros', component: FiltrosComponent},
    { path: 'descargar-pdf', component: DescargarPDFComponent},
  ]},
  { path: '**', redirectTo: 'login' } 
];