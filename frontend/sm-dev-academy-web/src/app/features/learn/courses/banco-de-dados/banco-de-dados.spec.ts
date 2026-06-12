import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoDeDados } from './banco-de-dados';

describe('BancoDeDados', () => {
  let component: BancoDeDados;
  let fixture: ComponentFixture<BancoDeDados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoDeDados],
    }).compileComponents();

    fixture = TestBed.createComponent(BancoDeDados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
