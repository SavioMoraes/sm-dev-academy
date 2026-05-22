import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCourseCard } from './highlight-course-card';

describe('HighlightCourseCard', () => {
  let component: HighlightCourseCard;
  let fixture: ComponentFixture<HighlightCourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightCourseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightCourseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
