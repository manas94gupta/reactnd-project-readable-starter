import { fetchCategories } from '../utils/api';
import { catchAsyncActionsErrors } from '../utils/helpers';
import { getPosts } from '../actions/posts';

import {
  RECEIVE_CATEGORIES /* , GET_CATEGORY, GET_POST_DETAILS */,
} from './_types';

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const getCategories = () =>
  catchAsyncActionsErrors(async dispatch => {
    const { categories } = await fetchCategories();
    dispatch(receiveCategories(categories));
    dispatch(getPosts());
  });
