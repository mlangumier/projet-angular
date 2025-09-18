import { Component, effect, inject, model, signal } from '@angular/core';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from "rxjs";
import { PictureList } from "../../components/picture-list/picture-list";
import { ISearchParams, PictureService } from '../../picture.service';

@Component({
  selector: 'app-home',
  imports: [ MatProgressSpinner, PictureList, MatPaginator, MatInput, MatFormField, MatLabel ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly pictureService = inject(PictureService);
  private readonly params = signal<ISearchParams>({});
  protected readonly search = model<string>('');
  protected readonly debouncedSearch = toSignal(
      toObservable(this.search).pipe(debounceTime(400), distinctUntilChanged()),
      { initialValue: '' }
  )

  protected readonly paginatedPictures = this.pictureService.getAllPictures(this.params);

  constructor() {
    effect(() => {
      const newSearch = this.debouncedSearch().trim();
      this.params.update(p => ({ ...p, search: newSearch ?? undefined }));
    });
  }

  handlePaginationEvent(event: PageEvent) {
    const newParams: ISearchParams = { pageNumber: event.pageIndex, pageSize: event.pageSize };
    this.params.update(p => ({ ...p, ...newParams }));
  }
}
