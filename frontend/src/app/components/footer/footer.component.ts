import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Estado para os círculos flutuantes (caso fiquem dentro do footer)
  circleScales: string[] = ['scale(1)', 'scale(1)', 'scale(1)'];

  // Ano dinâmico para o copyright
  currentYear: number = new Date().getFullYear();

  /**
   * Gerencia o efeito de hover nos círculos flutuantes de forma reativa
   */
  setCircleScale(index: number, isHovered: boolean): void {
    this.circleScales[index] = isHovered ? 'scale(1.2)' : 'scale(1)';
  }
}
