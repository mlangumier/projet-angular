import { Component, input } from '@angular/core';
import { IComment } from "../../models/comment.model";
import { CommentItem } from "../comment-item/comment-item";

@Component({
  selector: 'app-comment-list',
  imports: [
    CommentItem
  ],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss'
})
export class CommentList {
  readonly commentsList = input.required<IComment[]>();
}
