import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PictureList } from "../../components/picture-list/picture-list";
import { PictureService } from '../../picture.service';

@Component({
  selector: 'app-home',
  imports: [ MatProgressSpinner, PictureList ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly pictureService = inject(PictureService);
  protected readonly paginatedPictures = this.pictureService.getAllPictures();
}
