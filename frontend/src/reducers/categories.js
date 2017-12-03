import * as R from 'ramda';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/_types';

const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return R.compose(R.indexBy(R.prop('name')), R.map(R.assoc('posts', [])))(
        action.categories,
      );

    case RECEIVE_POSTS:
      const newCatPosts = R.compose(
        R.map(R.objOf('posts')),
        R.map(R.pluck('id')),
        R.groupBy(R.prop('category')),
      )(action.posts);

      return R.mergeWith(R.merge, state, newCatPosts);

    case ADD_POST:
    case EDIT_POST:
      return R.over(
        R.lensPath([action.post.category, 'posts']),
        R.compose(R.uniq, R.append(action.post.id)),
        state,
      );

    case DELETE_POST:
      return R.over(
        R.lensPath([action.category, 'posts']),
        R.reject(R.equals(action.id)),
        state,
      );

    default:
      return state;
  }
};

export default categoriesReducer;
