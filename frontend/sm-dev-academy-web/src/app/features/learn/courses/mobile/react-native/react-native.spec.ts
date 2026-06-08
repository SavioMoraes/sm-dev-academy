import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactNative } from './react-native';

describe('ReactNative', () => {
  let component: ReactNative;
  let fixture: ComponentFixture<ReactNative>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactNative],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactNative);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
