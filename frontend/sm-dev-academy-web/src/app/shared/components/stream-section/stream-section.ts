import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stream-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stream-section.html',
  styleUrl: './stream-section.scss',
})
export class StreamSection {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}