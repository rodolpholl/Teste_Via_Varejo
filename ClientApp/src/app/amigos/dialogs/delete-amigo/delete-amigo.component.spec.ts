import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAmigoComponent } from './delete-amigo.component';

describe('DeleteAmigoComponent', () => {
  let component: DeleteAmigoComponent;
  let fixture: ComponentFixture<DeleteAmigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAmigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
