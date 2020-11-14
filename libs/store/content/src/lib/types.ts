import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface ContentStore {
  isReviewed: boolean;
}

export type ContentActions = ActionType<typeof actions>;
