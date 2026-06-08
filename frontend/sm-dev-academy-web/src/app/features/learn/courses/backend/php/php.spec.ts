import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Php } from './php';

describe('Php', () => {
  let component: Php;
  let fixture: ComponentFixture<Php>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Php],
    }).compileComponents();

    fixture = TestBed.createComponent(Php);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
