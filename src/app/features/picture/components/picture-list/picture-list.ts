import { Component, input, output } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { IPagination } from "../../../../shared/common.model";
import { IPicture } from "../../models/picture.model";
import { PictureItem } from "../picture-item/picture-item";

@Component({
  selector: 'app-picture-list',
  imports: [ PictureItem, MatPaginator ],
  templateUrl: './picture-list.html',
  styleUrl: './picture-list.scss'
})
export class PictureList {
  readonly pictureList = input.required<IPicture[]>();
  readonly pagination = input.required<IPagination>();
  readonly handlePagination = output<PageEvent>();

  emitPaginationEvent(event: PageEvent) {
    this.handlePagination.emit(event)
  }
}
