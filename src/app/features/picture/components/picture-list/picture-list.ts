import { Component, input } from '@angular/core';
import { IPicture } from "../../models/picture.model";
import { PictureItem } from "../picture-item/picture-item";

@Component({
  selector: 'app-picture-list',
  imports: [ PictureItem ],
  templateUrl: './picture-list.html',
  styleUrl: './picture-list.scss'
})
export class PictureList {
  readonly pictureList = input.required<IPicture[]>();
}
