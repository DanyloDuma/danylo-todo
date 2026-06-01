import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;
  activeTarget = '#home'; // Controla qual o link ativo

  // Substitui o "window.addEventListener('scroll')" do JS puro
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
  }

  // Substitui o "window.addEventListener('resize')"
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 992 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Fecha o menu se clicares na tecla Escape
  @HostListener('document:keydown.escape', [])
  onEscape() {
    this.closeMenu();
  }

  toggleMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.toggleBodyScroll();
  }

  setActive(target: string): void {
    this.activeTarget = target;
    this.closeMenu(); // Fecha o menu mobile ao clicar num link

    // Smooth scroll nativo
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private toggleBodyScroll(): void {
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
}
