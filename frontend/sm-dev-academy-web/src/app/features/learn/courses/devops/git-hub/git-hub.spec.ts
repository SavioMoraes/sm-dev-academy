import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHub } from './git-hub';

describe('GitHub', () => {
  let component: GitHub;
  let fixture: ComponentFixture<GitHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitHub],
    }).compileComponents();

    fixture = TestBed.createComponent(GitHub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
