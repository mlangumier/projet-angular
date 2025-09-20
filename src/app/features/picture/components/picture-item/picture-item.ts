import { DatePipe } from "@angular/common";
import { Component, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage, MatCardTitle
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { IPicture } from "../../models/picture.model";

@Component({
  selector: 'app-picture-item',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
    RouterLink,
  ],
  templateUrl: './picture-item.html',
  styleUrl: './picture-item.scss'
})
export class PictureItem {
  readonly picture = input.required<IPicture>();
}
