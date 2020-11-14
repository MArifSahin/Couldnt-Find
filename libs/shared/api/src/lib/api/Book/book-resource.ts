import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BookDetailResponse } from './types';


export class BookResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {
  }

  writeUserReview = (data: any): Promise<any> => this.axios.post('book/write-user-review', data, this.axiosRequestConfig).then((r) => r.data);
  writeEditorReview = (data: any): Promise<any> => this.axios.post('book/write-editor-review', data, this.axiosRequestConfig).then((r) => r.data);
  getBookContent = (): Promise<BookDetailResponse> => this.axios.get('book/', this.axiosRequestConfig).then((r) => r.data);
}
