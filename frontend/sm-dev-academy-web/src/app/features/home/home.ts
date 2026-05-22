import { Component } from '@angular/core';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { HomeHero } from '../../shared/components/home-hero/home-hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageContainer,
    HomeHero,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}