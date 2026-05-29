import { Component } from '@angular/core';

@Component({
  selector: 'app-if-render',
  standalone: false,
  templateUrl: './if-render.component.html',
  styleUrl: './if-render.component.css',
})
export class IfRenderComponent {
  canShow: boolean = true;
  name: String = 'Matheus';
}
