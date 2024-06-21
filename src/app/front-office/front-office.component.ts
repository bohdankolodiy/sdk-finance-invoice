import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-front-office',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './front-office.component.html',
  styleUrl: './front-office.component.scss',
})
export class FrontOfficeComponent {}
