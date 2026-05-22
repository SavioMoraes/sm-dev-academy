import { Component } from '@angular/core';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { PageHero } from '../../shared/components/page-hero/page-hero';

@Component({
  selector: 'app-home',
  imports: [
    PageContainer,
    PageHero,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
