import { IPagination } from "../../../shared/common.model";
import { IUser } from "./user.model";

export interface IPicture {
  id: number;
  title: string;
  description: string;
  image: string;
  imageLink: string;
  thumbnailLink: string;
  createdAt: Date;
  likes: IUser[];
  author: IUser
}

export interface IPaginatedPictures extends IPagination {
  content: IPicture[];
}
