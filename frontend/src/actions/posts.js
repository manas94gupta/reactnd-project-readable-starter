import * as API from '../utils/api';
import { catchAsyncActionsErrors } from '../utils/helpers';
import { getCommentsOfPost } from './comments';

import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
} from './_types';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

const receiveNewPost = post => ({
  type: ADD_POST,
  post,
});

const receiveEditedPost = post => ({
  type: EDIT_POST,
  post,
});

const postDeleted = ({ id, category }) => ({
  type: DELETE_POST,
  id,
  category,
});

const postVoted = ({ id, voteScore }) => ({
  type: VOTE_POST,
  id,
  voteScore,
});

export const getPosts = () =>
  catchAsyncActionsErrors(async dispatch => {
    const posts = await API.fetchPosts();
    dispatch(receivePosts(posts));

    // take comments by one post at time
    for (const post of posts) {
      dispatch(getCommentsOfPost(post.id));
    }
  });

export const addPost = post =>
  catchAsyncActionsErrors(async dispatch => {
    const newPost = await API.addPost(post);
    dispatch(receiveNewPost(newPost));
  });

export const editPost = post =>
  catchAsyncActionsErrors(async dispatch => {
    const newPost = await API.editPost(post);
    dispatch(receiveEditedPost(newPost));
  });

export const deletePost = ({ id, category }) =>
  catchAsyncActionsErrors(async dispatch => {
    await API.deletePost(id);
    dispatch(postDeleted({ id, category }));
  });

export const votePost = ({ id, option }) =>
  catchAsyncActionsErrors(async dispatch => {
    const post = await API.votePost(id, option);
    dispatch(postVoted(post));
  });
