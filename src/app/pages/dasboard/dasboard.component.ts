import { Component } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css'
})
export class DasboardComponent {
  totalEmployees = 150;
  totalDepartments = 10;
  totalProjects = 25;
}
