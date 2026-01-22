import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Material, MATERIALS } from '../../interface/material.model';

@Component({
  selector: 'app-materials-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials-sidebar.component.html',
  styleUrl: './materials-sidebar.component.scss'
})
export class MaterialsSidebarComponent {
  materials = MATERIALS;
  selectedMaterial?: Material;

  @Output() openCost = new EventEmitter<Material>()

  selectMaterial(material: Material) {
    this.selectedMaterial = material;
  }

  calculateCut() {
    if (!this.selectedMaterial) return;
    this.openCost.emit(this.selectedMaterial);
  }
}

