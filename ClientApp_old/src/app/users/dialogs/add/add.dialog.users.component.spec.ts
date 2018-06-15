import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add.Dialog.Users.ComponentComponent } from './add.dialog.users.component.component';

describe('Add.Dialog.Users.ComponentComponent', () => {
  let component: Add.Dialog.Users.ComponentComponent;
  let fixture: ComponentFixture<Add.Dialog.Users.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add.Dialog.Users.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add.Dialog.Users.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
