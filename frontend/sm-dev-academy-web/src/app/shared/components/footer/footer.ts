import { Component } from '@angular/core';
import { footerItems } from '../../../core/navigation/footer-items';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  footerItems = footerItems;
}
