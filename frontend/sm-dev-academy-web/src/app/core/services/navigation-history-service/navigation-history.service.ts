import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private previousUrl = '/';
  private currentUrl = '/';

  update(url: string): void {
    this.previousUrl = this.currentUrl;

    this.currentUrl = url;
  }

  getPreviousUrl(): string {
    return this.previousUrl;
  }
}
