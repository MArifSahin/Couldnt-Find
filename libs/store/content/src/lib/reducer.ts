import { ContentActions, ContentStore } from './types';

const initialState: Partial<ContentStore> = { isReviewed: false };

export function contentReducer(state = initialState, action: ContentActions): Partial<ContentStore> {
  return state;
}
