import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  WriteUserReviewRequest
} from '@internship/shared/types';

export const writeUserReviewAsync = createAsyncAction(
  '@Authentication/WRITE_USER_REVIEW_REQUEST',
  '@Authentication/WRITE_USER_REVIEW_SUCCESS',
  '@Authentication/WRITE_USER_REVIEW_FAILURE'
)<WriteUserReviewRequest, any, AxiosError>();


