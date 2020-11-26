export interface BookDetailResponse {
  editorScore: number;
  userScore: number;
  moods: number[];
  reviews: string[];
  reviewNumber: number;
}

export interface DashboardBookInfoResponse {
  editorScore: number;
  userScore: number;
  editorReview: string;
  editor: string;
  bookId: string;
  reviewNumber: number;
}
