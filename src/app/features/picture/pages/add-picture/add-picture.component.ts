import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize, switchMap } from "rxjs";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { PictureForm } from "../../components/picture-form/picture-form";
import { IPicture, IPictureBase, IPictureForm } from "../../models/picture.model";
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-editor',
  imports: [ ReactiveFormsModule, PictureForm, ],
  templateUrl: './add-picture.component.html',
  styleUrl: './add-picture.component.scss'
})
export class AddPicture {
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarUtilService);

  onCreatePicture(formData: IPictureForm) {
    this.pictureService.uploadFile(formData.image).pipe(switchMap((response) => {
      // Create a new object with the response.filename to create the entity with the uploaded picture
      const payload: IPictureBase = {
        title: formData.title,
        description: formData.description,
        image: response.filename
      };
      return this.pictureService.createPicture(payload);
    })).subscribe({
      next: (response: IPicture) => {
        this.snackbar.open("Image publiée ! Redirection en cours...", '', 2000);
        setTimeout(() => {
          this.router.navigate([ '/picture', response.id ]);
        }, 2500)
      },
      error: (error: any) => {
        this.snackbar.open("Une erreur est survenue lors de la publication de l'image. Veuillez réessayer.");
        console.error(error);
      }
    })
  }
}
