import { Component, inject, input } from '@angular/core';
import { Router } from "@angular/router";
import { switchMap } from "rxjs";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { PictureForm } from "../../components/picture-form/picture-form";
import { IPicture, IPictureBase, IPictureForm } from "../../models/picture.model";
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-edit-picture',
  imports: [
    PictureForm
  ],
  templateUrl: './edit-picture.html',
  styleUrl: './edit-picture.scss'
})
export class EditPicture {
  protected readonly pictureId = input.required<number>();
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarUtilService)
  private readonly pictureService = inject(PictureService);

  protected readonly pictureResponse = this.pictureService.getPicture(this.pictureId);

  onEditPicture(formData: IPictureForm) {
    let payload: IPicture = {
      ...this.pictureResponse.value() as IPicture,
      title: formData.title,
      description: formData.description,
    };

    this.pictureService.uploadFile(formData.image).pipe(switchMap((response) => {
      return this.pictureService.updatePicture(this.pictureId(), {
        ...payload,
        image: response.filename
      });
    })).subscribe({
      next: (response: IPicture) => {
        this.snackbar.open("Image modifiée ! Redirection en cours...", '', 2000);
        setTimeout(() => {
          this.router.navigate([ '/picture', response.id ]);
        }, 1000)
      },
      error: (error: any) => {
        this.snackbar.open("Une erreur est survenue lors de la modification de l'image. Veuillez réessayer.");
        console.error(error);
      }
    })

  }
}
