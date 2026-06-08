import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nestjs } from './nestjs';

describe('Nestjs', () => {
  let component: Nestjs;
  let fixture: ComponentFixture<Nestjs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nestjs],
    }).compileComponents();

    fixture = TestBed.createComponent(Nestjs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
