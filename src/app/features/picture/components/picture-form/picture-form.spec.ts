import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureForm } from './picture-form';

describe('PictureForm', () => {
  let component: PictureForm;
  let fixture: ComponentFixture<PictureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
