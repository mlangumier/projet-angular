import { NgOptimizedImage } from "@angular/common";
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Router } from "@angular/router";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { PictureService } from "../../services/picture.service";

@Component({
  selector: 'app-editor',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatError,
    MatInput,
    NgOptimizedImage
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class Editor {
  protected readonly pictureId = input<number>();
  private readonly pictureService = inject(PictureService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarUtilService);

  //--- Form
  protected readonly picturePreview = signal<string | null>(null);

  protected readonly form = this.formBuilder.group({
    title: [ <string>'', [ Validators.required, Validators.minLength(2) ] ],
    description: [ <string>'', [ Validators.required ] ],
    // picture: [ <File | null>null, [ Validators.required ] ]
  })

  protected get title() {
    return this.form.get('title');
  }

  protected get description() {
    return this.form.get('description');
  }

  onPictureChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) return;

    // File preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log("--- FileReader: ", e.target.result);
      this.picturePreview.set(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  submitForm() {
    if (!this.form.valid) {
      this.snackbar.open("Veuillez remplir tous les champs requis");
      return;
    }

    const pictureData = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    }

    // http request here -> check IF now or in service? (do separately first, then decide)

    // 1. uploadFile(file)
    // Bonus: subscribe to http reportProgress & observe with Material progress bar

    //2. add uploadFile().response.fileName to pictureData and do createPicture(pictureData)
  }

}
