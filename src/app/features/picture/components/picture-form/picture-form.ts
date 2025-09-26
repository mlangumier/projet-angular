import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput, MatLabel } from "@angular/material/input";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { IPicture, IPictureForm } from "../../models/picture.model";

@Component({
  selector: 'app-picture-form',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './picture-form.html',
  styleUrl: './picture-form.scss'
})
export class PictureForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackbar = inject(SnackbarUtilService);
  protected readonly picturePreview = signal<string | null>(null);
  protected readonly submitForm = output<IPictureForm>();
  readonly defaultValues = input<IPicture | null>(null);

  protected readonly form = this.formBuilder.group({
    title: [ <string>'', [ Validators.required, Validators.minLength(2) ] ],
    description: [ <string>'', [ Validators.required ] ],
    imageFile: [ <File | null>null, [ Validators.required ] ]
  }, { updateOn: 'submit' });

  constructor() {
    effect(() => {
      if (this.defaultValues() === null) return;

      this.form.setValue({
        title: this.defaultValues()!.title,
        description: this.defaultValues()!.description,
        imageFile: null
      })
      this.picturePreview.set(this.defaultValues()!.imageLink)
    });
  }

  protected get title() {
    return this.form.get('title');
  }

  protected get description() {
    return this.form.get('description');
  }

  protected get imageFile() {
    return this.form.get('imageFile');
  }

  onPictureChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);

    if (!file) {
      this.imageFile?.setValue(null);
      return;
    }

    this.imageFile?.setValue(file);

    // Picture preview before upload
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.picturePreview.set(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    if (this.imageFile?.value === null) {
      this.imageFile?.setErrors({ missing: true });
    }

    if (!this.form.valid) {
      this.snackbar.open("Veuillez remplir tous les champs requis");
      return;
    }

    const pictureData: IPictureForm = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      image: this.form.value.imageFile!,
    }

    this.submitForm.emit(pictureData);
  }
}
