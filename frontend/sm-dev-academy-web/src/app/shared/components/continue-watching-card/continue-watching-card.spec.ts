import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueWatchingCard } from './continue-watching-card';

describe('ContinueWatchingCard', () => {
  let component: ContinueWatchingCard;
  let fixture: ComponentFixture<ContinueWatchingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueWatchingCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ContinueWatchingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
