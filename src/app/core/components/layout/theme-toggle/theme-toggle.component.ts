import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme/theme.service';
import { FinButtonComponent } from '../../../../shared/components/generics/button/fin-button.component';

@Component({
  selector: 'fin-theme-toggle',
  standalone: true,
  imports: [CommonModule, FinButtonComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  public readonly themeService = inject(ThemeService);
  public readonly isAnimating = signal(false);

  public async toggleTheme(event: MouseEvent): Promise<void> {
    if (this.isAnimating()) return;

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    this.isAnimating.set(true);

    try {
      await this.animateThemeTransition(x, y);
    } finally {
      this.isAnimating.set(false);
    }
  }

  private async animateThemeTransition(x: number, y: number): Promise<void> {
    const isDark = this.themeService.isDarkMode;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.themeService.toggleTheme();
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: ${isDark ? 'rgba(249, 250, 251, 0.9)' : 'rgba(17, 24, 39, 0.9)'};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
      z-index: 9999;
    `;

    document.body.appendChild(overlay);
    overlay.offsetHeight;
    overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;

    setTimeout(() => {
      this.themeService.toggleTheme();
    }, 300);

    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 600);
  }
}
