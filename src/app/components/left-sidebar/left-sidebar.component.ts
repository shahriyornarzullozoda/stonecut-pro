import { Component } from '@angular/core';
import { ProjectComponent } from '../../pages/project/project.component';
import { ProjectSidebarComponent } from './project-sidebar/project-sidebar.component';
import { MaterialsSidebarComponent } from './materials-sidebar/materials-sidebar.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { CommonModule } from '@angular/common';
import { PriceModalComponent } from '../price-modal/price-modal.component';
import { Material } from '../interface/material.model';
import { Detail } from '../interface/detail.model';
import { ProjectService } from '../../services/project.service';
import { CanvasService } from '../../services/canvas.service';
import { CostDistribution, ProjectMetrics } from '../interface/ProjectCost';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, PriceModalComponent, ProjectSidebarComponent, MaterialsSidebarComponent, SettingsSidebarComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent  {
  currentStep: 'project' | 'materials' | 'settings' = 'project';
  details: Detail[] = [];
    projectCost?: {
    material: number;
    cutting: number;
    edge: number;
    waste: number;
    labor: number;
    markupPercent: number
  };


   metrics?: ProjectMetrics;
  distribution?: CostDistribution;
  constructor(private project: ProjectService) {
    }

  goToStep(step: 'project' | 'materials' | 'settings') {
    this.currentStep = step;
  }
  showCostModal = false;

  openCostModal() {
    this.showCostModal = true;
  }

  closeCostModal() {
    this.showCostModal = false;
  }
 onCalculateCut(material: Material) {
  if (!material) return;
  this.project.calculateCutting(material);
  this.projectCost = this.project.calculateProjectCost();
  this.showCostModal = true;
}


}
