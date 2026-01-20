import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materials-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials-sidebar.component.html',
  styleUrl: './materials-sidebar.component.scss'
})
export class MaterialsSidebarComponent {
@Output() openCost = new EventEmitter<void>();
}
