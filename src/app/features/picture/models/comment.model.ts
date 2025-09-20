export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    displayName: string;
  }
}