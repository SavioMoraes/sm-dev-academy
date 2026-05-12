import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../shared/components/header/header';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
