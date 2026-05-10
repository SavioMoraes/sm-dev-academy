import { Component } from '@angular/core';
import { MainLayout } from './layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayout],
  template: `
    <app-main-layout />
  `,
  styleUrl: './app.scss',
})
export class App {}