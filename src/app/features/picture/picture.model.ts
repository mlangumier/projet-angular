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

export interface IPaginatedPictures {
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  content: IPicture[];
}
