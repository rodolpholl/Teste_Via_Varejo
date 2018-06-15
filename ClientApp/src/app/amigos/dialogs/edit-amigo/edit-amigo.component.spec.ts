import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmigoComponent } from './edit-amigo.component';

describe('EditAmigoComponent', () => {
  let component: EditAmigoComponent;
  let fixture: ComponentFixture<EditAmigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAmigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
