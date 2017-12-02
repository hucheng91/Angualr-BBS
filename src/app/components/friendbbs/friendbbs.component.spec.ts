import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendbbsComponent } from './friendbbs.component';

describe('FriendbbsComponent', () => {
  let component: FriendbbsComponent;
  let fixture: ComponentFixture<FriendbbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendbbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendbbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
