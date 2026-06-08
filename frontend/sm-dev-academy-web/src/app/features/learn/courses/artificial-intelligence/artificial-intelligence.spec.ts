import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtificialIntelligence } from './artificial-intelligence';

describe('ArtificialIntelligence', () => {
  let component: ArtificialIntelligence;
  let fixture: ComponentFixture<ArtificialIntelligence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtificialIntelligence],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtificialIntelligence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
