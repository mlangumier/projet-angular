import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { SnackbarUtilService } from "../../../../shared/utils/snackbar-util.service";
import { AuthService } from '../../services/auth-service';
import { IRegister } from '../../auth.model';
import { passwordMatchValidator } from '../../../../shared/directives/password-match.directive';

@Component({
  selector: 'app-register',
  imports: [
    MatFormField,
    MatLabel,
    RouterLink,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private subscription!: Subscription;
  private readonly snackBar = inject(SnackbarUtilService);

  protected readonly form = this.formBuilder.group({
    displayName: [ '', [ Validators.required, Validators.minLength(2) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(4) ] ],
    passwordConfirmation: [ '', Validators.required ],
  }, { validators: passwordMatchValidator, updateOn: "blur" })

  ngOnInit() {
    this.subscription = this.form.controls.email.valueChanges.pipe(
        debounceTime(400), // Waits for 0.4s after last keypress to trigger the method call
        distinctUntilChanged(), // Cancels the method call if the value hasn't changed
    ).subscribe(value => {
      if (!this.form.controls.email.valid || !value) {
        return;
      }

      this.authService.checkIsEmailAvailable(value).subscribe({
        next: (emailIsAvailable: boolean) => {
          if (!emailIsAvailable) {
            this.form.controls.email.setErrors({ emailAlreadyInUse: true })
          } else {
            this.form.controls.email.setErrors(null)
          }
        },
        error: value => {
          console.error(`Error: ${ value }`);
        }
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (!this.form.valid) {
      this.snackBar.open("Veuillez remplir tous les champs requis.");
      return;
    }

    const user: IRegister = {
      email: this.form.value.email!,
      displayName: this.form.value.displayName!,
      password: this.form.value.password!
    }

    this.authService.register(user).subscribe({
      next: (response) => {
        this.snackBar.open("Inscription réussie ! Vous allez être redirigé vers la page d'accueil.")
        setTimeout(() => {
          this.router.navigate([ '/' ])
        }, 5000)
      },
      error: (error) => {
        this.snackBar.open("Une erreur est survenue. Veuillez réessayer.");
        console.error(error);
      }
    })
  }
}
