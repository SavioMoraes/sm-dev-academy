import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Docker } from './docker';

describe('Docker', () => {
  let component: Docker;
  let fixture: ComponentFixture<Docker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Docker],
    }).compileComponents();

    fixture = TestBed.createComponent(Docker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
