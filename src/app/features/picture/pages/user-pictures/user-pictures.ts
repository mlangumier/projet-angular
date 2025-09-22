import { Component, inject, input, signal } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { PictureList } from "../../components/picture-list/picture-list";
import { ISearchParams, PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-user-pictures',
  imports: [
    MatProgressSpinner,
    PictureList
  ],
  templateUrl: './user-pictures.html',
  styleUrl: './user-pictures.scss'
})
export class UserPictures {
  protected readonly userId = input.required<number>();
  private readonly pictureService = inject(PictureService);
  private readonly params = signal<ISearchParams>({});
  private readonly route = inject(ActivatedRoute);

  protected readonly authorName = this.route.snapshot.queryParamMap.get("author"); //TODO: Switch this to UserService.getUser(userId);
  protected readonly paginatedPictures = this.pictureService.getPicturesFromUser(this.userId, this.params);

  handlePaginationEvent(event: PageEvent) {
    const newParams: ISearchParams = { pageNumber: event.pageIndex, pageSize: event.pageSize };
    this.params.update(p => ({ ...p, ...newParams }));
  }
}
