import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationHistoryService } from '../../../core/services/navigation-history-service/navigation-history.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  constructor(
    private readonly router: Router,
    private readonly navigationHistoryService: NavigationHistoryService,
  ) {}

  goBack(): void {
    const previousUrl = this.navigationHistoryService.getPreviousUrl();
    this.router.navigateByUrl(previousUrl || '/');
  }
}
