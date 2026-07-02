import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationHistoryService } from './core/services/navigation-history-service/navigation-history.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private readonly router: Router,
    private readonly navigationHistoryService: NavigationHistoryService,
  ) {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      if (event.urlAfterRedirects === '/not-found') {
        return;
      }

      this.navigationHistoryService.update(event.urlAfterRedirects);
    });
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      window.location.reload();
    }
  }
}
