import { httpResource } from "@angular/common/http";
import { Injectable, Signal } from '@angular/core';
import { IPaginatedPictures, IPicture } from "../models/picture.model";

export interface ISearchParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  getAllPictures(paramSignal: Signal<ISearchParams>) {
    return httpResource<IPaginatedPictures>(() => ({
      url: "/picture",
      method: "GET",
      params: { ...paramSignal() }
    }), { parse: (response: any) => this.adaptPaginatedResults(response) })
  }

  getPicture(id: Signal<number>) {
    return httpResource<IPicture>(() => ({
      url: `/picture/${ id() }`,
      method: "GET"
    }), { parse: (response: any) => this.adaptPictureResponse(response) })
  }

  private adaptPaginatedResults(res: any): IPaginatedPictures {
    return {
      totalElements: res.totalElements,
      totalPages: res.totalPages,
      pageSize: res.size,
      content: res.content.map((picture: any) => this.adaptPictureResponse(picture)),
      pageNumber: res.number,
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
