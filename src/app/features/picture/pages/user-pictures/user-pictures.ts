import { Component, computed, inject, input, signal } from '@angular/core';
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { PageEvent } from "@angular/material/paginator";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth-service";
import { PictureList } from "../../components/picture-list/picture-list";
import { IPaginatedPictures, IPicture } from "../../models/picture.model";
import { ISearchParams, PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-user-pictures',
  imports: [
    MatProgressSpinner,
    PictureList,
    MatFabButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './user-pictures.html',
  styleUrl: './user-pictures.scss'
})
export class UserPictures {
  protected readonly userId = input.required<number>();
  private readonly pictureService = inject(PictureService);
  private readonly params = signal<ISearchParams>({});
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  protected isCurrentUser = computed<boolean>(() => {
    const loggedInUser = this.authService.currentUser();
    if (!loggedInUser) return false;
    return this.userId() == loggedInUser.id; // Double-equal: value only because of query-param (string)
  });
  protected readonly authorName = this.route.snapshot.queryParamMap.get("author"); //TODO: Switch this to UserService.getUser(userId);
  protected readonly paginatedPictures = this.pictureService.getPicturesFromUser(this.userId, this.params);

  handlePaginationEvent(event: PageEvent) {
    const newParams: ISearchParams = { pageNumber: event.pageIndex, pageSize: event.pageSize };
    this.params.update(p => ({ ...p, ...newParams }));
  }

  toggleLikePicture(id: number) {
    this.pictureService.likePicture(id).subscribe((response: IPicture) => {
      const pictures = this.paginatedPictures.value()?.content.map(p => p.id === response.id ? response : p) || [];
      this.paginatedPictures.update(prev => ({
        ...prev,
        content: pictures
      }) as IPaginatedPictures);
    });
  }
}
