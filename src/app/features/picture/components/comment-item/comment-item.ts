import { DatePipe } from "@angular/common";
import { Component, input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle
} from "@angular/material/card";
import { IComment } from "../../models/comment.model";

@Component({
  selector: 'app-comment-item',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle
  ],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss'
})
export class CommentItem {
  readonly comment = input.required<IComment>();
}
