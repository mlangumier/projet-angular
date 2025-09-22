import { IPagination } from "../../../shared/common.model";

export interface IPicture {
  id: number;
  title: string;
  description: string;
  image: string;
  imageLink: string;
  thumbnailLink: string;
  createdAt: Date;
  likes: number;
  author: {
    id: number;
    displayName: string;
  };
}

export interface IPaginatedPictures extends IPagination {
  content: IPicture[];
}
