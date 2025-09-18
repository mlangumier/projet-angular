import { DatePipe } from "@angular/common";
import { Component, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardTitle
} from "@angular/material/card";
import { IPicture } from "../../picture.model";

@Component({
  selector: 'app-picture-item',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
  ],
  templateUrl: './picture-item.html',
  styleUrl: './picture-item.scss'
})
export class PictureItem {
  readonly picture = input.required<IPicture>();
}
