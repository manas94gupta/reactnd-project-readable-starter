import * as R from 'ramda';

import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
} from '../actions/_types';

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...R.indexBy(R.prop('id'), action.posts),
      };

    case ADD_POST:
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      };

    case VOTE_POST:
      return R.assocPath([action.id, 'voteScore'], action.voteScore)(state);

    case DELETE_POST:
      return R.dissoc(action.id, state);

    default:
      return state;
  }
};

export default postsReducer;
