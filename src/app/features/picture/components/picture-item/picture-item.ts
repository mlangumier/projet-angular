import { DatePipe } from "@angular/common";
import { Component, computed, inject, input, output } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage, MatCardTitle
} from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth-service";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { IPicture } from "../../models/picture.model";

@Component({
  selector: 'app-picture-item',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './picture-item.html',
  styleUrl: './picture-item.scss'
})
export class PictureItem {
  readonly picture = input.required<IPicture>();
  private readonly authService = inject(AuthService);
  private readonly snackbar = inject(SnackbarUtilService);
  readonly layoutClass = input<"horizontal" | "vertical">("vertical");
  readonly like = output<number>();

  protected readonly isAlreadyLiked = computed<boolean>(() => {
    const user = this.authService.currentUser();
    return !!user && this.picture().likes.some(u => u.id === user.id);
  })


  handleLike() {
    if (!this.authService.isAuthenticated()) {
      this.snackbar.open("Erreur: vous devez être connecté pour aimer une image");
      return;
    }

    this.like.emit(this.picture().id);
  }
}
