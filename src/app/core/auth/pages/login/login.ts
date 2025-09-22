import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput, MatLabel } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { AuthService } from "../../services/auth-service";
import { ICredentials, IUserAuth } from "../../auth.model";

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
private readonly snackbar = inject(SnackbarUtilService);

  protected readonly form = this.formBuilder.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(4) ] ],
  }, { updateOn: "submit" })

  submitForm() {
    if (!this.form.valid) {
      this.snackbar.open("Veuillez remplir tous les champs requis.");
      return;
    }

    const credentials: ICredentials = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.authService.login(credentials).subscribe({
      next: (response: IUserAuth) => {
        this.snackbar.open("Connexion réussie ! Vous allez être redirigé vers le contenu du site.", undefined, 3000);
        setTimeout(() => {
          this.router.navigate([ '/' ])
        }, 3000)
      },
      error: (error) => {
        this.snackbar.open("Une erreur est survenue. Veuillez réessayer.");
        console.error(error);
      }
    })
  }
}
