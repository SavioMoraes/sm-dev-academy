import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepSeek } from './deep-seek';

describe('DeepSeek', () => {
  let component: DeepSeek;
  let fixture: ComponentFixture<DeepSeek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepSeek],
    }).compileComponents();

    fixture = TestBed.createComponent(DeepSeek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
