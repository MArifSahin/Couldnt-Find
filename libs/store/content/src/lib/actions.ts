import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  WriteEditorReviewRequest,
  WriteUserReviewRequest
} from '@internship/shared/types';

export const writeUserReviewAsync = createAsyncAction(
  '@Content/WRITE_USER_REVIEW_REQUEST',
  '@Content/WRITE_USER_REVIEW_SUCCESS',
  '@Content/WRITE_USER_REVIEW_FAILURE'
)<WriteUserReviewRequest, any, AxiosError>();

export const writeEditorReviewAsync = createAsyncAction(
  '@Content/WRITE_USER_REVIEW_REQUEST',
  '@Content/WRITE_USER_REVIEW_SUCCESS',
  '@Content/WRITE_USER_REVIEW_FAILURE'
)<WriteEditorReviewRequest, any, AxiosError>();


