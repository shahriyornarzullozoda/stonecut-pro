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
  width: number | null = null;
  height: number | null = null;
  quantity = 1;
  name = '';
  note = '';

  constructor(private project: ProjectService, private costService: CostService) { }


  addDetail() {
    if (!this.width || !this.height || this.quantity < 1) {
      return;
    }

    this.project.addDetail({
      width: this.width,
      height: this.height,
      qty: this.quantity,
      name: this.name,
    });
    this.width = 0;
    this.height = 0;
    this.quantity = 1;
    this.name = '';
    this.note = '';
  }

  calculate() {
    if (!this.project.details.length) return;

    this.project.calculateLayout();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      this.parseCsv(text);
    };

    reader.readAsText(file);
    input.value = '';
  }
  parseCsv(csv: string) {
    const lines = csv
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    const dataLines = lines.slice(1);

    dataLines.forEach((line, index) => {
      const [width, height, qty, name, note] = line.split(',');

      const w = Number(width);
      const h = Number(height);
      const q = Number(qty || 1);

      if (!w || !h) {
        console.warn(`Строка ${index + 2} пропущена`);
        return;
      }

      this.project.addDetail({
        width: w,
        height: h,
        qty: q,
        name: name?.trim() || `Деталь ${w}×${h}`,
      });
    });
  }

}

