import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { PictureService } from "../../picture.service";

@Component({
  selector: 'app-picture',
  imports: [
    MatProgressSpinner,
    NgOptimizedImage,
    DatePipe,
    MatIcon
  ],
  templateUrl: './picture.html',
  styleUrl: './picture.scss'
})
export class Picture {
  private readonly pictureService = inject(PictureService);
  protected readonly pictureId = input.required<string>();

  protected readonly pictureResponse = this.pictureService.getPicture(this.pictureId);
  //TODO: fetch comments
}
