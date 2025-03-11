import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PhotoService } from '../photo.service'; 
import { Photo } from '../Model/photo'; 

@Component({
  selector: 'app-descargar-pdf',
  templateUrl: './descargar-pdf.component.html',
  styleUrls: ['./descargar-pdf.component.css']
})
export class DescargarPDFComponent implements OnInit {

  photos: Photo[] = []; 

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photos = this.photoService.getPhotos();
  }

  exportToPdf(): void {
    const doc = new jsPDF('landscape'); // Establece la orientación horizontal (landscape)

    // Configuración del tamaño A4 horizontal (297mm x 210mm)
    const pageWidth = doc.internal.pageSize.width; // 297mm (horizontal)
    const pageHeight = doc.internal.pageSize.height; // 210mm
    const margin = 10; // Márgenes de la página (en mm)
    const startX = margin;
    const startY = 20; // Inicio de la tabla después del título
    const columnWidths = [30, 40, 30, 80, 20]; // Ajustamos el ancho de las columnas (más ancho para la descripción)
    const headerHeight = 8; // Altura del encabezado
    const rowHeight = 8; // Altura de cada fila

    // Título del PDF
    doc.setFontSize(14); // Fuente más pequeña para el título
    doc.text('Reporte de Fotos', startX, startY);

    // Establecer la posición inicial para la tabla
    let currentY = startY + 15; // Después del título

    // Definir las columnas
    const columns = ['Fecha', 'Título', 'Equipo', 'Descripción', 'Estado'];
    const rows = this.photos.map(photo => [
      photo.createdAt.toLocaleDateString(),
      photo.title, 
      photo.team, 
      photo.description, 
      photo.isActive ? 'Activo' : 'Inactivo'
    ]);

    // Dibujar los encabezados
    doc.setFontSize(10); // Fuente pequeña para las celdas
    columns.forEach((col, index) => {
      doc.text(col, startX + columnWidths[index] * index, currentY);
    });

    // Dibujar las filas
    currentY += headerHeight; // Deja espacio debajo del encabezado
    rows.forEach((row, rowIndex) => {
      if (currentY + rowHeight > pageHeight - margin) {
        doc.addPage(); // Si la fila no cabe en la página, crea una nueva
        currentY = 20; // Resetea la posición Y para la nueva página
        columns.forEach((col, index) => {
          doc.text(col, startX + columnWidths[index] * index, currentY);
        });
        currentY += headerHeight;
      }

      row.forEach((cell, cellIndex) => {
        if (cellIndex === 3) { // Columna 'Descripción'
          // Ajuste de texto para la descripción: se maneja con la función de ajuste
          this.splitTextToFit(doc, cell, startX + columnWidths[cellIndex] * cellIndex, currentY, columnWidths[cellIndex]);
        } else {
          doc.text(cell, startX + columnWidths[cellIndex] * cellIndex, currentY);
        }
      });

      currentY += rowHeight; // Aumentar la posición para la siguiente fila
    });

    // Dibujar el borde inferior de la tabla
    doc.line(startX, currentY, startX + columnWidths.reduce((a, b) => a + b), currentY);

    // Guardar el PDF
    doc.save('reporte_fotos.pdf');
  }

  // Función para ajustar el texto de las celdas, especialmente para la descripción larga
  splitTextToFit(doc: jsPDF, text: string, x: number, y: number, maxWidth: number): void {
    const lines: string[] = doc.splitTextToSize(text, maxWidth); // Divide el texto si es necesario
    lines.forEach((line: string, index: number) => {
      doc.text(line, x, y + (index * 8)); // Dibuja cada línea
    });
  }
}
