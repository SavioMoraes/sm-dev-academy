import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mysql } from './mysql';

describe('Mysql', () => {
  let component: Mysql;
  let fixture: ComponentFixture<Mysql>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mysql],
    }).compileComponents();

    fixture = TestBed.createComponent(Mysql);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
