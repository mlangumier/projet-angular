import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    RouterLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  //TODO: get user authService.isLoggedIn() & display corresponding CTA

  logout() {
    // TODO: authService.logout()
  }
}
