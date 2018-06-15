import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmigoComponent } from './add-amigo.component';

describe('AddAmigoComponent', () => {
  let component: AddAmigoComponent;
  let fixture: ComponentFixture<AddAmigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
