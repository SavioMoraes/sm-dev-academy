import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiCd } from './ci-cd';

describe('CiCd', () => {
  let component: CiCd;
  let fixture: ComponentFixture<CiCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiCd],
    }).compileComponents();

    fixture = TestBed.createComponent(CiCd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
