import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationProposalComponent } from './notification-proposal.component';

describe('NotificationProposalComponent', () => {
  let component: NotificationProposalComponent;
  let fixture: ComponentFixture<NotificationProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
