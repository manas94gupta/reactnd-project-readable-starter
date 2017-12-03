import * as R from 'ramda';
import {
  RECEIVE_COMMENTS,
  VOTE_COMMENT,
  EDIT_COMMENT,
} from '../actions/_types';

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments,
      };

    case VOTE_COMMENT:
      return R.set(
        R.lensPath([
          action.parentId,
          R.compose(
            R.findIndex(R.compose(R.equals(action.id), R.prop('id'))),
            R.prop(action.parentId),
          )(state),
          'voteScore',
        ]),
        action.voteScore,
      )(state);

    case EDIT_COMMENT:
      const { comment } = action;
      return R.set(
        R.lensPath([
          comment.parentId,
          R.compose(
            R.findIndex(R.compose(R.equals(comment.id), R.prop('id'))),
            R.prop(comment.parentId),
          )(state),
        ]),
        comment,
      )(state);

    default:
      return state;
  }
};

export default commentsReducer;
