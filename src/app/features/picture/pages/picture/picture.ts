import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, computed, inject, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth-service";
import { DialogComponent } from "../../../../shared/components/dialog-component/dialog.component";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
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
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(SnackbarUtilService);

  protected readonly pictureResponse = this.pictureService.getPicture(this.pictureId);
  protected readonly commentsResponse = this.commentService.getPictureComments(this.pictureId);

  protected readonly currentUser = this.authService.currentUser;

  protected readonly isOwner = computed(() => {
    return !!this.currentUser() && this.currentUser()?.id === this.pictureResponse.value()?.author?.id;
  })

  protected readonly isAlreadyLiked = computed<boolean>(() => {
    return !!this.currentUser() && this.pictureResponse.hasValue() && this.pictureResponse.value().likes.some(u => u.id === this.currentUser()?.id);
  })

  onDeletePictureClick() {
    this.dialog.open(DialogComponent, {
      enterAnimationDuration: '150ms',
      data: {
        title: "Confirmez la suppression de l'image",
        content: [
          `Vous êtes sur le point de supprimer l'image "${ this.pictureResponse.value()?.title }". Cette action est irréversible.`,
          `Êtes-vous sûr de vouloir continuer ?`
        ],
        action: {
          text: "Supprimer l'image",
          handleAction: () => this.handleDeletePicture()
        }
      }
    });
  }

  toggleLikePicture() {
    this.pictureService.likePicture(this.pictureId()).subscribe((response: IPicture) => {
      this.pictureResponse.update(prev => ({ ...prev, likes: response.likes }) as IPicture);
    })
  }

  handleDeletePicture() {
    this.pictureService.deletePicture(this.pictureId()).subscribe({
      next: () => {
        this.snackbar.open("Image supprimée.");
        setTimeout(() => {
          this.router.navigate(['/user', this.currentUser()?.id, 'picture'])
        }, 1000)
      },
      error: (error) => {
        this.snackbar.open("Une erreur est survenue lors de la suppression de l'image.");
        console.error(error);
      }
    });
  }
}
