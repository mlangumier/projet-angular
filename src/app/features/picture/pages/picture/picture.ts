import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, inject, input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter, MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CommentService } from "../../services/comment.service";
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-picture',
  imports: [
    MatProgressSpinner,
    NgOptimizedImage,
    DatePipe,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,
    MatCardHeader
  ],
  templateUrl: './picture.html',
  styleUrl: './picture.scss'
})
export class Picture {
  protected readonly pictureId = input.required<number>();
  private readonly pictureService = inject(PictureService);
  private readonly commentService = inject(CommentService);

  protected readonly pictureResponse = this.pictureService.getPicture(this.pictureId);
  protected readonly commentsResponse = this.commentService.getPictureComments(this.pictureId);
}
