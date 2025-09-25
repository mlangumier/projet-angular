import { IPagination } from "../../../shared/common.model";
import { IUser } from "./user.model";

export interface IPictureBase {
  title: string;
  description: string;
  image: string;
}

export interface IPicture extends IPictureBase {
  id: number;
  imageLink: string;
  thumbnailLink: string;
  createdAt: Date;
  likes: IUser[];
  author: IUser
}

export interface IPaginatedPictures extends IPagination {
  content: IPicture[];
}

export interface IPictureForm {
  title: string;
  description: string;
  image: File;
}