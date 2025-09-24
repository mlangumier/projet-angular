import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { Router } from "@angular/router";
import { switchMap } from "rxjs";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { IPicture } from "../../models/picture.model";
import { IFormPicture, PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-editor',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatError,
    MatInput,
    MatIcon,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class Editor {
  private readonly pictureService = inject(PictureService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarUtilService);

  //TODO -> picture/pictureId/update
  // Move picture editor form to its own component & rename "editor" page to "new picture" page
  // On Picture page, display CTA "Modifier" that switches from Display to Editor

  //--- Form
  protected readonly picturePreview = signal<string | null>(null);

  protected readonly form = this.formBuilder.group({
    title: [ <string>'', [ Validators.required, Validators.minLength(2) ] ],
    description: [ <string>'', [ Validators.required ] ],
    picture: [ <File | null>null, [ Validators.required ] ]
  }, { updateOn: 'submit' });

  protected get title() {
    return this.form.get('title');
  }

  protected get description() {
    return this.form.get('description');
  }

  protected get picture() {
    return this.form.get('picture');
  }

  onPictureChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);

    if (!file) {
      this.picture?.setValue(null);
      return;
    }

    this.picture?.setValue(file);

    // Picture preview before upload
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.picturePreview.set(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  submitForm() {
    if (this.picture?.value === null) {
      this.picture?.setErrors({ missing: true });
    }

    if (!this.form.valid) {
      this.snackbar.open("Veuillez remplir tous les champs requis");
      return;
    }

    const pictureData: IFormPicture = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      image: null
    }

    this.pictureService.uploadFile(this.form.value.picture!).pipe(switchMap((response) => {
      pictureData.image = response.filename;
      return this.pictureService.createPicture(pictureData);
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
