import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mongodb } from './mongodb';

describe('Mongodb', () => {
  let component: Mongodb;
  let fixture: ComponentFixture<Mongodb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mongodb],
    }).compileComponents();

    fixture = TestBed.createComponent(Mongodb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
