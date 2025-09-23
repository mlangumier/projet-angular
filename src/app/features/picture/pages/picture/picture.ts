import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, computed, inject, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth-service";
import { CommentList } from "../../components/comment-list/comment-list";
import { IPicture } from "../../models/picture.model";
import { CommentService } from "../../services/comment.service";
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-picture',
  imports: [
    MatProgressSpinner,
    NgOptimizedImage,
    DatePipe,
    MatIcon,
    CommentList,
    RouterLink,
    MatButton
  ],
  templateUrl: './picture.html',
  styleUrl: './picture.scss'
})
export class Picture {
  protected readonly pictureId = input.required<number>();
  private readonly pictureService = inject(PictureService);
  private readonly commentService = inject(CommentService);
  private readonly authService = inject(AuthService);

  protected readonly pictureResponse = this.pictureService.getPicture(this.pictureId);
  protected readonly commentsResponse = this.commentService.getPictureComments(this.pictureId);

  protected readonly isAlreadyLiked = computed<boolean>(() => {
    const user = this.authService.currentUser();
    return !!user && this.pictureResponse.hasValue() && this.pictureResponse.value().likes.some(u => u.id === user.id);
  })

  toggleLikePicture() {
    this.pictureService.likePicture(this.pictureId()).subscribe((response: IPicture) => {
      this.pictureResponse.update(prev => ({ ...prev, likes: response.likes }) as IPicture);
    })
  }
}
