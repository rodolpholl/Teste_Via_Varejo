import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogUsersComponent } from './edit-dialog-users.component';

describe('EditDialogUsersComponent', () => {
  let component: EditDialogUsersComponent;
  let fixture: ComponentFixture<EditDialogUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
