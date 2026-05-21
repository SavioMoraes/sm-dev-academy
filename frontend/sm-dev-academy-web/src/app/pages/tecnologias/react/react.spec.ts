import { ComponentFixture, TestBed } from '@angular/core/testing';

import { React } from './react';

describe('React', () => {
  let component: React;
  let fixture: ComponentFixture<React>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [React],
    }).compileComponents();

    fixture = TestBed.createComponent(React);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
