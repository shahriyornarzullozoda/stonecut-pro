import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Detail } from '../../interface/detail.model';
import { CostService } from '../../../services/cost.service';

@Component({
  selector: 'app-project-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-sidebar.component.html',
  styleUrl: './project-sidebar.component.scss'
})

export class ProjectSidebarComponent {
  @Output() openCost = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  constructor( private project: ProjectService) {}

  width: number = 0;
  height: number = 0;
  quantity: number = 1;
  name: string = '';
  note: string = '';

  resetForm() {
    this.width = 0;
    this.height = 0;
    this.quantity = 1;
    this.name = '';
    this.note = '';
  }

  addDetail() {
    if (this.width <= 0 || this.height <= 0 || this.quantity < 1) {
      // можно добавить toast / alert
      console.warn('Некорректные размеры или количество');
      return;
    }

    this.project.addDetail({
      width: this.width,
      height: this.height,
      qty: this.quantity,
      name: this.name.trim() || `Деталь ${this.width}×${this.height}`,
      note: this.note.trim() || undefined,
    });

    this.resetForm();
  }

  calculateCutting() {
    if (!this.project.details.length) {
      alert('Добавьте хотя бы одну деталь');
      return;
    }

    const material = this.project.material;

    if (!material) {
      alert('Выберите материал перед расчётом раскроя');
      this.nextStep.emit();
      return;
    }

    this.project.calculateCutting(material);

    this.openCost.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.name.endsWith('.csv')) {
      alert('Пожалуйста, выберите файл .csv');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.parseCsv(text);
    };
    reader.readAsText(file);
    input.value = '';
  }

  private parseCsv(csv: string) {
    const lines = csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    if (lines.length < 1) return;

    // Пропускаем заголовок, если он есть
    const dataLines = lines.slice(lines[0].toLowerCase().includes('ширина') ? 1 : 0);

    let added = 0;
    let skipped = 0;

    dataLines.forEach((line, idx) => {
      const cols = line.split(',').map(c => c.trim());
      if (cols.length < 2) return;

      const w = Number(cols[0]);
      const h = Number(cols[1]);
      const q = Number(cols[2] || 1);
      const name = cols[3] || '';
      // const note = cols[4] || '';

      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        skipped++;
        return;
      }

      this.project.addDetail({
        width: w,
        height: h,
        qty: Math.max(1, q),
        name: name || `Деталь ${w}×${h}`,
      });
      added++;
    });

    if (added > 0) {
      console.log(`Добавлено деталей: ${added}, пропущено: ${skipped}`);
    }
  }
}
