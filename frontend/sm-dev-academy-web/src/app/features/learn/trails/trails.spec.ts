import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trails } from './trails';

describe('Trails', () => {
  let component: Trails;
  let fixture: ComponentFixture<Trails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trails],
    }).compileComponents();

    fixture = TestBed.createComponent(Trails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
