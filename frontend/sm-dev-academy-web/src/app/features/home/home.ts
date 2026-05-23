import { Component } from '@angular/core';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { HomeHero } from '../../shared/components/home-hero/home-hero';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { HighlightCourseCard } from '../../shared/components/highlight-course-card/highlight-course-card';
import { StreamSection } from '../../shared/components/stream-section/stream-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageContainer,
    HomeHero,
    CategoryCard,
    HighlightCourseCard,
    StreamSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}