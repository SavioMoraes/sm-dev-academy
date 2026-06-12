import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scss } from './scss';

describe('Scss', () => {
  let component: Scss;
  let fixture: ComponentFixture<Scss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scss],
    }).compileComponents();

    fixture = TestBed.createComponent(Scss);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
