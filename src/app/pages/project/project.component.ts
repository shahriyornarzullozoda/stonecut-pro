import { Component } from '@angular/core';
import { CanvasComponent } from '../../components/canvas/canvas.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
