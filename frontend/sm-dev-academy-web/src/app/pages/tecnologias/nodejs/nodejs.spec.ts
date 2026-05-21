import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nodejs } from './nodejs';

describe('Nodejs', () => {
  let component: Nodejs;
  let fixture: ComponentFixture<Nodejs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nodejs],
    }).compileComponents();

    fixture = TestBed.createComponent(Nodejs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
