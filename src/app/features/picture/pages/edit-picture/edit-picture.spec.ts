import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPicture } from './edit-picture';

describe('EditPicture', () => {
  let component: EditPicture;
  let fixture: ComponentFixture<EditPicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPicture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
