import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGpt } from './chat-gpt';

describe('ChatGpt', () => {
  let component: ChatGpt;
  let fixture: ComponentFixture<ChatGpt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatGpt],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatGpt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
