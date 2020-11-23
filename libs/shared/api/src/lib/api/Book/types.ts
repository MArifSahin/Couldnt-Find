export interface BookDetailResponse {
  editorScore: number;
  userScore: number;
  moods: number[];
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

export interface BooksOfYourMoodInfoResponse {
  bookId: string;
  bookName: string;
  editorScore: number;
  userScore: number;
}
