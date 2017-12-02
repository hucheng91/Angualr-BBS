import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStarComponent } from './top-star.component';

describe('TopStarComponent', () => {
  let component: TopStarComponent;
  let fixture: ComponentFixture<TopStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
