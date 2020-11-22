export interface BookDetailResponse {
  editorScore: number;
  userScore: number;
  modes: number[];
  reviews: string[];
  reviewNumber: number;
}

export interface HighestRatedBookInfoResponse {
  editorScore: number;
  bookName: string;
}

export interface HighestReviewedBookInfoResponse {
  reviewNumber: number;
  bookName: string;
}

export interface LatestReviewedBookInfoResponse {
  editorScore: number;
  userScore: number;
  editorReview: string;
  editor: string;
}
