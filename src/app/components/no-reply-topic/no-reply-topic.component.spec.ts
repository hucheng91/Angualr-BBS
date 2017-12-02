import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReplyTopicComponent } from './no-reply-topic.component';

describe('NoReplyTopicComponent', () => {
  let component: NoReplyTopicComponent;
  let fixture: ComponentFixture<NoReplyTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoReplyTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoReplyTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
