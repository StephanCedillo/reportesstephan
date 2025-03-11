import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "reportemantenimiento-e0781", appId: "1:1092311501208:web:c245912c04f62b77ecc3ed", storageBucket: "reportemantenimiento-e0781.firebasestorage.app", apiKey: "AIzaSyAmWGPXwWtDXLz7E8eyF1RkdcICzZSJHTM", authDomain: "reportemantenimiento-e0781.firebaseapp.com", messagingSenderId: "1092311501208", measurementId: "G-JM1HCP1KV8" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
