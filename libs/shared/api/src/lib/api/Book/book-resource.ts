import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BookDetailResponse } from './types';


export class BookResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {
  }

  writeUserReview = (data: any): Promise<any> => this.axios.post('book/write-user-review', data, this.axiosRequestConfig).then((r) => r.data);
  writeEditorReview = (data: any): Promise<any> => this.axios.post('book/write-editor-review', data, this.axiosRequestConfig).then((r) => r.data);
  getBookContent = (bookId: any): Promise<BookDetailResponse> => this.axios.get('book/?bookId='+encodeURIComponent(bookId)).then((r) => r.data);
  getLatestReviews = (): Promise<any> => this.axios.get('book/last-reviews', this.axiosRequestConfig).then((r) => r.data);
  getHighestRatedBooks = (): Promise<any> => this.axios.get('book/highest-rated', this.axiosRequestConfig).then((r) => r.data);
  getHighestReviewedBooks = (): Promise<any> => this.axios.get('book/highest-reviewed', this.axiosRequestConfig).then((r) => r.data);
  getBooksOfYourMood = (data: any): Promise<any> => this.axios.post('book/find-book-of-mood', data, this.axiosRequestConfig).then((r) => r.data);


}
