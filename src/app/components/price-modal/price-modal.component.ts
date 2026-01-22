import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CostDistribution, ProjectCost, ProjectMetrics } from '../interface/ProjectCost';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-modal.component.html',
  styleUrl: './price-modal.component.scss'
})
export class PriceModalComponent {
  @Input() cost?: ProjectCost;
  @Output() close = new EventEmitter<void>();
  @Input() metrics?: ProjectMetrics;
@Input() distribution?: CostDistribution;

  onClose() {
    this.close.emit();
  }

  get totalCost(): number {
    if (!this.cost) return 0;
    const base = this.cost.material + this.cost.cutting + this.cost.edge + this.cost.waste + this.cost.labor;
    return base + (base * (this.cost.markupPercent / 100));
  }

}
