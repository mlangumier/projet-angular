import { httpResource } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { IComment } from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  getPictureComments(id: Signal<number | undefined>) {
    return httpResource<IComment[]>(() => ({
      url: `/picture/${ id() }/comment`,
      method: "GET"
    }), { parse: (response: any) => this.adaptCommentListResponse(response) })
  }

  private adaptCommentListResponse(rawList: any[]): IComment[] {
    return rawList.map((rawComment: any) => this.adaptCommentResponse(rawComment));
  }

  private adaptCommentResponse(rawComment: any): IComment {
    return {
      id: rawComment.id,
      content: rawComment.content,
      createdAt: new Date(rawComment.createdAt),
      author: {
        id: rawComment.author.id,
        displayName: rawComment.author.displayName
      }
    }
  }
}