import { Component } from '@angular/core';
import { CanvasService } from '../../services/canvas.service';
import { CommonModule, PercentPipe } from '@angular/common';
import { Detail } from '../interface/detail.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [PercentPipe, CommonModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {
 zoom = 1;
  transform = '';
  details: Detail[] = [];

  private panning = false;
  private lastX = 0;
  private lastY = 0;
   
  
  totalSheets = 0; 
  usagePercent = 0;


  constructor(private canvas: CanvasService, private project: ProjectService) {
  }

 ngOnInit() {
   this.canvas.canvas$.subscribe(state => {
    this.zoom = state.zoom;
    this.transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.zoom})`;
  });

  this.project.details$.subscribe(details => {
    this.details = details;
    this.calculateCanvasStats();
  });
}
  calculateCanvasStats() {
  const sheetArea = 2550 * 1250; 
  const totalArea = this.details.reduce((sum, d) => sum + (d.width * d.height * d.qty), 0);
  this.totalSheets = Math.ceil(totalArea / sheetArea);
  this.usagePercent = totalArea && sheetArea 
    ? Math.min(100, Math.round((totalArea / (this.totalSheets * sheetArea)) * 100)) 
    : 0;
}


  zoomIn() { this.canvas.zoomIn(); }
  zoomOut() { this.canvas.zoomOut(); }
  reset() { this.canvas.resetView(); }

  startPan(e: MouseEvent) { if (e.button !== 0) return; this.panning = true; this.lastX = e.clientX; this.lastY = e.clientY; }
  onPan(e: MouseEvent) { if (!this.panning) return; this.canvas.move(e.clientX - this.lastX, e.clientY - this.lastY); this.lastX = e.clientX; this.lastY = e.clientY; }
  endPan() { this.panning = false; }
  deleteDetail(detail: Detail) {
  this.project.removeDetail(detail);
}

optimizeDetail(detail: Detail) {
  this.project.optimizeDetail(detail); 
}

toggleLock(detail: Detail) {
  // detail.locked = !detail.locked;
}
  clearAll() {
    this.project.clear();
  }

  optimizeAll() {
     const optimized = this.details.map(d => ({
    ...d,
    x: Math.random() * 500, 
    y: Math.random() * 500,
    color: '#f59e0b' 
  }));

  // this.detailsSubject.next(optimized);
  }

  saveAll() {
  const dataToSave = this.details.map(d => ({
    id: d.id,
    width: d.width,
    height: d.height,
    qty: d.qty,
    name: d.name,
    x: d.x,
    y: d.y
  }));

  console.log('Сохраняем детали проекта:', dataToSave);

}
  

}
  


