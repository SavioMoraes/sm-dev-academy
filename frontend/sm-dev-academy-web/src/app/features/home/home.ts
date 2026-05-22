import { Component } from '@angular/core';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { HomeHero } from '../../shared/components/home-hero/home-hero';
import { CategoryCard } from '../../shared/components/category-card/category-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageContainer,
    HomeHero,
    CategoryCard,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}