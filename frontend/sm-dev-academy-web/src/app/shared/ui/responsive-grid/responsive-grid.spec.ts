import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveGrid } from './responsive-grid';

describe('ResponsiveGrid', () => {
  let component: ResponsiveGrid;
  let fixture: ComponentFixture<ResponsiveGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
