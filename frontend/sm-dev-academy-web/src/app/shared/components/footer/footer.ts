import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { footerItems } from '../../../core/navigation/footer-items';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() isCollapsed = false;
  
  footerItems = footerItems;
}
