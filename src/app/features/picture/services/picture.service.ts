import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, Signal } from '@angular/core';
import { map, tap } from "rxjs";
import { IPaginatedPictures, IPicture } from "../models/picture.model";
import { IUser } from "../models/user.model";

export interface ISearchParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private readonly http = inject(HttpClient);

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

  getPicturesFromUser(id: Signal<number>, paramSignal: Signal<ISearchParams>) {
    return httpResource<IPaginatedPictures>(() => ({
      url: `/picture/user/${ id() }`,
      method: "GET",
      params: { ...paramSignal() }
    }), { parse: (response: any) => this.adaptPaginatedResults(response) })
  }

  likePicture(id: number) {
    return this.http.patch<IPicture>(`/picture/${ id }/like`, {}, { withCredentials: true }).pipe(map(response => this.adaptPictureResponse(response)));
  }

  createPicture(payload: any) {
    return this.http.post<IPicture>(`/picture`, payload, { withCredentials: true }).pipe(map(response => this.adaptPictureResponse(response)));
  }

  uploadFile(file: File) {
    return this.http.post(`/picture/upload`, file, { withCredentials: true });
  }

  private adaptPaginatedResults(res: any): IPaginatedPictures {
    return {
      totalElements: res.totalElements,
      totalPages: res.totalPages,
      pageSize: res.size,
      content: res.content.map((picture: any) => this.adaptPictureResponse(picture)) || [],
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
      likes: res.likes.map((rawUser: any): IUser => ({
        id: rawUser.id,
        displayName: rawUser.displayName
      })) || [],
      imageLink: res.imageLink,
      thumbnailLink: res.thumbnailLink
    };
  }
}
