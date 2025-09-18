import { httpResource } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { IPaginatedPictures, IPicture } from "./picture.model";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  getAllPictures() {
    return httpResource<IPaginatedPictures>(() => ({
      url: "/picture",
      method: "GET"
    }), { parse: (value: any) => this.adaptPaginatedResults(value) })
  }

  private adaptPaginatedResults(res: any): IPaginatedPictures {
    return {
      totalElements: res.totalElements,
      totalPages: res.totalPages,
      size: res.page,
      content: res.content.map((picture: any) => this.adaptPictureResponse(picture)),
      number: res.number,
      numberOfElements: res.numberOfElements,
      first: res.first,
      last: res.last,
      empty: res.empty
    };
  }

  private adaptPictureResponse(res: any): IPicture {
    return {
      id: res.id,
      image: res.image,
      description: res.description,
      title: res.title,
      createdAt: new Date(res.createdAt),
      author: {
        id: res.author.id,
        displayName: res.author.displayName
      },
      likes: res.likes.length,
      imageLink: res.imageLink,
      thumbnailLink: res.thumbnailLink
    };
  }
}
