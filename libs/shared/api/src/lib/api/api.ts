import { AuthResource } from './Auth/auth-resource';
import axios from '../config/axios';
import { BookResource } from './Book/book-resource';

export const api = {
  auth: new AuthResource(axios),
  book: new BookResource(axios)
};
