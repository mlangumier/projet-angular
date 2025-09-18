import { Component, inject, signal } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PictureList } from "../../components/picture-list/picture-list";
import { ISearchParams, PictureService } from '../../picture.service';

@Component({
  selector: 'app-home',
  imports: [ MatProgressSpinner, PictureList, MatPaginator ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly pictureService = inject(PictureService);
  private readonly params = signal<ISearchParams>({});

  protected readonly paginatedPictures = this.pictureService.getAllPictures(this.params);

  handlePaginationEvent(event: PageEvent) {
    const newParams: ISearchParams = { pageNumber: event.pageIndex, pageSize: event.pageSize };
    this.params.update(p => ({ ...p, ...newParams }));
  }
}
