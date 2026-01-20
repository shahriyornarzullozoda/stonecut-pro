import { Component } from '@angular/core';
import { CanvasComponent } from '../../components/canvas/canvas.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from '../../components/right-sidebar/right-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, LeftSidebarComponent, RightSidebarComponent, RouterOutlet, CommonModule ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
}
