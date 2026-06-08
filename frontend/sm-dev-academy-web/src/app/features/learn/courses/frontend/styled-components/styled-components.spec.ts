import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledComponents } from './styled-components';

describe('StyledComponents', () => {
  let component: StyledComponents;
  let fixture: ComponentFixture<StyledComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyledComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(StyledComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
