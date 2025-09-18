import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureItem } from './picture-item';

describe('PictureItem', () => {
  let component: PictureItem;
  let fixture: ComponentFixture<PictureItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
