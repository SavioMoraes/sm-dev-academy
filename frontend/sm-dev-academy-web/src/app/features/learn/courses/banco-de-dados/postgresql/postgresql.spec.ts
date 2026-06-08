import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postgresql } from './postgresql';

describe('Postgresql', () => {
  let component: Postgresql;
  let fixture: ComponentFixture<Postgresql>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postgresql],
    }).compileComponents();

    fixture = TestBed.createComponent(Postgresql);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
