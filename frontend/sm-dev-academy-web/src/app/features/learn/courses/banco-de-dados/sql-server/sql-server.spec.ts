import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlServer } from './sql-server';

describe('SqlServer', () => {
  let component: SqlServer;
  let fixture: ComponentFixture<SqlServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlServer],
    }).compileComponents();

    fixture = TestBed.createComponent(SqlServer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
