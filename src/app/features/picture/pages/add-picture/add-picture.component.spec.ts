import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPicture } from './add-picture.component';

describe('Editor', () => {
  let component: AddPicture;
  let fixture: ComponentFixture<AddPicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPicture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
