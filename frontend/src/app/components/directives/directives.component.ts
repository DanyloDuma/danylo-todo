import { Component } from '@angular/core';

@Component({
  selector: 'app-directives',
  standalone: false,
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.css',
})
export class DirectivesComponent {
  size = 40;
  font = 'Arial';
  color = 'red';

  classes = ['green-title', 'small-title'];
}
