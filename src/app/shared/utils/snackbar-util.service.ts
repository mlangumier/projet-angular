import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarUtilService {
  private readonly _snackbar = inject(MatSnackBar);
  private readonly duration = 5000;

  open(message: string, action?: string, duration?: number): void {
    this._snackbar.open(message, action ?? 'Ok', {
      duration: duration ?? this.duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
