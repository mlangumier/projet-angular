import { Component, computed, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { SnackbarUtilService } from "../../../shared/utils/snackbar-util.service";
import { AuthService } from "../../auth/services/auth-service";

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatToolbar,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(SnackbarUtilService);

  protected readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  protected readonly user = computed(() => this.authService.currentUser())

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([ '/' ])
        this.snackBar.open("Vous vous êtes déconnecté de l'application.")
      },
      error: (error) => console.error(error)
    })
  }
}
