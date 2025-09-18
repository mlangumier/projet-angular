import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureList } from './picture-list';

describe('PictureList', () => {
  let component: PictureList;
  let fixture: ComponentFixture<PictureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
